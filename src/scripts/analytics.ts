import { onCLS, onINP, onLCP } from 'web-vitals';
import {
  analyticsAvailable,
  analyticsDebug,
  trackDeclaredEvent,
  trackEvent,
} from '../lib/analytics';

const TRACK_PARAM = /^track(?=[A-Z])/;
const MAX_REPORTED_ERRORS = 3;
const MESSAGE_LIMIT = 100;
const CLS_SCALE = 1000;
const PATH_LIMIT = 100;

const toSnakeCase = (camel: string) =>
  camel.replace(/[A-Z]/g, (letter, index) => `${index ? '_' : ''}${letter.toLowerCase()}`);

function placementOf(element: Element) {
  if (element.closest('header')) return 'header';
  if (element.closest('dialog')) return 'lightbox';
  return element.closest('section[id]')?.id ?? 'page';
}

function declaredParams(element: HTMLElement) {
  const params: Record<string, string> = {};
  for (const [key, value] of Object.entries(element.dataset)) {
    if (!TRACK_PARAM.test(key) || value === undefined) continue;
    params[toSnakeCase(key.replace(TRACK_PARAM, ''))] = value;
  }
  params.placement ??= placementOf(element);
  return params;
}

function trackClicks() {
  document.addEventListener('click', (event) => {
    const target = event.target as Element | null;

    const tracked = target?.closest?.<HTMLElement>('[data-track]');
    if (tracked?.dataset.track) trackDeclaredEvent(tracked.dataset.track, declaredParams(tracked));

    const menuToggle = target?.closest?.('[data-nav-toggle]');
    if (menuToggle?.getAttribute('aria-expanded') === 'true') trackEvent('menu_open', {});
  });
}

function trackSectionViews() {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        trackEvent('section_view', { section: entry.target.id });
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '-50% 0px -50% 0px' },
  );
  document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
}

function trackErrors() {
  let remaining = MAX_REPORTED_ERRORS;
  const report = (message: string, source: string) => {
    if (remaining <= 0) return;
    remaining -= 1;
    trackEvent('js_error', {
      error_message: message.slice(0, MESSAGE_LIMIT),
      error_source: source,
    });
  };

  window.addEventListener('error', (event) => {
    if (!event.message) return;
    const file = event.filename.split(/[?#]/)[0].split('/').pop() || 'page';
    report(event.message, `${file}:${event.lineno}`);
  });
  window.addEventListener('unhandledrejection', (event) => {
    const reason: unknown = event.reason;
    report(reason instanceof Error ? reason.message : String(reason), 'promise');
  });
}

function trackWebVitals() {
  const report = (metric: { name: string; value: number; rating: string }) =>
    trackEvent('web_vital', {
      metric_name: metric.name,
      metric_value: Math.round(metric.name === 'CLS' ? metric.value * CLS_SCALE : metric.value),
      metric_rating: metric.rating,
    });
  onCLS(report);
  onINP(report);
  onLCP(report);
}

function trackNotFound() {
  if (!document.querySelector('[data-not-found]')) return;
  trackEvent('page_not_found', {
    requested_path: location.pathname.slice(0, PATH_LIMIT),
    referrer: document.referrer.slice(0, PATH_LIMIT) || 'direct',
  });
}

export function initAnalytics() {
  if (!analyticsAvailable() && !analyticsDebug) return;
  trackClicks();
  trackSectionViews();
  trackErrors();
  trackWebVitals();
  trackNotFound();
  window.addEventListener('beforeprint', () => trackEvent('cv_print', {}));
}
