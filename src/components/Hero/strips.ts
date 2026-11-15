import type { CSSProperties } from 'react';
import { REST, stripWindow } from '../../lib/hero-strips';

export interface StripLayout {
  left: number;
  width: number;
}

export const STRIPS: StripLayout[] = [
  { left: 14.4, width: 10.6 },
  { left: 28, width: 18.9 },
  { left: 47.2, width: 12.9 },
  { left: 60.4, width: 18.9 },
  { left: 79.7, width: 6.1 },
];

export const ACCENT_STRIP: StripLayout = { left: 89.5, width: 1 };

export const STRIP_SKEW = 32.5;

export const HERO_SIZES =
  '(min-width: 992px) min(58vw, 94svh), (min-width: 768px) min(100vw, 56svh), min(100vw, 70svh)';

export const stripStyle = (strip: StripLayout, index: number) => {
  const fine = stripWindow(index, REST.fine);
  const coarse = stripWindow(index, REST.coarse);
  return {
    '--l': strip.left,
    '--w': strip.width,
    '--i': index,
    '--t0': fine.t,
    '--b0': fine.b,
    '--t1': coarse.t,
    '--b1': coarse.b,
  } as CSSProperties;
};
