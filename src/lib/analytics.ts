interface EventParamsByName {
  cv_download: { placement: string };
  contact_click: { method: string; placement: string };
  social_click: { network: string; placement: string };
  nav_click: { target: string; placement: string };
  section_view: { section: string };
  certificate_open: { document: string };
  certificate_verify: { document: string };
  cv_print: Record<string, never>;
  menu_open: Record<string, never>;
  web_vital: { metric_name: string; metric_value: number; metric_rating: string };
  js_error: { error_message: string; error_source: string };
  page_not_found: { requested_path: string; referrer: string };
}

export type EventName = keyof EventParamsByName;
type LooseParams = Record<string, string | number>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    grantAnalyticsConsent?: () => void;
    denyAnalyticsConsent?: () => void;
    analyticsConsentPending?: boolean;
  }
}

const EVENT_NAMES: Record<EventName, true> = {
  cv_download: true,
  contact_click: true,
  social_click: true,
  nav_click: true,
  section_view: true,
  certificate_open: true,
  certificate_verify: true,
  cv_print: true,
  menu_open: true,
  web_vital: true,
  js_error: true,
  page_not_found: true,
};

const DEBUG_KEY = 'ga_debug';

function readDebugFlag() {
  try {
    if (new URLSearchParams(location.search).get(DEBUG_KEY) === '1')
      sessionStorage.setItem(DEBUG_KEY, '1');
    return sessionStorage.getItem(DEBUG_KEY) === '1';
  } catch {
    return false;
  }
}

export const analyticsDebug = readDebugFlag();

export const isEventName = (name: string): name is EventName => name in EVENT_NAMES;

export const analyticsAvailable = () => typeof window.gtag === 'function';

function send(name: EventName, params: LooseParams) {
  if (analyticsDebug) console.debug('[analytics]', name, params);
  window.gtag?.('event', name, {
    ...params,
    transport_type: 'beacon',
    ...(analyticsDebug && { debug_mode: true }),
  });
}

export function trackEvent<Name extends EventName>(name: Name, params: EventParamsByName[Name]) {
  send(name, params);
}

export function trackDeclaredEvent(name: string, params: LooseParams) {
  if (isEventName(name)) send(name, params);
}
