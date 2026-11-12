import { style } from '@vanilla-extract/css';
import { vars } from './theme.css';
import { media } from './media';

const finePointer = '(hover: hover) and (pointer: fine)';

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
    '&:not(:last-child)::after': { content: "'/'", marginLeft: '0.35em', color: vars.color.outline },
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

export const label = style({
  backgroundImage: `linear-gradient(${vars.color.accent}, ${vars.color.accent})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '0 100%',
  backgroundSize: '0% 1px',
  '@media': {
    [finePointer]: {
      transition: `background-size 0.5s ${vars.ease}, color 0.3s`,
      selectors: { '&:hover': { backgroundSize: '100% 1px', color: vars.color.white } },
    },
    [media.print]: { backgroundImage: 'none' },
  },
});
