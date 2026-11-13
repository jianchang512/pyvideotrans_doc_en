---
title: Understanding Tenacity Creating Elegant and Simple Automatic Retries with One Line of Code
date: 2025-07-31 12:33:00
description: When interacting with AI large model API services, we always face an unavoidable reality the network is not always reliable. Proxies may drop, APIs may rate limit requests, connections may time out, or the network may briefly go down. Fortunately, these issues are often temporary. If the first request fails, waiting a moment and trying again often succeeds.
---


# Understanding Tenacity: Creating Elegant and Simple Automatic Retries with One Line of Code

When interacting with AI large model API services, we always face an unavoidable reality: the network is not always reliable. Proxies may drop, APIs may rate limit requests, connections may time out, or the network may briefly go down. Fortunately, these issues are often temporary. If the first request fails, waiting a moment and trying again often succeeds.

This "try again" strategy is **retry**. It's not a sophisticated technology, but it's a crucial part of building reliable and robust applications.

## Everything Starts with a Simple API Call

Let's start with a real-world scenario: calling an AI model's API for subtitle translation. A basic piece of code might look like this:

```python
# A basic API call function
from openai import OpenAI, APIConnectionError

def translate_text(text: str) -> str:
    message = [
        {'role': 'system', 'content': 'You are a top-tier subtitle translation engine.'},
        {'role': 'user', 'content': f'<INPUT>{text}</INPUT>'},
    ]
    model = OpenAI(api_key="YOUR_API_KEY", base_url="...")

    try:
        response = model.chat.completions.create(model="gpt-4o", messages=message)
        if response.choices:
            return response.choices[0].message.content.strip()
        raise RuntimeError("API did not return a valid result")
    except APIConnectionError as e:
        print(f"Network connection failed: {e}. Need to retry...")
        raise # The program crashes here
    except Exception as e:
        print(f"Other error occurred: {e}")
        raise
```

This code works, but it's "fragile." Once it encounters a network issue, it just prints a message and crashes. Of course, we could manually write a `for` loop and `time.sleep` to implement retry:

```python
# Manual retry implementation
for attempt in range(3):
    try:
        # ... API call logic ...
        return response.choices[0].message.content.strip()
    except APIConnectionError as e:
        print(f"Attempt {attempt + 1} failed: {e}")
        if attempt == 2: # Check if it's the last attempt
            raise
    # ... Need to write similar logic for other exceptions ...
```
This approach quickly makes the code complex and messy. Retry logic gets mixed with business logic, and if we need retries in multiple places, we have to write a lot of repetitive, error-prone code.

This is where the `tenacity` library comes in handy.

## Getting Started with Tenacity: Elegant Retry with One Line of Code

`tenacity` is a general-purpose retry library designed for Python. Its core idea is to add retry capability to any operation that might fail in a simple and clear way.

We can easily transform the above function using the `@retry` decorator:

```python
from tenacity import retry

@retry
def translate_text(text: str) -> str:
    # ... Internal logic remains exactly the same, no changes needed ...
```

With just one line of `@retry`, this function is completely renewed. Now, if the `translate_text` function throws any exception internally, `tenacity` will automatically catch it and immediately call the function again. It will keep retrying, never stopping, until the function successfully returns a value.

## Fine-Grained Control: Making Retry Behave as We Want

"Retry forever" is usually not what we want. We need to set some boundaries. `tenacity` provides rich parameters for fine-grained control.

### 1. Setting Stop Conditions (`stop`)

We don't want to retry indefinitely. The most common requirement is "try at most N times," which can be achieved with `stop_after_attempt`.

```python
from tenacity import retry, stop_after_attempt

# Try a total of 3 times
@retry(stop=stop_after_attempt(3))
def translate_text(text: str) -> str:
    # ...
```

> **Note: An Important Cognitive Detail**
> `stop_after_attempt(N)` refers to the **total number of attempts**, not the "number of retries."
>
> *   `stop_after_attempt(1)` means: execute 1 time, if it fails, **stop immediately**. It won't retry at all.
> *   `stop_after_attempt(3)` means: execute a total of 3 times, i.e., **initial attempt + 2 retries**.
>
> Remember this simple rule: **If you want `Y` extra retries after a failure, you should set `stop_after_attempt(Y + 1)`.**

We can also limit by time, e.g., `stop_after_delay(10)` means "stop after 10 seconds." Even better, you can combine them with the `|` (or) operator, stopping when whichever condition is met first.

