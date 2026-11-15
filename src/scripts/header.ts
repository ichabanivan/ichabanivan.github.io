import { media } from '../styles/media';
import { onFragmentNavigation } from '../lib/fragment-navigation';

const SCROLLED_AFTER = 24;
const noop = () => {};

export function initHeader(): () => void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
  if (!header) return noop;

  const listeners = new AbortController();
  const { signal } = listeners;

  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > SCROLLED_AFTER);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true, signal });

  const isOpen = () => header.classList.contains('is-open');
  const setOpen = (open: boolean) => {
    header.classList.toggle('is-open', open);
    toggle?.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    document.querySelectorAll<HTMLElement>('main, footer').forEach((el) => {
      el.inert = open;
    });
  };
  const close = () => setOpen(false);

  toggle?.addEventListener('click', () => setOpen(!isOpen()), { signal });
  header.querySelectorAll('nav a').forEach((a) => a.addEventListener('click', close, { signal }));
  window.addEventListener(
    'keydown',
    (event) => {
      if (event.key !== 'Escape' || !isOpen()) return;
      close();
      toggle?.focus();
    },
    { signal },
  );
  window.matchMedia(media.lg).addEventListener('change', close, { signal });
  const stopFragmentNavigation = onFragmentNavigation(close);

  document.documentElement.classList.add('nav-ready');

  return () => {
    listeners.abort();
    stopFragmentNavigation();
    close();
    header.classList.remove('is-scrolled');
    document.documentElement.classList.remove('nav-ready');
  };
}
