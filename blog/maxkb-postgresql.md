---
title: Ubuntu Development Environment Setup Guide PostgreSQL + pgvector + Latest Node.js
date: 2025-04-15 15:33:00
description: This article details setting up a development environment on Ubuntu with PostgreSQL, the pgvector extension, and the latest Node.js (managed via fnm). It focuses on installing PostgreSQL via the PGDG repository, clarifying the difference between system-level installation and database-level enabling of the pgvector extension, troubleshooting the common error "extension vector is not available", and using fnm for fast Node.js installation and version management. The guide covers installation steps, database operations, error diagnosis, and solutions, providing a practical reference for developers to efficiently build this environment.

---


# Ubuntu Development Environment Setup Guide: PostgreSQL + pgvector + Latest Node.js (fnm)

**Introduction**

Recently, while setting up the development version of MaxKB on Ubuntu, I needed a project environment with PostgreSQL, vector search capabilities (via the pgvector extension), and the latest Node.js. I encountered some typical "gotchas" but also found solutions. To solidify my learning and help others facing similar issues, I've compiled the entire process into this guide. I hope it saves you some debugging time!

**Target Environment:**

*   Operating System: Ubuntu (commands are based on the APT package manager)
*   Database: PostgreSQL (specific version, 17)
*   Database Extension: pgvector (for vector similarity search)
*   Runtime: Latest Node.js (managed via fnm)

## Part 1: Installing PostgreSQL (Recommended: Use the PGDG Repository)

The default Ubuntu repositories may not have the latest PostgreSQL version. To use a newer version (like v17 needed later) and receive timely updates, it's recommended to use the official PostgreSQL Global Development Group (PGDG) APT repository.

1.  **Import GPG Key & Add Repository:**
    ```bash
    # Install dependencies
    sudo apt update
    sudo apt install curl ca-certificates gnupg -y

    # Import the key
    curl https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/postgresql-archive-keyring.gpg >/dev/null

    # Add the repository (automatically detects Ubuntu version)
    sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
    ```

2.  **Update Package List & Install PostgreSQL:**
    ```bash
    sudo apt update
    # Install a specific version (e.g., PostgreSQL 17)
    sudo apt install postgresql-17 postgresql-contrib-17 -y
    # To install the latest stable version, omit the version number: sudo apt install postgresql postgresql-contrib
    ```
    `postgresql-contrib` includes useful extensions and tools.

3.  **Verify Installation & Service Status:**
    ```bash
    sudo systemctl status postgresql@17-main.service
    # If the service name differs, try: sudo systemctl status postgresql
    ```
    Ensure the service is running (`active (running)`).

## Part 2: Connecting to PostgreSQL & Creating a Database (and Common Errors)

1.  **Connect to the Database:**
    Connect using the default `postgres` superuser.
    ```bash
    sudo -u postgres psql
    ```
    Upon success, you'll see the `postgres=#` prompt.

2.  **Create a Database (e.g., `maxkb`):**
    ```sql
    CREATE DATABASE maxkb;
    ```
    **Note:** SQL statements in `psql` must end with a **semicolon (`;`)**!

3.  **Common Error: `FATAL: database "X" does not exist`**
    If you run `CREATE DATABASE maxkb` (without a semicolon) and immediately try to connect with `\c maxkb`, you'll encounter this error.
    **Cause:** Without the semicolon, the `CREATE DATABASE` command was never sent to the server for execution. `\c` is a `psql` meta-command that executes immediately, at which point the database indeed does not exist.
    **Solution:** Ensure the `CREATE DATABASE` command ends with a semicolon and you see the `CREATE DATABASE` confirmation message before executing `\c maxkb`.

4.  **Connect to the New Database:**
    ```sql
    \c maxkb
    ```
    The prompt will change to `maxkb=#`.

5.  **(Recommended) Create a Dedicated User:**
    For security, it's best to create a separate user for your application.
    ```sql
    -- Execute at the postgres=# or maxkb=# prompt
    CREATE USER maxkb_user WITH PASSWORD 'your_strong_password';
    ALTER DATABASE maxkb OWNER TO maxkb_user;
    -- Or grant privileges: GRANT ALL PRIVILEGES ON DATABASE maxkb TO maxkb_user;
    \q -- Exit psql
    ```

