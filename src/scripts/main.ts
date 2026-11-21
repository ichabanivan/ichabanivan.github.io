import { ScrollTrigger } from '../lib/gsap';
import { refreshTenures } from '../lib/tenure';
import { initHeader } from './header';
import { initScroll } from './scroll';
import { initHeroStrips } from './hero-strips';
import { initMagnetic } from './magnetic';
import { initLightbox } from './lightbox';
import { initAnalytics } from './analytics';
import { initConsent } from './consent';
import { keepFragmentTargetInView } from './fragment-target';

declare global {
  interface Window {
    __motionReady?: boolean;
  }
}

export function startPage() {
  initHeader();
  refreshTenures();
  const animate = document.documentElement.classList.contains('js');
  window.__motionReady = true;
  initScroll({ animate });
  const realignFragmentTarget = keepFragmentTargetInView();
  initHeroStrips();
  initMagnetic();
  initLightbox();
  initAnalytics();
  initConsent();
  void document.fonts?.ready.then(() => {
    ScrollTrigger.refresh();
    realignFragmentTarget();
  });
}
