import { gsap } from '../../lib/gsap';
import { duration, ease, stagger } from '../../lib/motion';
import { staggerFrom, type RevealUnit, type Scale } from './types';

const ROW_OFFSET = 16;
const ITEM_OFFSET = 8;
const ITEM_DURATION = 0.4;
const ITEM_SPREAD = 0.25;

export function skillRows(targets: HTMLElement[], scale: Scale): RevealUnit {
  const items = new Map(targets.map((row) => [row, [...row.querySelectorAll('li')]]));
  const anims = new Map<HTMLElement, gsap.core.Timeline>();
  const stop = (row: HTMLElement) => {
    anims.get(row)?.kill();
    anims.delete(row);
  };
  const settle = (row: HTMLElement, opacity: number) => {
    gsap.set(row, { opacity, clearProps: 'transform' });
    gsap.set(items.get(row) ?? [], { clearProps: 'opacity,transform' });
  };

  return {
    show: (elements, direction) =>
      elements.forEach((row, i) => {
        stop(row);
        const order = direction > 0 ? i : elements.length - 1 - i;
        const lis = items.get(row) ?? [];
        const tl = gsap
          .timeline({
            delay: order * stagger.items,
            onComplete: () => {
              anims.delete(row);
              settle(row, 1);
            },
          })
          .fromTo(
            row,
            { opacity: 0, y: ROW_OFFSET * scale.offset * direction },
            {
              opacity: 1,
              y: 0,
              duration: duration.fast * scale.time,
              ease: ease.soft,
              overwrite: 'auto',
            },
          )
          .fromTo(
            lis,
            { opacity: 0, y: ITEM_OFFSET * scale.offset * direction },
            {
              opacity: 1,
              y: 0,
              duration: ITEM_DURATION * scale.time,
              ease: ease.soft,
              stagger: { amount: ITEM_SPREAD, from: staggerFrom(direction) },
              overwrite: 'auto',
            },
            0.1,
          );
        anims.set(row, tl);
      }),
    showNow: (elements) =>
      elements.forEach((row) => {
        stop(row);
        settle(row, 1);
      }),
    hide: (elements) =>
      elements.forEach((row) => {
        stop(row);
        settle(row, 0);
      }),
    cleanup: () => {
      targets.forEach(stop);
      gsap.set(targets, { clearProps: 'opacity,transform' });
      gsap.set([...items.values()].flat(), { clearProps: 'opacity,transform' });
    },
  };
}