```python
from tenacity import stop_after_delay

# Stop when total attempts reach 5 or total time exceeds 30 seconds
@retry(stop=(stop_after_attempt(5) | stop_after_delay(30)))
def translate_text(text: str) -> str:
    # ...
```

### 2. Setting Wait Strategy (`wait`)

Rapid, continuous retries can overwhelm the server or hit rate limits. Adding a wait between retries is wise. The simplest is fixed waiting, using `wait_fixed`:

```python
from tenacity import retry, wait_fixed

# Wait 2 seconds before each retry
@retry(wait=wait_fixed(2))
def translate_text(text: str) -> str:
    # ...
```
When interacting with network services, **exponential backoff** (`wait_exponential`) is more recommended. It gradually increases the wait time with each retry (e.g., 2s, 4s, 8s...), effectively avoiding a "retry storm" during service peaks.

```python
from tenacity import wait_exponential

# First retry waits 2^1=2s, then 4s, 8s... up to a max of 10s
@retry(wait=wait_exponential(multiplier=1, min=2, max=10))
def translate_text(text: str) -> str:
    # ...
```

### 3. Deciding When to Retry (`retry`)

By default, `tenacity` retries on any exception. But this isn't always right.

For example, `APIConnectionError` (network issues) or `RateLimitError` (too many requests) are typical **recoverable errors**; retrying is likely to succeed. But `AuthenticationError` (wrong key) or `PermissionDeniedError` (no permission) are **fatal errors**; retrying any number of times is doomed to fail.

We can use `retry_if_not_exception_type` to tell `tenacity` not to retry on certain fatal errors.

> **Note: A Common Syntax Pitfall**
> When specifying multiple exception types, you might intuitively write `AuthenticationError | PermissionDeniedError`.
> ```python
> # Wrong way! This won't work as expected.
> @retry(retry=retry_if_not_exception_type(AuthenticationError | PermissionDeniedError))
> ```
> In modern Python, `A | B` creates a `UnionType` object, but this function in `tenacity` expects a **tuple** containing exception types.
>
> The correct way is:
> ```python
> from openai import AuthenticationError, PermissionDeniedError
>
> # Correct way! Use a tuple.
> @retry(retry=retry_if_not_exception_type((AuthenticationError, PermissionDeniedError)))
> ```
> This small parenthesis is crucial.

## When Retry Ultimately Fails

What does `tenacity` do if it fails after exhausting all attempts? By default, it raises a `RetryError`, which contains the original exception from the last failure.

But sometimes we don't want the program to crash; we want to perform some custom cleanup, like logging a detailed error and returning a friendly error message. This is where `retry_error_callback` comes in.

```python
from tenacity import RetryCallState

def my_error_callback(retry_state: RetryCallState):
    # The retry_state object contains all information about this retry attempt.
    print(f"All {retry_state.attempt_number} attempts failed!")
    return "Default translation result or error message"

@retry(stop=stop_after_attempt(3), retry_error_callback=my_error_callback)
def translate_text(text: str) -> str:
    # ...
```
Now, if the function fails 3 times in a row, it won't raise an exception but will return the value from the `my_error_callback` function.

> **Note: A Subtle Trap in the Callback Function**
> In the callback function, how do we safely get the last exception information?
> ```python
> def return_last_value(retry_state: RetryCallState):
>     # Dangerous! This will re-raise the exception!
>     return "Failed: " + retry_state.outcome.result()
> ```
> `retry_state.outcome` represents the result of the last attempt. If that attempt failed, calling the `.result()` method will **re-raise that exception**, causing our callback function itself to crash.
>
> The correct approach is to use the `.exception()` method, which safely returns the exception object without raising it:
> ```python
> def return_last_value(retry_state: RetryCallState):
>     # Safe! This just returns the exception object.
>     last_exception = retry_state.outcome.exception()
>     return f"Failed after {retry_state.attempt_number} attempts. Last error: {last_exception}"
> ```

## When Tenacity Meets Object-Oriented Programming

As the codebase grows, we typically encapsulate logic in classes. At this point, we encounter two deeper issues: **scope** and **inheritance**.

### 1. How Can a Callback Function Access `self`?

Suppose our callback function needs to access instance variables of the class (like `self.name`). We might naturally write it like this:
```python
class TTS:
    def __init__(self, name):
        self.name = name

    def _my_callback(self, retry_state):
        print(f"Task for instance {self.name} failed.")
        # ...

    # This will fail! NameError: name 'self' is not defined
    @retry(retry_error_callback=self._my_callback)
    def run(self):
        # ...
```
This will immediately error because the `@retry` decorator is executed when **defining the class**, at which point there is no class instance yet, so naturally no `self`.

