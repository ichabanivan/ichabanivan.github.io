import { style } from '@vanilla-extract/css';

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
