---
title: Network Proxy Address
date: 2024-01-22 14:33:00
description: There is a **Network Proxy Address** text box in the software's main interface. This is used to fill in the network proxy address to access services that cannot be used directly within the country, such as Google Translate, OpenAI, etc.
---
## Network Proxy Address

![](https://pvtr2.pyvideotrans.com/images/proxy1.jpg)

As shown in the image above, there is a **Network Proxy Address** text box in the software's main interface. This is used to fill in the network proxy address to access services that cannot be used directly within the country, such as Google Translate, OpenAI, etc.

You need to fill in a proxy address in a format like `http://127.0.0.1:10808`. Unless you have already enabled a proxy service on your local machine, please do not fill it in arbitrarily. Otherwise, it will not only be useless but may also cause originally usable domestic services to become unavailable.

For example, although Google Translate is useful, it is well known that to use it smoothly within the country, one must know how to "surf the internet scientifically" (use a proxy/VPN). Of course, the author has specifically set up a "FreeGoogle" translation channel that can be used without scientific internet access. However, this is built on Cloudflare, and certain domestic network operators or regions may still be unable to use it smoothly, requiring scientific internet access.

If you do not know what "scientific internet access" is and cannot open the https://Google.com website in your browser, please search for methods on how to achieve scientific internet access on your own. Here, we only discuss how to fill the corresponding network proxy address into the software.

Assuming you are using the v2ray tool, it is started on your local machine, and you can access the https://google.com website in your browser, then you only need to fill in `http://127.0.0.1:10808` in the "Network Proxy Address" text box.

![](https://pvtr2.pyvideotrans.com/images/v2ray1.jpg)

As shown in the image above, the default network proxy address for the v2ray tool is `http://127.0.0.1:10808`.

Assuming you are using the clash tool, it is started on your local machine, and you can access the https://google.com website in your browser, then you only need to fill in `http://127.0.0.1:7890` in the "Network Proxy Address" text box.

![](https://pvtr2.pyvideotrans.com/images/clash1.jpg)

As shown in the image above, the default network proxy address for the clash tool is `http://127.0.0.1:7890`.

![](https://pvtr2.pyvideotrans.com/images/proxy2.jpg)

As shown in the image above, after filling it in, you can select the "Google" translation channel. When you want to use domestic translation services such as Baidu or Tencent, simply delete all content from the "Network Proxy Address" text box.

Please note: If you do not know how to use scientific internet access, have not started any tools, and cannot open the https://Google.com website in your browser, then do not fill in any content in the "Network Proxy Address" text box; you must delete it. Then use domestic translation channels, such as Baidu Translate, Tencent Translate, etc. See below for usage tutorials.

>
>
> Baidu Translate Tutorial: https://pyvideotrans.com/baidu
>
> Tencent Translate Tutorial: https://pyvideotrans.com/tencent
>