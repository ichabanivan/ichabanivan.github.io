import { gsap } from '../../lib/gsap';
import { duration, ease, stagger } from '../../lib/motion';
import { staggerFrom, type RevealUnit, type Scale } from './types';

const BLOCK_OFFSET = 32;

export function blocks(targets: HTMLElement[], scale: Scale): RevealUnit {
  return {
    show: (elements, direction) => {
      gsap.killTweensOf(elements);
      gsap.fromTo(
        elements,
        { opacity: 0, y: BLOCK_OFFSET * scale.offset * direction },
        {
          opacity: 1,
          y: 0,
          duration: duration.base * scale.time,
          ease: ease.soft,
          stagger: { each: stagger.items, from: staggerFrom(direction) },
          overwrite: 'auto',
          onComplete: () => gsap.set(elements, { clearProps: 'transform' }),
        },
      );
    },
    showNow: (elements) => {
      gsap.killTweensOf(elements);
      gsap.set(elements, { opacity: 1, clearProps: 'transform' });
    },
    hide: (elements) => {
      gsap.killTweensOf(elements);
      gsap.set(elements, { opacity: 0, clearProps: 'transform' });
    },
    cleanup: () => {
      gsap.killTweensOf(targets);
      gsap.set(targets, { clearProps: 'opacity,transform' });
    },
  };
}
