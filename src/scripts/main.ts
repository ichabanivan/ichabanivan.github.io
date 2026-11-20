import { ScrollTrigger } from '../lib/gsap';
import { refreshTenures } from '../lib/tenure';
import { initHeader } from './header';
import { initScroll } from './scroll';
import { initHeroStrips } from './hero-strips';
import { initMagnetic } from './magnetic';
import { initLightbox } from './lightbox';
import { initAnalytics } from './analytics';

declare global {
  interface Window {
    __motionReady?: boolean;
  }
}

initHeader();
refreshTenures();
const animate = document.documentElement.classList.contains('js');
window.__motionReady = true;
initScroll({ animate });
initHeroStrips();
initMagnetic();
initLightbox();
initAnalytics();
document.fonts?.ready.then(() => ScrollTrigger.refresh());
