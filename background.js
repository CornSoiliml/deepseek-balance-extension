import { shortenBalance, getBadgeColor, t, initLang } from './utils.js';

const ALARM_NAME = 'deepseek-balance-refresh';
const DEFAULT_INTERVAL = 30;
const API_URL = 'https://api.deepseek.com/user/balance';

async function getConfig() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(
      { apiKey: '', currency: 'CNY', refreshInterval: DEFAULT_INTERVAL },
      (items) => resolve(items)
    );
  });
}

async function fetchBalance(apiKey) {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

async function updateBadge() {
  await initLang();

  const config = await getConfig();

  if (!config.apiKey) {
    chrome.action.setBadgeText({ text: '?' });
    chrome.action.setBadgeBackgroundColor({ color: '#9E9E9E' });
    chrome.action.setTitle({ title: t('bg_no_key') });
    return;
  }

  try {
    const data = await fetchBalance(config.apiKey);

    await chrome.storage.local.set({
      lastBalance: data,
      lastUpdated: Date.now(),
      lastError: null,
    });

    const info = data.balance_infos?.find((b) => b.currency === config.currency);
    if (!info) {
      const fallback = data.balance_infos?.[0];
      if (fallback) {
        const text = shortenBalance(fallback.total_balance);
        chrome.action.setBadgeText({ text });
        chrome.action.setBadgeBackgroundColor({ color: getBadgeColor(data.is_available) });
        chrome.action.setTitle({
          title: `${fallback.currency} ${fallback.total_balance}`,
        });
      } else {
        chrome.action.setBadgeText({ text: '0' });
        chrome.action.setBadgeBackgroundColor({ color: '#F44336' });
      }
      return;
    }

    const text = shortenBalance(info.total_balance);
    chrome.action.setBadgeText({ text });
    chrome.action.setBadgeBackgroundColor({ color: getBadgeColor(data.is_available) });
    chrome.action.setTitle({
      title: `${info.currency} ${info.total_balance} (${t('bg_granted')}: ${info.granted_balance}, ${t('bg_topped')}: ${info.topped_up_balance})`,
    });
  } catch (err) {
    console.error('[DeepSeek Balance] Balance fetch failed:', err);
    chrome.action.setBadgeText({ text: 'ERR' });
    chrome.action.setBadgeBackgroundColor({ color: '#F44336' });
    chrome.action.setTitle({ title: `${t('bg_fetch_failed')}${err.message}` });

    await chrome.storage.local.set({
      lastError: err.message,
      lastUpdated: Date.now(),
    });
  }
}

async function setupAlarm() {
  const config = await getConfig();
  const interval = Math.max(1, config.refreshInterval || DEFAULT_INTERVAL);

  await chrome.alarms.clear(ALARM_NAME);
  chrome.alarms.create(ALARM_NAME, {
    delayInMinutes: 0.1,
    periodInMinutes: interval,
  });
}

chrome.runtime.onInstalled.addListener(() => {
  setupAlarm();
  updateBadge();
});

chrome.runtime.onStartup.addListener(() => {
  setupAlarm();
  updateBadge();
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === ALARM_NAME) {
    updateBadge();
  }
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync') {
    if (changes.apiKey || changes.currency || changes.refreshInterval) {
      setupAlarm();
      updateBadge();
    }
    if (changes.language) {
      updateBadge();
    }
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'refreshBalance') {
    updateBadge().then(() => sendResponse({ success: true }));
    return true;
  }
});
