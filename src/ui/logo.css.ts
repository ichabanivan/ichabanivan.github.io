import { keyframes, style } from '@vanilla-extract/css';
import { vars } from './theme.css';
import { media, motionOk } from './media';

const rise = keyframes({ from: { transform: 'scaleY(0)' } });
const draw = keyframes({ from: { strokeDashoffset: 1 } });

// Same as public/favicon.svg: red tile, white stem, ink arc, in both themes.
// Print stays monochrome (outlined tile, black mark), like the rest of the print styles.
const RED = '#cd0d2e';
const WHITE = '#ffffff';
const INK = '#0b0b0c';

export const tile = style({
  fill: RED,
  '@media': {
    [media.print]: { fill: 'none', stroke: '#000' },
  },
});

export const stem = style({
  fill: WHITE,
  transformBox: 'fill-box',
  transformOrigin: '50% 100%',
  '@media': {
    [media.print]: { fill: '#000' },
    [motionOk]: { animation: `${rise} 0.5s ${vars.easeExpo} 0.05s backwards` },
  },
});

export const arc = style({
  fill: 'none',
  stroke: INK,
  strokeWidth: 8,
  strokeDasharray: 1,
  '@media': {
    [media.print]: { stroke: '#000' },
    [motionOk]: { animation: `${draw} 0.6s ${vars.easeExpo} 0.2s backwards` },
  },
});
