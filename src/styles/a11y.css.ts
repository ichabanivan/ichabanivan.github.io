import { style } from '@vanilla-extract/css';
import { media } from './media';
import { vars } from './theme.css';

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

export const skipLink = style({
  position: 'fixed',
  top: `calc(${vars.space.headerH} + 8px)`,
  left: vars.space.gutter,
  zIndex: vars.layer.skipLink,
  selectors: {
    '&:not(:focus-within)': {
      width: 1,
      height: 1,
      overflow: 'hidden',
      clipPath: 'inset(50%)',
      whiteSpace: 'nowrap',
    },
  },
});

export const underlined = style({
  textDecoration: 'underline',
  textDecorationThickness: 'from-font',
  textUnderlineOffset: '0.25em',
  '@media': { [media.print]: { textDecoration: 'none' } },
});
