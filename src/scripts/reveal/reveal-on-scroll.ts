import { ScrollTrigger } from '../../lib/gsap';
import type { JumpGuard } from './jump-guard';
import type { Direction, RevealUnit } from './types';

const OFFSCREEN = { start: 'top bottom', end: 'bottom top' };

export function revealOnScroll(
  targets: HTMLElement[],
  unit: RevealUnit,
  jump: JumpGuard,
  band: { start: string; end: string },
): () => void {
  if (!targets.length) return () => {};
  const shown = new WeakSet<Element>();

  const enter = (direction: Direction) => (elements: Element[], triggers: ScrollTrigger[]) => {
    const ready = elements.filter(
      (el, i) => triggers[i]?.isActive && !shown.has(el),
    ) as HTMLElement[];
    if (!ready.length) return;
    ready.forEach((el) => shown.add(el));
    if (jump.isActive()) unit.showNow(ready);
    else unit.show(ready, direction);
  };

  const leave = (elements: Element[]) => {
    const gone = elements.filter((el) => shown.has(el)) as HTMLElement[];
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
