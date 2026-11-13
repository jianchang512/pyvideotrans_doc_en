---
title: Custom Translation API
date: 2024-01-22 14:33:00
description: Connect your own translation API service to pyVideoTrans.
---

# Custom Translation API Channel

## What is it?

pyVideoTrans supports connecting to your own translation API service. If you've built a translation endpoint or use a third-party custom translation service, you can integrate it through this channel. The software sends translation requests as **GET requests** to the API address you provide.

## Prerequisites

- A working translation API endpoint
- The endpoint must return JSON in the specified format

## API Specification

### Request Method

The software sends **GET requests** to the configured API URL, using the `application/x-www-form-urlencoded` format.

### Request Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `text` | string | The text to translate (URL-encoded) |
| `source_language` | string | Source language code, e.g., `zh`, `en`, `ja` |
| `target_language` | string | Target language code, e.g., `zh`, `en`, `ja` |
| `secret` | string | Optional API key (configured in settings) |

### Supported Language Codes

`zh`, `en`, `ja`, `ko`, `ru`, `de`, `fr`, `tr`, `th`, `vi`, `ar`, `hi`, `hu`, `es`, `pt`, `it`

### Response Format

The endpoint must return JSON:

```json
{
    "code": 0,
    "msg": "ok",
    "text": "translated text"
}
```

| Field | Description |
|-------|-------------|
| `code` | Status code: `0` for success, `>0` for failure |
| `msg` | Status message: `ok` on success, error reason on failure |
| `text` | Translated text (returned on success) |

## Configuring in pyVideoTrans

1. Open the menu bar → **Translation Settings** → **Custom Translation API Settings**
2. Enter your translation endpoint URL in the **API URL** field
   - For example: `https://your-api.com/translate`
   - The software automatically appends query parameters — no need to add them manually
3. Optionally enter an API key in the **Secret** field
4. Click the **Test** button to verify the endpoint is working
5. Save after a successful test

## Example: Using an Open-Source Translation API

A free translation API based on Cloudflare and M2M100 can be found at:
https://github.com/jianchang512/translate-api

Deploy it and enter its URL into pyVideoTrans's custom translation API settings.

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| Connection failed | API URL incorrect | Check the URL format and confirm the endpoint is reachable |
| Response format error | Endpoint doesn't match the expected format | Ensure the response JSON contains `code`, `msg`, and `text` fields |
| Empty translation result | `text` field is empty | Check if the endpoint logic correctly handles translation requests |
| Frequent errors | Endpoint has rate limits | Increase the post-translation pause time |
