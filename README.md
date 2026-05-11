# DeepSeek Balance Checker

![License](https://img.shields.io/badge/license-MIT-blue.svg)

A Chrome extension that displays your DeepSeek API account balance right on the toolbar. Configurable refresh interval, multi-currency support, and smart badge formatting.

## Features

- **Badge Display** — Balance shown on the extension icon, color-coded (green / red)
- **Smart Formatting** — Large numbers auto-shortened to fit the badge (e.g. 12K, 3.5K, 570)
- **Detailed Popup** — Total, granted, and topped-up balance breakdown
- **Multi-Currency** — Supports CNY, USD and other currencies from your account
- **Auto Refresh** — Configurable interval (default: 30 min) via `chrome.alarms`
- **Manual Refresh** — One-click refresh from the popup
- **Connection Test** — Verify your API key before saving
- **i18n** — English and Chinese (auto-detected from browser or manually selected)
- **Privacy First** — API key stored locally, only sent to the official DeepSeek API

## Installation

### From Chrome Web Store

*(link to be added after publication)*

### Manual (Developer Mode)

1. Clone this repo:
   ```bash
   git clone https://github.com/CornSoiliml/deepseek-balance-extension.git
   ```
2. Open `chrome://extensions` and enable **Developer mode**
3. Click **Load unpacked** and select the `deepseek-balance-extension` folder
4. The extension appears in the toolbar

## Usage

1. Click the extension icon → click the gear icon ⚙️ to open Options
2. Enter your [DeepSeek API Key](https://platform.deepseek.com/api_keys)
3. Select your preferred currency and refresh interval
4. Click **Save** — your balance appears on the badge immediately

## Permissions

| Permission | Reason |
|-----------|--------|
| `storage` | Save API key and preferences locally |
| `alarms`  | Schedule periodic balance checks |
| `https://api.deepseek.com/*` | Fetch account balance via official API |

## License

[MIT](LICENSE)
