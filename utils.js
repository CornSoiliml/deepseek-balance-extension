// ===== i18n =====

let _langOverride = null;

export async function initLang() {
  return new Promise((resolve) => {
    chrome.storage.sync.get({ language: '' }, (items) => {
      _langOverride = items.language || null;
      resolve();
    });
  });
}

export function setLang(lang) {
  _langOverride = lang || null;
  chrome.storage.sync.set({ language: lang || '' });
}

export function setLangOnly(lang) {
  _langOverride = lang || null;
}

export function getLang() {
  if (_langOverride) return _langOverride;
  try {
    const uiLang = chrome.i18n?.getUILanguage?.();
    if (uiLang?.startsWith('zh')) return 'zh';
  } catch (e) {}
  if (typeof navigator !== 'undefined' && navigator.language?.startsWith('zh')) return 'zh';
  return 'en';
}

const strings = {
  en: {
    // background
    bg_no_key: 'DeepSeek Balance - Set API Key in Options first',
    bg_granted: 'Granted',
    bg_topped: 'Topped Up',
    bg_fetch_failed: 'Balance fetch failed: ',
    // options
    opt_title: 'DeepSeek Balance - Settings',
    opt_heading: 'DeepSeek Balance Settings',
    opt_api_key_label: 'API Key',
    opt_api_key_hint: 'Create an API Key at ',
    opt_currency_label: 'Display Currency',
    opt_currency_hint: 'Only effective when multiple currencies are available in your account. No exchange rate conversion.',
    opt_currency_cny: 'CNY',
    opt_currency_usd: 'USD',
    opt_interval_label: 'Refresh Interval (minutes)',
    opt_interval_hint: 'Recommended 10-60 min, minimum 1 min',
    opt_save_btn: 'Save Settings',
    opt_test_btn: 'Test Connection',
    opt_testing: 'Testing...',
    opt_enter_key: 'Please enter your API Key',
    opt_saved: 'Settings saved',
    opt_test_ok: 'Connection successful! Balance: ',
    opt_test_no_balance: 'Connection successful, but no balance info found',
    opt_test_fail: 'Connection failed: ',
    opt_toggle_visibility: 'Show/Hide',
    opt_language_label: 'Language',
    opt_language_auto: 'Auto (Browser Default)',
    opt_language_en: 'English',
    opt_language_zh: '中文',
    // popup
    pop_title: 'DeepSeek Balance',
    pop_refresh_title: 'Refresh',
    pop_settings_title: 'Settings',
    pop_no_key_title: 'API Key not configured',
    pop_go_settings: 'Go to Settings',
    pop_fetch_failed: 'Failed to fetch balance',
    pop_loading: 'Loading balance...',
    pop_available: 'Balance Available',
    pop_insufficient: 'Insufficient Balance',
    pop_no_balance: 'No balance info found',
    pop_granted: 'Granted',
    pop_topped: 'Topped Up',
    pop_updated: 'Updated at ',
  },
  zh: {
    bg_no_key: 'DeepSeek Balance - 请先配置 API Key',
    bg_granted: '赠送',
    bg_topped: '充值',
    bg_fetch_failed: '获取余额失败: ',
    opt_title: 'DeepSeek Balance - 设置',
    opt_heading: 'DeepSeek Balance 设置',
    opt_api_key_label: 'API Key',
    opt_api_key_hint: '在 ',
    opt_currency_label: '显示货币',
    opt_currency_hint: '仅当账户存在多种货币时生效，不支持汇率换算。',
    opt_currency_cny: 'CNY (人民币)',
    opt_currency_usd: 'USD (美元)',
    opt_interval_label: '刷新间隔 (分钟)',
    opt_interval_hint: '建议 10-60 分钟，最小 1 分钟',
    opt_save_btn: '保存设置',
    opt_test_btn: '测试连接',
    opt_testing: '测试中...',
    opt_enter_key: '请输入 API Key',
    opt_saved: '设置已保存',
    opt_test_ok: '连接成功! 余额: ',
    opt_test_no_balance: '连接成功，但未找到余额信息',
    opt_test_fail: '连接失败: ',
    opt_toggle_visibility: '显示/隐藏',
    opt_language_label: '语言',
    opt_language_auto: '自动 (浏览器默认)',
    opt_language_en: 'English',
    opt_language_zh: '中文',
    pop_title: 'DeepSeek Balance',
    pop_refresh_title: '刷新',
    pop_settings_title: '设置',
    pop_no_key_title: '尚未配置 API Key',
    pop_go_settings: '前往设置',
    pop_fetch_failed: '获取余额失败',
    pop_loading: '正在获取余额...',
    pop_available: '余额可用',
    pop_insufficient: '余额不足',
    pop_no_balance: '未找到余额信息',
    pop_granted: '赠送余额',
    pop_topped: '充值余额',
    pop_updated: '更新于 ',
  },
};

export function t(key) {
  const lang = getLang();
  return strings[lang]?.[key] ?? strings.en[key] ?? key;
}

export function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    el.title = t(el.dataset.i18nTitle);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
}

// ===== Balance shorten =====

export function shortenBalance(balance) {
  const lang = getLang();
  const num = parseFloat(balance);
  if (isNaN(num)) return '?';
  if (num === 0) return '0';

  if (lang === 'zh') {
    if (num >= 10000) {
      const wan = num / 10000;
      return wan >= 100 ? Math.round(wan) + '万' : trimTrailingZero(wan.toFixed(1)) + '万';
    }
    if (num >= 1000) {
      const qian = num / 1000;
      return trimTrailingZero(qian.toFixed(1)) + '千';
    }
    if (num >= 100) {
      const bai = num / 100;
      return trimTrailingZero(bai.toFixed(1)) + '百';
    }
  } else {
    if (num >= 1000000) {
      const m = num / 1000000;
      return trimTrailingZero(m.toFixed(1)) + 'M';
    }
    if (num >= 1000) {
      const k = num / 1000;
      return trimTrailingZero(k.toFixed(1)) + 'K';
    }
  }

  if (num >= 10) return Math.round(num).toString();
  if (num >= 1) return trimTrailingZero(num.toFixed(1));
  return num.toFixed(2);
}

function trimTrailingZero(s) {
  return s.replace(/\.0$/, '');
}

export function getBadgeColor(isAvailable) {
  return isAvailable ? '#4CAF50' : '#F44336';
}
