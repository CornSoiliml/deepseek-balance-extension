# Privacy Policy for DeepSeek Balance Checker

**Last updated:** May 11, 2026

## Overview

DeepSeek Balance Checker is a browser extension that displays your DeepSeek API account balance on the Chrome toolbar badge. We are committed to protecting your privacy and being transparent about our data practices.

## Data Collection

This extension **does not collect, transmit, or share any personal data** with us or any third party.

### What we store locally

The following data is stored **only on your device** using Chrome's built-in storage APIs (`chrome.storage.sync` and `chrome.storage.local`):

| Data | Purpose |
|---|---|
| API Key | Authenticate requests to the DeepSeek API |
| Currency preference | Display balance in your preferred currency (CNY/USD) |
| Refresh interval | Control how often the balance is fetched |
| Cached balance data | Show the most recent balance without an extra network request |

### What we do NOT collect

- No personal information (name, email, address, etc.)
- No browsing history or activity
- No analytics or telemetry
- No cookies or tracking identifiers
- No data is sent to any server other than the official DeepSeek API

## Network Requests

This extension makes network requests **exclusively** to the following endpoint:

- `https://api.deepseek.com/user/balance` — to retrieve your account balance

No other network requests are made. All requests use your API Key for authentication via the standard `Authorization: Bearer` header, as documented by the [DeepSeek API](https://api-docs.deepseek.com/).

## Data Sharing

We do **not** sell, trade, or transfer your data to any third party. Your API Key and balance information never leave your device except for the authenticated API call described above.

## Data Security

- Your API Key is stored using Chrome's encrypted `chrome.storage.sync` API.
- All network communication with the DeepSeek API uses HTTPS encryption.
- No data is logged, cached on external servers, or transmitted to any analytics service.

## Permissions

This extension requests the following Chrome permissions:

| Permission | Reason |
|---|---|
| `storage` | Save your settings (API Key, preferences) locally |
| `alarms` | Schedule periodic balance refresh |
| `host_permissions: api.deepseek.com` | Make API calls to fetch your balance |

## Changes to This Policy

We may update this Privacy Policy from time to time. Any changes will be reflected in the "Last updated" date above. Continued use of the extension after changes constitutes acceptance of the updated policy.

## Contact

If you have any questions or concerns about this Privacy Policy, please open an issue on our GitHub repository or contact us at the email provided on the Chrome Web Store listing.
