import type { ReactNode } from 'react';
import { Box } from '../../../ui';
import { vars } from '../../../styles/theme.css';

export interface BulletListItem {
  key: string;
  content: ReactNode;
}

export interface BulletListProps {
  items: BulletListItem[];
}

export function BulletList({ items }: BulletListProps) {
  return (
    <Box
      as="ul"
      display="grid"
      gap={{ default: '3', print: '0' }}
      marginTop={{ default: '3', print: '1' }}
    >
      {items.map((item) => (
        <Box
          as="li"
          key={item.key}
          position="relative"
          paddingLeft={{ default: '6', print: '4' }}
          breakInside={{ print: 'avoid-page' }}
        >
          <Box
            as="span"
            aria-hidden
            position="absolute"
            top="0.7em"
            left={0}
            width={{ default: 10, print: '4pt' }}
            height={{ default: 2, print: 1 }}
            background={vars.color.accent}
          />
          {item.content}
        </Box>
      ))}
    </Box>
  );
}
