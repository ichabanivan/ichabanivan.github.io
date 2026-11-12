import { keyframes, style } from '@vanilla-extract/css';
import { vars } from './theme.css';
import { motionOk } from './media';

const rise = keyframes({ from: { transform: 'scaleY(0)' } });
const draw = keyframes({ from: { strokeDashoffset: 1 } });

export const tile = style({ fill: vars.color.surface, stroke: vars.color.line });

export const stem = style({
  fill: 'currentColor',
  transformBox: 'fill-box',
  transformOrigin: '50% 100%',
  '@media': {
    [motionOk]: { animation: `${rise} 0.5s ${vars.easeExpo} 0.05s backwards` },
  },
});

export const arc = style({
  fill: 'none',
  stroke: vars.color.accent,
  strokeWidth: 8,
  strokeDasharray: 1,
  '@media': {
    [motionOk]: { animation: `${draw} 0.6s ${vars.easeExpo} 0.2s backwards` },
  },
});
