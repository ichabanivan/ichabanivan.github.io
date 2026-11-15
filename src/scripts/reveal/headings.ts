import { SplitText } from 'gsap/SplitText';
import { gsap } from '../../lib/gsap';
import { ease, stagger } from '../../lib/motion';
import { staggerFrom, type RevealUnit, type Scale } from './types';

gsap.registerPlugin(SplitText);

const HEADING_DURATION = 0.8;

export function headings(targets: HTMLElement[], scale: Scale): RevealUnit {
  const splits = new Map<HTMLElement, SplitText>();
  const anims = new Map<HTMLElement, gsap.core.Tween>();
  const stop = (heading: HTMLElement) => {
    anims.get(heading)?.kill();
    anims.delete(heading);
  };

  targets.forEach((heading) => {
    const split = SplitText.create(heading, {
      type: 'words,chars',
      mask: 'words',
      autoSplit: true,
      onSplit: () => stop(heading),
    });
    splits.set(heading, split);
  });

  return {
    show: (elements, direction) =>
      elements.forEach((heading) => {
        stop(heading);
        const chars = splits.get(heading)?.chars ?? [];
        gsap.set(heading, { opacity: 1 });
        anims.set(
          heading,
          gsap.fromTo(
            chars,
            { yPercent: 100 * direction },
            {
              yPercent: 0,
              duration: HEADING_DURATION * scale.time,
              ease: ease.out,
              stagger: { each: stagger.chars, from: staggerFrom(direction) },
              overwrite: 'auto',
              onComplete: () => {
                anims.delete(heading);
                gsap.set(chars, { clearProps: 'transform' });
              },
            },
          ),
        );
      }),
    showNow: (elements) =>
      elements.forEach((heading) => {
        stop(heading);
        gsap.set(heading, { opacity: 1 });
        gsap.set(splits.get(heading)?.chars ?? [], { clearProps: 'transform' });
      }),
    hide: (elements) =>
      elements.forEach((heading) => {
        stop(heading);
        gsap.set(heading, { opacity: 0 });
      }),
    cleanup: () => {
      targets.forEach(stop);
      gsap.set(targets, { clearProps: 'opacity' });
      splits.forEach((split) => split.revert());
    },
  };
}
