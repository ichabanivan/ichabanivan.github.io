import { gsap } from '../../lib/gsap';
import { blocks } from './blocks';
import { headings } from './headings';
import type { JumpGuard } from './jump-guard';
import { revealOnScroll } from './reveal-on-scroll';
import { skillRows } from './skill-rows';
import type { Scale } from './types';

export function initReveals(jump: JumpGuard, scale: Scale): () => void {
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
