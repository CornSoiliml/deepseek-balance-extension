import { t, applyI18n, initLang, setLangOnly } from './utils.js';

await initLang();
applyI18n();

const apiKeyInput = document.getElementById('apiKey');
const currencySelect = document.getElementById('currency');
const refreshIntervalInput = document.getElementById('refreshInterval');
const languageSelect = document.getElementById('language');
const saveBtn = document.getElementById('saveBtn');
const testBtn = document.getElementById('testBtn');
const toggleKeyBtn = document.getElementById('toggleKey');
const toast = document.getElementById('toast');

chrome.storage.sync.get(
  { apiKey: '', currency: 'CNY', refreshInterval: 30, language: '' },
  (items) => {
    apiKeyInput.value = items.apiKey;
    currencySelect.value = items.currency;
    refreshIntervalInput.value = items.refreshInterval;
    languageSelect.value = items.language || '';
  }
);

languageSelect.addEventListener('change', () => {
  setLangOnly(languageSelect.value);
  applyI18n();
});

toggleKeyBtn.addEventListener('click', () => {
  const isPassword = apiKeyInput.type === 'password';
  apiKeyInput.type = isPassword ? 'text' : 'password';
});

saveBtn.addEventListener('click', () => {
  const apiKey = apiKeyInput.value.trim();
  const currency = currencySelect.value;
  const refreshInterval = Math.max(1, parseInt(refreshIntervalInput.value, 10) || 30);
  const language = languageSelect.value;

  if (!apiKey) {
    showToast(t('opt_enter_key'), true);
    return;
  }

  setLangOnly(language);
  chrome.storage.sync.set({ apiKey, currency, refreshInterval, language }, () => {
    showToast(t('opt_saved'));
    chrome.runtime.sendMessage({ action: 'refreshBalance' });
  });
});

testBtn.addEventListener('click', async () => {
  const apiKey = apiKeyInput.value.trim();
  if (!apiKey) {
    showToast(t('opt_enter_key'), true);
    return;
  }

  testBtn.disabled = true;
  testBtn.textContent = t('opt_testing');

  try {
    const response = await fetch('https://api.deepseek.com/user/balance', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const info = data.balance_infos?.[0];
    if (info) {
      showToast(`${t('opt_test_ok')}${info.currency} ${info.total_balance}`);
    } else {
      showToast(t('opt_test_no_balance'), true);
    }
  } catch (err) {
    showToast(`${t('opt_test_fail')}${err.message}`, true);
  } finally {
    testBtn.disabled = false;
    testBtn.textContent = t('opt_test_btn');
  }
});

function showToast(message, isError = false) {
  toast.textContent = message;
  toast.className = 'toast show' + (isError ? ' error' : '');
  setTimeout(() => {
    toast.className = 'toast';
  }, 3000);
}
