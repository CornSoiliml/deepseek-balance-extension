import { t, applyI18n, initLang } from './utils.js';

await initLang();
applyI18n();

const content = document.getElementById('content');
const updateTimeEl = document.getElementById('updateTime');
const refreshBtn = document.getElementById('refreshBtn');
const settingsBtn = document.getElementById('settingsBtn');

settingsBtn.addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});

refreshBtn.addEventListener('click', () => {
  refreshBtn.classList.add('spinning');
  chrome.runtime.sendMessage({ action: 'refreshBalance' }, () => {
    setTimeout(() => {
      refreshBtn.classList.remove('spinning');
      loadData();
    }, 1000);
  });
});

function loadData() {
  chrome.storage.sync.get({ apiKey: '', currency: 'CNY' }, (config) => {
    if (!config.apiKey) {
      content.innerHTML = `
        <div class="no-key">
          <p>${t('pop_no_key_title')}</p>
          <p style="margin-top:8px"><a id="goSettings">${t('pop_go_settings')}</a></p>
        </div>
      `;
      document.getElementById('goSettings')?.addEventListener('click', () => {
        chrome.runtime.openOptionsPage();
      });
      return;
    }

    chrome.storage.local.get(
      { lastBalance: null, lastUpdated: null, lastError: null },
      (data) => {
        if (data.lastError && !data.lastBalance) {
          content.innerHTML = `
            <div class="error-box">
              <p>${t('pop_fetch_failed')}</p>
              <p style="margin-top:4px;font-size:12px;color:#999">${escapeHtml(data.lastError)}</p>
            </div>
          `;
          renderUpdateTime(data.lastUpdated);
          return;
        }

        if (!data.lastBalance) {
          content.innerHTML = `<div class="loading">${t('pop_loading')}</div>`;
          chrome.runtime.sendMessage({ action: 'refreshBalance' }, () => {
            setTimeout(loadData, 2000);
          });
          return;
        }

        renderBalance(data.lastBalance, config.currency);
        renderUpdateTime(data.lastUpdated);
      }
    );
  });
}

function renderBalance(data, preferredCurrency) {
  const isAvailable = data.is_available;
  const infos = data.balance_infos || [];

  if (infos.length === 0) {
    content.innerHTML = `<div class="error-box">${t('pop_no_balance')}</div>`;
    return;
  }

  const sorted = [...infos].sort((a, b) => {
    if (a.currency === preferredCurrency) return -1;
    if (b.currency === preferredCurrency) return 1;
    return 0;
  });

  let html = `
    <div class="balance-card">
      <div class="status-row">
        <span class="status-dot ${isAvailable ? 'available' : 'unavailable'}"></span>
        <span class="status-text">${isAvailable ? t('pop_available') : t('pop_insufficient')}</span>
      </div>
  `;

  for (const info of sorted) {
    const symbol = info.currency === 'CNY' ? '¥' : '$';
    html += `
      <div class="currency-section">
        <div class="currency-header">${info.currency}</div>
        <div class="total-balance">${symbol}${info.total_balance}</div>
        <div class="balance-details">
          <div class="detail-item">
            <div class="detail-label">${t('pop_granted')}</div>
            <div class="detail-value">${symbol}${info.granted_balance}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">${t('pop_topped')}</div>
            <div class="detail-value">${symbol}${info.topped_up_balance}</div>
          </div>
        </div>
      </div>
    `;
  }

  html += `</div>`;
  content.innerHTML = html;
}

function renderUpdateTime(timestamp) {
  if (!timestamp) {
    updateTimeEl.textContent = '';
    return;
  }
  const date = new Date(timestamp);
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  updateTimeEl.textContent = `${t('pop_updated')}${hh}:${mm}:${ss}`;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

loadData();
