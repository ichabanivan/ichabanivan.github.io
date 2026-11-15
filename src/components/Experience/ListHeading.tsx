import type { ReactNode } from 'react';
import { Text } from '../../ui';
import { vars } from '../../styles/theme.css';

interface ListHeadingProps {
  children: ReactNode;
}

export function ListHeading({ children }: ListHeadingProps) {
  return (
    <Text
      as="h5"
      variant="eyebrow"
      marginTop={{ default: '5', print: '1' }}
      color={vars.color.muted}
    >
      {children}
    </Text>
  );
}
