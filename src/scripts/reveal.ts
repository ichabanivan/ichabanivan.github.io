import { SplitText } from 'gsap/SplitText';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { duration, ease, stagger } from '../lib/motion';

type Dir = 1 | -1;

type Unit = {
  show: (els: HTMLElement[], dir: Dir) => void;
  showNow: (els: HTMLElement[]) => void;
  hide: (els: HTMLElement[]) => void;
  cleanup: () => void;
};

export type Scale = { offset: number; time: number };

const OFFSCREEN = { start: 'top bottom', end: 'bottom top' };

const from = (dir: Dir) => (dir > 0 ? 'start' : 'end');

export function createJumpGuard() {
  let active = true;
  let timer: number | undefined;
  const settle = (ms = 200) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => (active = false), ms);
  };
  const start = () => {
    active = true;
    settle(400);
  };
  const onScroll = () => {
    if (active) settle();
  };
  const onClick = (event: MouseEvent) => {
    if ((event.target as Element | null)?.closest?.('a[href^="#"]')) start();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('hashchange', start);
  document.addEventListener('click', onClick);
  if (document.readyState === 'complete') settle(300);
  else window.addEventListener('load', () => settle(300), { once: true });

  return { isActive: () => active };
}

export type JumpGuard = ReturnType<typeof createJumpGuard>;

function revealOnScroll(
  targets: HTMLElement[],
  unit: Unit,
  jump: JumpGuard,
  band: { start: string; end: string },
): () => void {
  if (!targets.length) return () => {};
  const shown = new WeakSet<Element>();

  const enter = (dir: Dir) => (els: Element[], triggers: ScrollTrigger[]) => {
    const ready = els.filter((el, i) => triggers[i]?.isActive && !shown.has(el)) as HTMLElement[];
    if (!ready.length) return;
    ready.forEach((el) => shown.add(el));
    if (jump.isActive()) unit.showNow(ready);
    else unit.show(ready, dir);
  };

  const leave = (els: Element[]) => {
    const gone = els.filter((el) => shown.has(el)) as HTMLElement[];
    if (!gone.length) return;
    gone.forEach((el) => shown.delete(el));
    unit.hide(gone);
  };

  const bands = ScrollTrigger.batch(targets, {
    ...band,
    onEnter: enter(1),
    onEnterBack: enter(-1),
  });
  ScrollTrigger.batch(targets, { ...OFFSCREEN, onLeave: leave, onLeaveBack: leave });

  const sync = () => {
    const ready = bands
      .filter((st) => st.isActive && !shown.has(st.trigger as Element))
      .map((st) => st.trigger as HTMLElement);
    if (!ready.length) return;
    ready.forEach((el) => shown.add(el));
    unit.showNow(ready);
  };
  ScrollTrigger.addEventListener('refresh', sync);
  sync();

  return () => {
    ScrollTrigger.removeEventListener('refresh', sync);
    unit.cleanup();
  };
}

function headings(targets: HTMLElement[], scale: Scale): Unit {
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
    show: (els, dir) =>
      els.forEach((heading) => {
        stop(heading);
        const chars = splits.get(heading)?.chars ?? [];
        gsap.set(heading, { opacity: 1 });
        anims.set(
          heading,
          gsap.fromTo(
            chars,
            { yPercent: 100 * dir },
            {
              yPercent: 0,
              duration: 0.8 * scale.time,
              ease: ease.out,
              stagger: { each: stagger.chars, from: from(dir) },
              overwrite: 'auto',
              onComplete: () => {
                anims.delete(heading);
                gsap.set(chars, { clearProps: 'transform' });
              },
            },
          ),
        );
      }),
    showNow: (els) =>
      els.forEach((heading) => {
        stop(heading);
        gsap.set(heading, { opacity: 1 });
        gsap.set(splits.get(heading)?.chars ?? [], { clearProps: 'transform' });
      }),
    hide: (els) =>
      els.forEach((heading) => {
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

function blocks(targets: HTMLElement[], scale: Scale): Unit {
  return {
    show: (els, dir) => {
      gsap.killTweensOf(els);
      gsap.fromTo(
        els,
        { opacity: 0, y: 32 * scale.offset * dir },
        {
          opacity: 1,
          y: 0,
          duration: duration.base * scale.time,
          ease: ease.soft,
          stagger: { each: stagger.items, from: from(dir) },
          overwrite: 'auto',
          onComplete: () => gsap.set(els, { clearProps: 'transform' }),
        },
      );
    },
    showNow: (els) => {
      gsap.killTweensOf(els);
      gsap.set(els, { opacity: 1, clearProps: 'transform' });
    },
    hide: (els) => {
      gsap.killTweensOf(els);
      gsap.set(els, { opacity: 0, clearProps: 'transform' });
    },
    cleanup: () => {
      gsap.killTweensOf(targets);
      gsap.set(targets, { clearProps: 'opacity,transform' });
    },
  };
}

function skillRows(targets: HTMLElement[], scale: Scale): Unit {
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
    show: (els, dir) =>
      els.forEach((row, i) => {
        stop(row);
        const order = dir > 0 ? i : els.length - 1 - i;
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
            { opacity: 0, y: 16 * scale.offset * dir },
            { opacity: 1, y: 0, duration: 0.5 * scale.time, ease: ease.soft, overwrite: 'auto' },
          )
          .fromTo(
            lis,
            { opacity: 0, y: 8 * scale.offset * dir },
            {
              opacity: 1,
              y: 0,
              duration: 0.4 * scale.time,
              ease: ease.soft,
              stagger: { amount: 0.25, from: from(dir) },
              overwrite: 'auto',
            },
            0.1,
          );
        anims.set(row, tl);
      }),
    showNow: (els) =>
      els.forEach((row) => {
        stop(row);
        settle(row, 1);
      }),
    hide: (els) =>
      els.forEach((row) => {
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

export function initReveals(jump: JumpGuard, scale: Scale): () => void {
  gsap.registerPlugin(SplitText);
  const all = (selector: string) => gsap.utils.toArray<HTMLElement>(selector);
  const cleanups = [
    revealOnScroll(all('[data-split]'), headings(all('[data-split]'), scale), jump, {
      start: 'top 88%',
      end: 'bottom 12%',
    }),
    revealOnScroll(all('[data-reveal]'), blocks(all('[data-reveal]'), scale), jump, {
      start: 'top 90%',
      end: 'bottom 10%',
    }),
    revealOnScroll(all('[data-skill-row]'), skillRows(all('[data-skill-row]'), scale), jump, {
      start: 'top 92%',
      end: 'bottom 8%',
    }),
  ];
  return () => cleanups.forEach((fn) => fn());
}
