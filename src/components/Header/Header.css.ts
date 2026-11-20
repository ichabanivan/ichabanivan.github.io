import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';
import { media } from '../../styles/media';

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
      transition: `opacity ${vars.duration.base} ${vars.ease}`,
    },
    '&.is-scrolled::before, &.is-open::before': { opacity: 1 },
    '&.is-on-light::before': { background: vars.color.glassStrong },
  },
});

export const navMenu = style({
  opacity: 0,
  visibility: 'hidden',
  transform: 'translateY(-12px)',
  transition: `opacity ${vars.duration.base} ${vars.ease}, transform ${vars.duration.base} ${vars.ease}, visibility ${vars.duration.base}`,
  selectors: { '.is-open &': { opacity: 1, visibility: 'visible', transform: 'none' } },
  '@media': {
    [media.lg]: { opacity: 1, visibility: 'visible', transform: 'none', transition: 'none' },
  },
});

export const navLink = style({
  selectors: {
    '&::after': {
      content: "''",
      position: 'absolute',
      inset: 'auto 0 2px 0',
      height: 2,
      background: vars.color.accent,
      transform: 'scaleX(0)',
      transformOrigin: 'left',
      transition: `transform ${vars.duration.base} ${vars.ease}`,
    },
    "&[aria-current='location']": { color: vars.color.textStrong },
    "&[aria-current='location']::after": { transform: 'scaleX(1)' },
  },
});

export const menuBar = style({
  selectors: {
    '.is-open &:first-child': { transform: 'translateY(5px) rotate(45deg)' },
    '.is-open &:last-child': { transform: 'translateY(-5px) rotate(-45deg)' },
  },
});

globalStyle('html:not(.nav-ready) [data-nav-toggle]', { display: 'none' });
