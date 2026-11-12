import type { ReactNode } from 'react';
import { Box } from './Box';

export function PrintOnly({ children }: { children: ReactNode }) {
  return (
    <Box as="span" display={{ default: 'none', print: 'inline' }}>
      {children}
    </Box>
  );
}

export function ScreenOnly({ children }: { children: ReactNode }) {
  return (
    <Box as="span" display={{ print: 'none' }}>
      {children}
    </Box>
  );
}
