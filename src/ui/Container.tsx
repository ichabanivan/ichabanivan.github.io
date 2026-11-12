import type { ElementType } from 'react';
import { Box, type BoxProps } from './Box';
import { vars } from './theme.css';

export function Container<E extends ElementType = 'div'>(props: BoxProps<E>) {
  return (
    <Box
      width={{ default: `min(${vars.space.wrap}, 100% - ${vars.space.gutter} * 2)`, print: '100%' }}
      marginInline="auto"
      {...(props as BoxProps)}
    />
  );
}
