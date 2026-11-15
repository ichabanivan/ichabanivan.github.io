import type { ReactNode } from 'react';
import { Box } from '../Box';

interface ScreenOnlyProps {
  children: ReactNode;
}

export function ScreenOnly({ children }: ScreenOnlyProps) {
  return (
    <Box as="span" display={{ print: 'none' }}>
      {children}
    </Box>
  );
}
