import type { ElementType } from 'react';
import { Box, type BoxProps, type StyleProps } from './Box';
import { vars } from './theme.css';

const textVariants = {
  body: {},
  display: {
    fontFamily: vars.font.display,
    lineHeight: 1,
    letterSpacing: '0.03em',
    textTransform: 'uppercase',
    color: vars.color.white,
  },
  eyebrow: {
    fontSize: { default: 13, print: 'inherit' },
    fontWeight: 600,
    letterSpacing: { default: '0.1em', print: 0 },
    textTransform: { default: 'uppercase', print: 'none' },
    color: vars.color.accentText,
  },
  lead: { fontSize: { default: 'clamp(18px, 1.9vw, 25px)', print: 'inherit' }, fontWeight: 300 },
  meta: { fontSize: { default: 14, print: 'inherit' }, color: vars.color.muted },
  title: { fontSize: 16, fontWeight: 600, lineHeight: 1.35, color: vars.color.white },
} satisfies Record<string, StyleProps>;

export type TextProps<E extends ElementType = 'p'> = BoxProps<E> & {
  variant?: keyof typeof textVariants;
};

export function Text<E extends ElementType = 'p'>({
  variant = 'body',
  as,
  ...props
}: TextProps<E>) {
  const merged = { as: as ?? 'p', ...textVariants[variant], ...props } as BoxProps;
  return <Box {...merged} />;
}