The most elegant solution is the **"inner function closure"** pattern. We apply the decorator to a function defined inside the instance method:

```python
class TTS:
    def __init__(self, name):
        self.name = name

    def run(self):
        # Here, self is available!
        @retry(
            # Because the decorator is inside the run method, it can "capture" self.
            retry_error_callback=self._my_callback
        )
        def _execute_task():
            # This is the logic that actually needs retrying.
            print(f"Executing task for {self.name}...")
            raise ValueError("Task failed")

        # Call the decorated inner function.
        return _execute_task()

    def _my_callback(self, retry_state: RetryCallState):
        # ...
```
This is a very powerful and Pythonic pattern that perfectly solves the scope issue.

### 2. How to Define a Retry Strategy in a Parent Class for All Child Classes to Inherit?

This is the last and most design-oriented problem we'll discuss. Suppose we have a `BaseProvider` parent class and multiple child classes like `MyProviderA`, `MyProviderB`. We want all child classes to follow the same retry rules.

A common mistaken idea is to apply the decorator to an empty method in the parent class. When a child class overrides that method, the decorator on the parent is also lost.

The correct solution is the **Template Method Design Pattern**.

*   The **parent class** defines a **template method** (`_exec`) that contains the immutable algorithm framework (i.e., our retry logic).
*   This template method calls an abstract **hook method** (`_do_work`).
*   **Child classes** only need to implement this hook method, filling in the specific business logic.

Let's build this pattern with a more complete example:

```python
from openai import OpenAI, AuthenticationError, PermissionDeniedError
from tenacity import retry, stop_after_attempt, wait_fixed, retry_if_not_exception_type, RetryCallState

# 1. Define a generic, reusable exception handling class.
class RetryRaise:
    # Define fatal exceptions that should not be retried.
    NO_RETRY_EXCEPT = (AuthenticationError, PermissionDeniedError)

    @classmethod
    def _raise(cls, retry_state: RetryCallState):
        ex = retry_state.outcome.exception()
        if ex:
            # Log based on exception type and raise a custom, friendlier RuntimeError.
            # ... More complex exception classification logic can be added here ...
            raise RuntimeError(f"Failed after {retry_state.attempt_number} retries: {ex}") from ex
        raise RuntimeError(f"Failed after {retry_state.attempt_number} retries, but no exception was caught.")

# 2. Implement the template parent class.
class BaseProvider:
    @retry(
        stop=stop_after_attempt(3),
        wait=wait_fixed(2),
        retry=retry_if_not_exception_type(RetryRaise.NO_RETRY_EXCEPT),
        retry_error_callback=RetryRaise._raise
    )
    def _exec(self) -> str:
        """This is the template method, responsible for retry. Child classes should not override it."""
        # Call the hook method, implemented by child classes.
        return self._do_work()

    def _do_work(self) -> str:
        """This is the hook method, which child classes must implement."""
        raise NotImplementedError("Child class must implement _do_work method")

# 3. Implement concrete child classes.
class DeepSeekProvider(BaseProvider):
    def __init__(self, api_key: str, base_url: str):
        self.api_key = api_key
        self.base_url = base_url
        self.model = OpenAI(api_key=self.api_key, base_url=self.base_url)

    def _do_work(self) -> str:
        """Here we only care about core business logic, completely ignoring retry."""
        response = self.model.chat.completions.create(
            model="deepseek-chat",
            messages=[{'role': 'user', 'content': 'Who are you?'}]
        )
        if response.choices:
            return response.choices[0].message.content.strip()
        raise RuntimeError(f"API did not return a valid result: {response}")

# --- How to use ---
 provider = DeepSeekProvider(api_key="...", base_url="...")
 try:
     # We call _exec, which contains the retry logic.
     result = provider._exec()
     print("Execution successful:", result)
 except RuntimeError as e:
     # If it ultimately fails, we catch the friendly exception raised by RetryRaise.
     print("Execution failed:", e)
```

In this way, we perfectly separate the retry strategy (the immutable part) from the business logic (the variable part), building a framework that is both robust and easy to extend.

----

`tenacity` is a seemingly simple yet powerful library. It can easily handle simple retry scenarios and, through clever design patterns, solve reliability problems in complex, object-oriented applications.

For more complete usage instructions, please see the official documentation: <http://tenacity.readthedocs.io/>