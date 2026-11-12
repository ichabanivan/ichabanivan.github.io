import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from './theme.css';
import { finePointer, media, motionOk } from './media';

export const headerBar = style({
  selectors: {
    '&::before': {
      content: "''",
      position: 'absolute',
      inset: 0,
      zIndex: -1,
      background: vars.color.glass,
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      opacity: 0,
      transition: 'opacity 0.4s',
    },
    '&.is-scrolled::before, &.is-open::before': { opacity: 1 },
    '&.is-on-light::before': { background: vars.color.scrim },
  },
});

export const navMenu = style({
  opacity: 0,
  visibility: 'hidden',
  transform: 'translateY(-12px)',
  transition: `opacity 0.3s, transform 0.4s ${vars.ease}, visibility 0.3s`,
  selectors: { '.is-open &': { opacity: 1, visibility: 'visible', transform: 'none' } },
  '@media': {
    [media.lg]: { opacity: 1, visibility: 'visible', transform: 'none', transition: 'none' },
  },
});

export const navLink = style({
  selectors: {
    '&::after': {
      content: "''",
      display: 'none',
      position: 'absolute',
      inset: 'auto 0 2px 0',
      height: 2,
      background: vars.color.accent,
      transform: 'scaleX(0)',
      transformOrigin: 'left',
      transition: `transform 0.4s ${vars.ease}`,
    },
    "&[aria-current='true']": { color: vars.color.white },
    "&[aria-current='true']::after": { transform: 'scaleX(1)' },
  },
  '@media': { [media.lg]: { selectors: { '&::after': { display: 'block' } } } },
});

export const menuBar = style({
  selectors: {
    '.is-open &:first-child': { transform: 'translateY(5px) rotate(45deg)' },
    '.is-open &:last-child': { transform: 'translateY(-5px) rotate(-45deg)' },
  },
});

export const marqueeWord = style({
  selectors: {
    '&::before': { content: 'attr(data-word)' },
    '&::after': {
      content: "'/'",
      marginLeft: '0.25em',
      color: vars.color.accent,
      WebkitTextStroke: 0,
    },
  },
});

export const dialog = style({
  selectors: {
    '&[open]': { display: 'grid', placeItems: 'center' },
    '&::backdrop': { background: 'rgba(0, 0, 0, 0.6)' },
  },
});

globalStyle(`[data-marquee-track]`, { WebkitTextStroke: `1px ${vars.color.outline}` });

const glass = 'linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04))';
const glassPrimary = 'linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(0, 0, 0, 0.14))';
const sheen = (alpha: number) =>
  `linear-gradient(90deg, transparent, rgba(255, 255, 255, ${alpha}), transparent)`;
const spot = (alpha: number) =>
  `radial-gradient(circle 70px at var(--mx, 50%) var(--my, 0%), rgba(255, 255, 255, ${alpha}), transparent 70%)`;

const fadeOut = 'opacity 0.25s';
const fadeIn = `opacity 0.45s ${vars.ease}`;
const hoverMotion = `${finePointer} and ${motionOk}`;

export const button = style({
  position: 'relative',
  isolation: 'isolate',
  transition: `scale 0.2s ${vars.ease}, translate 0.25s ${vars.ease}`,
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
  transition: `transform 0.9s ${vars.ease}, opacity 0s`,
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
      transition: 'opacity 0.2s, transform 0s 0.2s',
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
  transition: `transform 0.5s ${vars.ease}`,
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

export const hitArea = style({
  position: 'relative',
  selectors: {
    '&::before': {
      content: "''",
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '100%',
      height: '100%',
      minWidth: 44,
      minHeight: 44,
      transform: 'translate(-50%, -50%)',
    },
  },
});

export const srOnly = style({
  position: 'absolute',
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
  border: 0,
});

globalStyle('html:not(.nav-ready) [data-nav-toggle]', { display: 'none' });
