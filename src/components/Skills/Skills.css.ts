import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';
import { media } from '../../styles/media';

export const backdrop = style({
  position: 'absolute',
  inset: 0,
  zIndex: -1,
  background: vars.color.bg,
  '@media': { [media.print]: { display: 'none' } },
});

export const item = style({
  display: 'inline',
  whiteSpace: 'nowrap',
  selectors: {
    '&:not(:last-child)::after': {
      content: "'/'",
      marginLeft: '0.35em',
      color: vars.color.ghost,
    },
  },
  '@media': {
    [media.print]: { whiteSpace: 'normal', selectors: { '&::after': { content: 'none' } } },
  },
});

export const comma = style({
  display: 'inline-block',
  width: 0,
  overflow: 'hidden',
  verticalAlign: 'bottom',
  '@media': { [media.print]: { display: 'inline', width: 'auto', overflow: 'visible' } },
});
