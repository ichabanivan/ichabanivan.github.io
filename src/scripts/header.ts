import { media } from '../ui/media';
import { onFragmentNavigation } from '../lib/fragment-navigation';

export function initHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
  if (!header) return;

  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const isOpen = () => header.classList.contains('is-open');
  const setOpen = (open: boolean) => {
    header.classList.toggle('is-open', open);
    toggle?.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    document.querySelectorAll<HTMLElement>('main, footer').forEach((el) => {
      el.inert = open;
    });
  };
  toggle?.addEventListener('click', () => setOpen(!isOpen()));
  header
    .querySelectorAll('nav a')
    .forEach((a) => a.addEventListener('click', () => setOpen(false)));
  window.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !isOpen()) return;
    setOpen(false);
    toggle?.focus();
  });
  window.matchMedia(media.lg).addEventListener('change', () => setOpen(false));
  onFragmentNavigation(() => setOpen(false));

  document.documentElement.classList.add('nav-ready');
}
