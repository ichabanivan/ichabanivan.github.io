import type { ReactNode } from 'react';
import { Box } from '../Box';

interface PrintOnlyProps {
  children: ReactNode;
}

export function PrintOnly({ children }: PrintOnlyProps) {
  return (
    <Box as="span" display={{ default: 'none', print: 'inline' }}>
      {children}
    </Box>
  );
}
