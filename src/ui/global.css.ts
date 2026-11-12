import { globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css';
import { media, motionOk, reducedMotion } from './media';

const print = media.print;

globalStyle('*, *::before, *::after', { boxSizing: 'border-box' });

globalStyle('html', {
  WebkitTextSizeAdjust: '100%',
  scrollBehavior: 'smooth',
  scrollPaddingTop: `calc(${vars.space.headerH} + 16px)`,
  '@media': { [reducedMotion]: { scrollBehavior: 'auto' } },
});

globalStyle('body', {
  margin: 0,
  background: vars.color.bg,
  color: vars.color.text,
  fontFamily: vars.font.body,
  fontSize: 16,
  lineHeight: 1.65,
  WebkitFontSmoothing: 'antialiased',
  overflowX: 'clip',
});

globalStyle('h1, h2, h3, h4, p, ul, ol, dl, dd, address', { margin: 0 });
globalStyle('ul, ol', { padding: 0, listStyle: 'none' });
globalStyle('address', { fontStyle: 'normal' });
globalStyle('img', { display: 'block', maxWidth: '100%' });
globalStyle('a', { color: 'inherit', textDecoration: 'none' });

globalStyle(':focus-visible', {
  outline: `2px solid ${vars.color.accentText}`,
  outlineOffset: 3,
  borderRadius: 4,
});

globalStyle('::selection', { background: vars.color.accent, color: vars.color.white });

globalStyle('main:focus', { outline: 'none' });

globalStyle('html:has(dialog[open])', { overflow: 'hidden' });

globalStyle('.js [data-reveal]', {
  '@media': { [motionOk]: { opacity: 0 } },
});
globalStyle('.js [data-split], .js [data-skill-row]', {
  '@media': { [motionOk]: { opacity: 0 } },
});

globalStyle('*, *::before, *::after', {
  '@media': {
    [reducedMotion]: {
      transitionDuration: '0.01ms !important',
      animationDuration: '0.01ms !important',
      animationIterationCount: '1 !important',
    },
  },
});

globalStyle('html, body', {
  '@media': {
    [print]: { background: vars.color.white, color: vars.color.text, fontSize: '9pt', lineHeight: 1.3 },
  },
});

globalStyle('[data-reveal], [data-split], [data-split] *, [data-skill-row], [data-skill-row] *', {
  '@media': {
    [print]: {
      opacity: '1 !important',
      visibility: 'visible !important' as 'visible',
      transform: 'none !important',
    },
  },
});

globalStyle('*', {
  '@media': {
    [print]: {
      color: `${vars.color.text} !important`,
      animation: 'none !important',
      boxShadow: 'none !important',
      textShadow: 'none !important',
    },
  },
});

globalStyle('h2, h3, h4', { '@media': { [print]: { breakAfter: 'avoid' } } });

globalStyle('p, li', { '@media': { [print]: { orphans: 3, widows: 3 } } });
