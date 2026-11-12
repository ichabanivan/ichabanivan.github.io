import { keyframes, style, styleVariants } from '@vanilla-extract/css';
import { vars } from './theme.css';
import { motionOk } from './media';

const clip = (top: string, bottom: string) => `polygon(
  calc((var(--l) + var(--k) * (50 - var(${top})) / 100) * 1%) calc(var(${top}) * 1%),
  calc((var(--l) + var(--w) + var(--k) * (50 - var(${top})) / 100) * 1%) calc(var(${top}) * 1%),
  calc((var(--l) + var(--w) + var(--k) * (50 - var(${bottom})) / 100) * 1%) calc(var(${bottom}) * 1%),
  calc((var(--l) + var(--k) * (50 - var(${bottom})) / 100) * 1%) calc(var(${bottom}) * 1%)
)`;

const wipeDown = keyframes({ from: { clipPath: clip('--t', '--t') } });
const wipeUp = keyframes({ from: { clipPath: clip('--b', '--b') } });
const rise = keyframes({ from: { transform: 'translateY(115%)' } });
const fadeUp = (opacity: number) => keyframes({ from: { opacity, transform: 'translateY(24px)' } });
const enter = fadeUp(0.01);

export const strip = style({
  clipPath: clip('--t', '--b'),
  vars: { '--t': 'var(--t1)', '--b': 'var(--b1)' },
  '@media': {
    '(hover: hover) and (pointer: fine)': { vars: { '--t': 'var(--t0)', '--b': 'var(--b0)' } },
  },
});

const wipe = (name: string) =>
  style({
    '@media': {
      [motionOk]: {
        animation: `${name} 1.5s ${vars.easeExpo} backwards`,
        animationDelay: 'calc(0.1s + var(--i) * 0.09s)',
      },
    },
  });

export const stripUp = wipe(wipeUp);
export const stripDown = wipe(wipeDown);

export const nameInner = styleVariants({ 0: 0.2, 1: 0.32 }, (delay) => ({
  '@media': {
    [motionOk]: { animation: `${rise} 1.1s ${vars.easeExpo} ${delay}s backwards` },
  },
}));

const ITEMS = {
  0: { delay: 0.55, name: enter },
  1: { delay: 0.65, name: enter },
  2: { delay: 0.75, name: fadeUp(0) },
};

export const item = styleVariants(ITEMS, ({ delay, name }) => ({
  '@media': {
    [motionOk]: { animation: `${name} 0.9s ${vars.ease} ${delay}s backwards` },
  },
}));
