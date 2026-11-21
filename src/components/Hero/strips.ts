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

const HERO_WIDTHS = {
  lg: 'min(58vw, 94svh)',
  md: 'min(100vw, 56svh)',
  base: 'min(100vw, 70svh)',
};

const MAX_DENSITY = 2;
const DENSE_SCREEN_DENSITY = 3;
const DENSE_SCREEN_THRESHOLD = 2.5;

const heroSizes = (scale: (width: string) => string) =>
  `(min-width: 992px) ${scale(HERO_WIDTHS.lg)}, (min-width: 768px) ${scale(HERO_WIDTHS.md)}, ${scale(HERO_WIDTHS.base)}`;

export const HERO_SIZES = heroSizes((width) => width);

export const HERO_SIZES_DENSE = heroSizes(
  (width) => `calc(${width} * ${MAX_DENSITY} / ${DENSE_SCREEN_DENSITY})`,
);

export const DENSE_SCREEN = `(-webkit-min-device-pixel-ratio: ${DENSE_SCREEN_THRESHOLD}), (min-resolution: ${DENSE_SCREEN_THRESHOLD}dppx)`;

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
