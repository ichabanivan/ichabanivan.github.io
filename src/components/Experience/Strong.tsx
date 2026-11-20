import type { ReactNode } from 'react';
import { Box } from '../../ui';
import { vars } from '../../styles/theme.css';

interface StrongProps {
  children: ReactNode;
}

export function Strong({ children }: StrongProps) {
  return (
    <Box as="strong" color={vars.color.text} fontWeight={{ default: 500, print: 600 }}>
      {children}
    </Box>
  );
}
