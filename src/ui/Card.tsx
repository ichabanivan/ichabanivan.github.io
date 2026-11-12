import type { ElementType } from 'react';
import { Box, type BoxProps } from './Box';
import { vars } from './theme.css';

export function Card<E extends ElementType = 'div'>(props: BoxProps<E>) {
  return (
    <Box
      padding={{ default: 'clamp(16px, 2.2vw, 28px)', print: '0' }}
      border={{ default: `1px solid ${vars.color.line}`, print: 0 }}
      borderRadius={vars.radius}
      background={{ default: vars.color.surface, print: 'none' }}
      {...(props as BoxProps)}
    />
  );
}
