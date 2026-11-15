import { gsap } from '../lib/gsap';
import { duration, ease } from '../lib/motion';
import { onFragmentNavigation } from '../lib/fragment-navigation';
import { motionOk } from '../styles/media';

interface Item {
  src: string;
  caption: string;
  verify: string | null;
  width?: number;
  height?: number;
}

const SELECTOR = 'a[data-lightbox]';

const toItem = (link: HTMLAnchorElement): Item => ({
  src: link.href,
  caption: link.dataset.caption ?? '',
  verify: link.dataset.verify ?? null,
  width: Number(link.dataset.width) || undefined,
  height: Number(link.dataset.height) || undefined,
});

const noop = () => {};

export function initLightbox(): () => void {
  const dialog = document.querySelector<HTMLDialogElement>('[data-lightbox-dialog]');
  const figure = dialog?.querySelector<HTMLElement>('[data-lightbox-figure]');
  let image = dialog?.querySelector<HTMLImageElement>('[data-lightbox-image]');
  const caption = dialog?.querySelector<HTMLElement>('[data-lightbox-caption]');
  const counter = dialog?.querySelector<HTMLElement>('[data-lightbox-counter]');
  const verify = dialog?.querySelector<HTMLAnchorElement>('[data-lightbox-verify]');
  const verifyLabel = verify?.querySelector<HTMLElement>('[data-verify-label]');
  const prev = dialog?.querySelector<HTMLButtonElement>('[data-lightbox-prev]');
  const next = dialog?.querySelector<HTMLButtonElement>('[data-lightbox-next]');
  if (!dialog || !figure || !image || !caption || !counter || !verify || !prev || !next)
    return noop;

  const listeners = new AbortController();
  const { signal } = listeners;
  const blank = image.cloneNode(false) as HTMLImageElement;
  const motion = window.matchMedia(motionOk);
  let items: Item[] = [];
  let index = -1;
  let entrance: gsap.core.Tween | null = null;

  const setSize = (img: HTMLImageElement, name: 'width' | 'height', value?: number) => {
    if (value) img.setAttribute(name, String(value));
    else img.removeAttribute(name);
  };

  const show = (to: number) => {
    index = to;
    const item = items[index];
    const many = items.length > 1;

    const fresh = blank.cloneNode(false) as HTMLImageElement;
    setSize(fresh, 'width', item.width);
    setSize(fresh, 'height', item.height);
    fresh.alt = item.caption;
    fresh.src = item.src;
    image?.replaceWith(fresh);
    image = fresh;

    dialog.setAttribute('aria-label', item.caption || 'Document');
    counter.textContent = many ? `Document ${index + 1} of ${items.length}. ` : '';
    caption.textContent = item.caption;

    verify.hidden = !item.verify;
    if (item.verify) {
      verify.href = item.verify;
      if (verifyLabel) verifyLabel.textContent = `: ${item.caption}`;
      if (verify.lastElementChild) verify.lastElementChild.textContent = ` (${item.verify})`;
    }

    prev.hidden = !many;
    next.hidden = !many;

    entrance?.revert();
    entrance = motion.matches
      ? gsap.fromTo(
          figure,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: duration.fast, ease: ease.soft },
        )
      : null;
  };

  const step = (delta: number) => {
    if (index < 0) return;
    show((index + delta + items.length) % items.length);
  };

  const close = () => {
    if (dialog.open) dialog.close();
  };

  const onDocumentClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = (event.target as Element).closest<HTMLAnchorElement>(SELECTOR);
    if (!link) return;
    event.preventDefault();
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(SELECTOR));
    items = links.map(toItem);
    show(links.indexOf(link));
    if (!dialog.open) dialog.showModal();
  };
  document.addEventListener('click', onDocumentClick, { signal });

  const onBackdropClick = (event: MouseEvent) => {
    if (event.target === dialog) close();
  };
  const onClose = () => {
    entrance?.revert();
    entrance = null;
    items = [];
    index = -1;
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (!dialog.open || items.length < 2) return;
    if (event.key === 'ArrowRight') step(1);
    if (event.key === 'ArrowLeft') step(-1);
  };

  dialog.addEventListener('click', onBackdropClick, { signal });
  dialog.addEventListener('close', onClose, { signal });
  dialog.querySelector('[data-lightbox-close]')?.addEventListener('click', close, { signal });
  prev.addEventListener('click', () => step(-1), { signal });
  next.addEventListener('click', () => step(1), { signal });
  window.addEventListener('keydown', onKeyDown, { signal });
  const stopFragmentNavigation = onFragmentNavigation(close);

  return () => {
    close();
    onClose();
    listeners.abort();
    stopFragmentNavigation();
  };
}