## Part 3: Installing the pgvector Extension (Critical Step)

We need to use vector search within the `maxkb` database.

1.  **Attempt to Enable the Extension (This Usually Fails Initially):**
    At the `maxkb=#` prompt:
    ```sql
    CREATE EXTENSION vector;
    ```

2.  **Typical Error: `ERROR: extension "vector" is not available`**
    ```
    ERROR:  extension "vector" is not available
    DETAIL:  Could not open extension control file "/usr/share/postgresql/17/extension/vector.control": No such file or directory.
    HINT:  The extension must first be installed on the system where PostgreSQL is running.
    ```
    **Cause:** `CREATE EXTENSION` only *enables* an extension *within* a database, provided the **system-level files** for that extension (like `.so`, `.sql`, `.control`) are **already installed** in a location PostgreSQL can find (the `DETAIL` in the error message specifies the path).

3.  **Solution: System-Level Installation of pgvector**

    *   **Method 1: Install via APT (Recommended)**
        This is the simplest and most recommended method.
        ```bash
        sudo apt update
        # The package name is typically postgresql-<version>-pgvector
        sudo apt install postgresql-17-pgvector -y

        # Restart the PostgreSQL service after installation
        sudo systemctl restart postgresql@17-main.service
        ```

    *   **Method 2: Compile from Source (if APT doesn't have it or you need a specific version)**
        a.  **Install Dependencies (to fix the `postgres.h` missing issue):** This is a **required** step for compiling PostgreSQL extensions!
            ```bash
            sudo apt update
            # The package name is typically postgresql-server-dev-<version>
            sudo apt install postgresql-server-dev-17 -y
            ```
        b.  **Download and Compile pgvector Source Code:**
            ```bash
            # Assuming source code is in /tmp/pgvector
            git clone --branch v0.7.0 https://github.com/pgvector/pgvector.git /tmp/pgvector # Optionally specify a version
            cd /tmp/pgvector
            make clean # Clean old builds (optional)
            make # Compile
            sudo make install # Install to PostgreSQL directories
            ```
        c.  **Restart the PostgreSQL Service:**
            ```bash
            sudo systemctl restart postgresql@17-main.service
            ```

4.  **Try Enabling the Extension Again:**
    After the system-level installation is complete, **reconnect** to the `maxkb` database (`sudo -u postgres psql -d maxkb`), then execute again:
    ```sql
    CREATE EXTENSION vector;
    ```
    This time it should show `CREATE EXTENSION`, indicating success!

## Part 4: Installing the Latest Node.js (Using fnm)

We need the latest Node.js. `fnm` (Fast Node Manager) is an excellent choice—it's fast and easy for managing multiple versions.

1.  **Install fnm:**
    ```bash
    curl -fsSL https://fnm.vercel.app/install | bash
    ```

2.  **Activate fnm (Crucial!):**
    The installation script modifies your shell configuration. You need to reload it or open a new terminal for it to take effect.
    ```bash
    # For Bash (default)
    source ~/.bashrc
    # Or close the current terminal and open a new one
    ```

3.  **Use fnm to Install Node.js (e.g., v22):**
    ```bash
    fnm install 22
    # Or install the latest LTS: fnm install --lts
    # Or install the latest Current: fnm install node
    ```

4.  **Verify Installation:**
    ```bash
    node -v  # Should show v22.x.x
    npm -v   # Should show the corresponding npm version 10.x.x
    ```



This environment setup journey covered PostgreSQL installation and configuration, database operations, tricky extension installation issues (understanding the difference between system-level installation and database-level enabling is key!), and using the modern tool `fnm` for Node.js version management. The main takeaways:

*   Use official or recommended software sources (like PGDG for PostgreSQL).
*   Read error messages carefully; `DETAIL` and `HINT` often contain crucial clues.
*   Understand how PostgreSQL extensions work: install on the system first, then enable in the database.
*   Compiling C extensions requires corresponding development packages (`-dev` or `-devel`).
*   Pay attention to semicolons in `psql`!
*   Using a version manager (like `fnm` or `nvm`) for Node.js is a wise choice.
*   After installing a version manager, remember to reload your shell configuration or open a new terminal.