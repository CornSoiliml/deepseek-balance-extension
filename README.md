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

---

# DeepSeek Balance Checker（中文）

![License](https://img.shields.io/badge/license-MIT-blue.svg)

一个可在 Chrome 工具栏上直接显示 DeepSeek API 账户余额的扩展。支持可配置刷新间隔、多币种展示和智能角标缩写。

## 功能特性

- **角标显示** — 余额直接显示在扩展图标上，绿色/红色区分状态
- **智能缩写** — 大额余额自动缩短以适配角标（如 12K、3.5K、570）
- **详细弹窗** — 可查看总额、赠送余额、充值余额完整明细
- **多币种** — 支持 CNY、USD 及账户内的其他货币展示
- **自动刷新** — 可配置间隔（默认 30 分钟），通过 `chrome.alarms` 实现
- **手动刷新** — 弹窗内一键刷新
- **连接测试** — 保存前验证 API Key 是否有效
- **国际化** — 支持英文和中文（自动检测浏览器语言或手动选择）
- **隐私优先** — API Key 仅存储在本地，只发送至 DeepSeek 官方 API

## 安装

### 从 Chrome Web Store 安装

*（发布后更新链接）*

### 手动安装（开发者模式）

1. 克隆仓库：
   ```bash
   git clone https://github.com/CornSoiliml/deepseek-balance-extension.git
   ```
2. 打开 `chrome://extensions`，开启 **开发者模式**
3. 点击 **加载已解压的扩展程序**，选择 `deepseek-balance-extension` 文件夹
4. 扩展将出现在工具栏中

## 使用方法

1. 点击扩展图标 → 点击齿轮图标 ⚙️ 进入选项页
2. 输入你的 [DeepSeek API Key](https://platform.deepseek.com/api_keys)
3. 选择货币类型和刷新间隔
4. 点击 **保存** — 余额即刻显示在角标上

## 权限

| 权限 | 用途 |
|------|------|
| `storage` | 在本地保存 API Key 和偏好设置 |
| `alarms`  | 定时触发余额自动刷新 |
| `https://api.deepseek.com/*` | 通过官方 API 获取账户余额 |

## 开源协议

[MIT](LICENSE)
