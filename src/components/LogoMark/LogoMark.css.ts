import { keyframes, style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';
import { media, motionOk } from '../../styles/media';

const rise = keyframes({ from: { transform: 'scaleY(0)' } });
const draw = keyframes({ from: { strokeDashoffset: 1 } });

const FAVICON_RED = '#cd0d2e';
const FAVICON_WHITE = '#ffffff';
const FAVICON_INK = '#0b0b0c';

export const tile = style({
  fill: FAVICON_RED,
  '@media': {
    [media.print]: { fill: 'none', stroke: '#000' },
  },
});

export const stem = style({
  fill: FAVICON_WHITE,
  transformBox: 'fill-box',
  transformOrigin: '50% 100%',
  '@media': {
    [media.print]: { fill: '#000' },
    [motionOk]: { animation: `${rise} 0.5s ${vars.easeExpo} 0.05s backwards` },
  },
});

export const arc = style({
  fill: 'none',
  stroke: FAVICON_INK,
  strokeWidth: 8,
  strokeDasharray: 1,
  '@media': {
    [media.print]: { stroke: '#000' },
    [motionOk]: { animation: `${draw} 0.6s ${vars.easeExpo} 0.2s backwards` },
  },
});
