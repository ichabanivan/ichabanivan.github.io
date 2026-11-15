import { style } from '@vanilla-extract/css';

export const dialog = style({
  selectors: {
    '&[open]': { display: 'grid', placeItems: 'center' },
    '&::backdrop': { background: 'rgba(0, 0, 0, 0.6)' },
  },
});
