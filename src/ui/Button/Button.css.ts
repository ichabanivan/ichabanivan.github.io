import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';
import { finePointer, motionOk } from '../../styles/media';

const glass = 'linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04))';
const glassPrimary = 'linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(0, 0, 0, 0.14))';
const sheen = (alpha: number) =>
  `linear-gradient(90deg, transparent, rgba(255, 255, 255, ${alpha}), transparent)`;
const spot = (alpha: number) =>
  `radial-gradient(circle 70px at var(--mx, 50%) var(--my, 0%), rgba(255, 255, 255, ${alpha}), transparent 70%)`;

const fadeOut = `opacity ${vars.duration.fast} ${vars.ease}`;
const fadeIn = `opacity ${vars.duration.base} ${vars.ease}`;
const hoverMotion = `${finePointer} and ${motionOk}`;

export const button = style({
  position: 'relative',
  isolation: 'isolate',
  transition: `scale ${vars.duration.fast} ${vars.ease}, translate ${vars.duration.fast} ${vars.ease}`,
  selectors: {
    '&::before': {
      content: "''",
      position: 'absolute',
      inset: 0,
      zIndex: -1,
      borderRadius: 'inherit',
      pointerEvents: 'none',
      background: glass,
      WebkitBackdropFilter: 'blur(14px) saturate(160%)',
      backdropFilter: 'blur(14px) saturate(160%)',
      opacity: 0,
      transition: fadeOut,
    },
    '&::after': {
      content: "''",
      position: 'absolute',
      inset: -1,
      padding: 1,
      borderRadius: 'inherit',
      pointerEvents: 'none',
      background:
        'linear-gradient(180deg, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0.08) 55%, rgba(255, 255, 255, 0.22))',
      WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
      WebkitMaskComposite: 'xor',
      mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)',
      opacity: 0,
      transition: fadeOut,
    },
    '&:focus-visible': { borderRadius: 999 },
    '&:focus-visible::before, &:focus-visible::after': { opacity: 1, transition: fadeIn },
  },
  '@media': {
    [finePointer]: {
      selectors: { '&:hover::before, &:hover::after': { opacity: 1, transition: fadeIn } },
    },
    [hoverMotion]: { selectors: { '&:not([data-tracked]):hover': { translate: '0 -1px' } } },
    [motionOk]: { selectors: { '&:active': { scale: 0.97 } } },
  },
});

export const buttonPrimary = style({
  selectors: { '&::before': { background: glassPrimary } },
});

const sweep = {
  opacity: 1,
  transform: 'translateX(320%) skewX(-20deg)',
  transition: `transform ${vars.duration.slow} ${vars.ease}, opacity 0s`,
};

export const buttonDeco = style({
  position: 'absolute',
  inset: 0,
  zIndex: -1,
  borderRadius: 'inherit',
  overflow: 'hidden',
  pointerEvents: 'none',
  selectors: {
    '&::before': {
      content: "''",
      position: 'absolute',
      top: '-50%',
      bottom: '-50%',
      left: 0,
      width: '45%',
      background: sheen(0.16),
      opacity: 0,
      transform: 'translateX(-120%) skewX(-20deg)',
      transition: `opacity ${vars.duration.fast} ${vars.ease}, transform 0s ${vars.duration.fast}`,
    },
    '&::after': {
      content: "''",
      position: 'absolute',
      inset: 0,
      background: spot(0.14),
      opacity: 0,
      transition: fadeOut,
    },
    [`${buttonPrimary} &::before`]: { background: sheen(0.05) },
    [`${buttonPrimary} &::after`]: { background: spot(0.05) },
    [`${button}[data-tracked] &::before`]: { display: 'none' },
    [`${button}[data-tracked]:focus-visible &::after`]: { opacity: 1, transition: fadeIn },
  },
  '@media': {
    [motionOk]: { selectors: { [`${button}:focus-visible &::before`]: sweep } },
    [hoverMotion]: {
      selectors: {
        [`${button}:hover &::before`]: sweep,
        [`${button}[data-tracked]:hover &::after`]: { opacity: 1, transition: fadeIn },
      },
    },
  },
});

export const buttonIcon = style({
  display: 'inline-block',
  transition: `transform ${vars.duration.base} ${vars.ease}`,
  selectors: { '&::before': { content: 'attr(data-text)' } },
  '@media': {
    [motionOk]: {
      selectors: {
        [`${button}:focus-visible &`]: { transform: 'translate(2px, -2px)' },
        [`${button}:focus-visible &[data-text="↓"]`]: { transform: 'translateY(3px)' },
      },
    },
    [hoverMotion]: {
      selectors: {
        [`${button}:hover &`]: { transform: 'translate(2px, -2px)' },
        [`${button}:hover &[data-text="↓"]`]: { transform: 'translateY(3px)' },
      },
    },
  },
});
