import { analyticsAvailable } from '../lib/analytics';

const CONSENT_KEY = 'analytics_consent';

function hasStoredChoice() {
  try {
    return localStorage.getItem(CONSENT_KEY) !== null;
  } catch {
    return false;
  }
}

export function initConsent() {
  const banner = document.querySelector<HTMLElement>('[data-consent-banner]');
  const opener = document.querySelector<HTMLButtonElement>('[data-consent-open]');
  const accept = banner?.querySelector<HTMLButtonElement>('[data-consent-accept]');
  const decline = banner?.querySelector<HTMLButtonElement>('[data-consent-decline]');
  if (!banner || !opener || !accept || !decline || !analyticsAvailable()) return;

  let reopened = false;
  const choose = (apply: (() => void) | undefined) => () => {
    apply?.();
    banner.hidden = true;
    if (reopened) opener.focus();
  };

  accept.addEventListener('click', choose(window.grantAnalyticsConsent));
  decline.addEventListener('click', choose(window.denyAnalyticsConsent));
  opener.addEventListener('click', () => {
    reopened = true;
    banner.hidden = false;
    accept.focus();
  });

  opener.hidden = false;
  banner.hidden = hasStoredChoice();
}
