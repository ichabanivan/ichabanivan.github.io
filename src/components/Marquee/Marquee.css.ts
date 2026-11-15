import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

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

globalStyle(`[data-marquee-track]`, { WebkitTextStroke: `1px ${vars.color.outline}` });
