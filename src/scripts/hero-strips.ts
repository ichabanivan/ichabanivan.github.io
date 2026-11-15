import { gsap, ScrollTrigger } from '../lib/gsap';
import { duration, ease } from '../lib/motion';
import { REST, stripWindow } from '../lib/hero-strips';
import { finePointer, motionOk } from '../styles/media';

const SCROLL_SHIFT = 60;

const clamp = gsap.utils.clamp(0, 100);

const noop = () => {};

export function initHeroStrips(): () => void {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return noop;
  const strips = gsap.utils.toArray<HTMLElement>('[data-strip]', hero);

  const mediaContext = gsap.matchMedia();
  mediaContext.add({ motion: motionOk, fine: finePointer }, (ctx) => {
    const { motion, fine } = ctx.conditions as { motion: boolean; fine: boolean };
    if (!motion) return;

    const rest = fine ? REST.fine : REST.coarse;
    const state = { h: rest };
    let pointerH = rest;
    let progress = 0;

    const render = () =>
      strips.forEach((strip, i) => {
        const { t, b } = stripWindow(i, state.h);
        strip.style.setProperty('--t', String(t));
        strip.style.setProperty('--b', String(b));
      });

    const moveTo = gsap.quickTo(state, 'h', {
      duration: duration.base,
      ease: ease.soft,
      onUpdate: render,
    });
    const update = () => moveTo(clamp(pointerH + progress * SCROLL_SHIFT));

    const onPointerMove = (event: PointerEvent) => {
      pointerH = (event.clientY / window.innerHeight) * 100;
      update();
    };
    if (fine) window.addEventListener('pointermove', onPointerMove, { passive: true });

    ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        progress = self.progress;
        update();
      },
    });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      strips.forEach((strip) => {
        strip.style.removeProperty('--t');
        strip.style.removeProperty('--b');
      });
    };
  });

  return () => mediaContext.revert();
}
