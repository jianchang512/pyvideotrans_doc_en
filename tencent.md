---
title: Tencent Translation API
date: 2024-01-22 14:33:00
description: How to apply for the Tencent Translation API
---
## Tencent Translation API

**1. Apply for the Free API**

Open the Tencent Machine Translation console at https://console.cloud.tencent.com/tmt. If you are not logged in, you will be redirected to the login page. After logging in, reopen the page. Once opened, agree to the pop-up agreement, and you can start using it for free. It offers a monthly free quota of 5 million characters, which is 100 times that of Baidu's offering.

**2. Create AppID and Secret Key**

After completing the first step, open this address: https://console.cloud.tencent.com/cam/capi.

![](https://pvtr2.pyvideotrans.com/images/71604a9d1bfa3da886af6427b1ceb047.jpg)

Click "Continue to Use".


![](https://pvtr2.pyventrans.com/images/d9be0014cb2e19cb67210d70d53dc198.jpg)

Then, on this page, click "New Secret Key". A pair of ID and secret key will be automatically created.


![](https://pvtr2.pyvideotrans.com/images/0c027366c22216cbabf407f44757c49f.jpg)

Copy the `SecretId` and `SecretKey`.

Fill them into the `Settings Menu -> Tencent Translation Settings` respectively.

![](https://pvtr2.pyvideotrans.com/images/991d61ac554558300460fd1e56978a68.jpg)


## Important Notes:

Most AI translation channels may impose limits on the number of requests per minute. If you encounter an error during use indicating that the request frequency has been exceeded, you can set a pause time in seconds through the software: `Menu -> Tools/Advanced Settings -> Advanced Settings/set.ini -> Pause Time After Translation`. For example, set it to 30, meaning the software will wait for 30 seconds after each translation before proceeding to the next one, thereby avoiding errors due to exceeding the frequency limit.

![image.png](https://pvtr2.pyvideotrans.com/images/fanyidjs.webp)