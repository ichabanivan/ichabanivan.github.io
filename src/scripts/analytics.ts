type EventParams = Record<string, string | number>;

declare global {
  interface Window {
    gtag?: (command: 'event', name: string, params?: EventParams) => void;
  }
}

const CONTACT_METHODS: Record<string, string> = { 'mailto:': 'email', 'tel:': 'phone' };

function track(name: string, params?: EventParams) {
  window.gtag?.('event', name, params);
}

function placementOf(link: Element) {
  return link.closest('header') ? 'header' : (link.closest('section[id]')?.id ?? 'page');
}

function trackClicks() {
  document.addEventListener('click', (event) => {
    const link = (event.target as Element | null)?.closest?.('a');
    if (!link) return;

    const contactMethod = CONTACT_METHODS[link.protocol];
    if (contactMethod)
      track('contact_click', { method: contactMethod, placement: placementOf(link) });
    if (link.hasAttribute('download')) track('cv_download', { placement: placementOf(link) });
    if (link.hasAttribute('data-lightbox'))
      track('certificate_open', { document: link.dataset.caption ?? '' });
  });
}

function trackSectionViews() {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        track('section_view', { section: entry.target.id });
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '-50% 0px -50% 0px' },
  );
  document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
}

export function initAnalytics() {
  if (!window.gtag) return;
  trackClicks();
  trackSectionViews();
  window.addEventListener('beforeprint', () => track('cv_print'));
}
