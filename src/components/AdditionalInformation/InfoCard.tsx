import type { ReactNode } from 'react';
import { Box, Card, PrintOnly, Text } from '../../ui';
import { vars } from '../../styles/theme.css';

interface InfoCardProps {
  title: string;
  children: ReactNode;
}

export function InfoCard({ title, children }: InfoCardProps) {
  return (
    <Card data-reveal marginBottom={{ print: '1' }}>
      <Text as="h3" variant="eyebrow" display={{ print: 'inline' }}>
        {title}
        <PrintOnly>: </PrintOnly>
      </Text>
      <Box
        as="ul"
        display={{ default: 'grid', print: 'inline' }}
        gap={{ default: '3', print: '1' }}
        marginTop={{ default: '4', print: '1' }}
        color={vars.color.text}
      >
        {children}
      </Box>
    </Card>
  );
}
