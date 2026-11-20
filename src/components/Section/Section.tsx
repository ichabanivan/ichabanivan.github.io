import type { ReactNode } from 'react';
import { Box, Container, Text, type StyleProps } from '../../ui';
import { vars } from '../../styles/theme.css';

export const HEADING_CLEARANCE = '24px';
const scrollMarginTop = `calc(${HEADING_CLEARANCE} - ${vars.space.section})`;

export type SectionProps = StyleProps & {
  id: string;
  navTarget?: string;
  index: string;
  title: string;
  className?: string;
  children: ReactNode;
};

export function Section({
  id,
  navTarget,
  index,
  title,
  className,
  children,
  ...style
}: SectionProps) {
  const titleId = `${id}-title`;
  return (
    <Box
      as="section"
      id={id}
      aria-labelledby={titleId}
      data-section={navTarget ?? id}
      className={className}
      paddingBlock={vars.space.section}
      scrollMarginTop={{ default: scrollMarginTop, print: '0' }}
      {...style}
    >
      <Container>
        <Box
          as="header"
          display="flex"
          alignItems="baseline"
          gap="4"
          marginBottom={{ default: 'clamp(36px, 6vw, 72px)', print: '1' }}
          borderBottom={{ print: `1px solid ${vars.color.text}` }}
        >
          <Box
            as="span"
            aria-hidden
            fontSize={14}
            fontWeight={500}
            letterSpacing="0.08em"
            color={vars.color.accentText}
            display={{ print: 'none' }}
          >
            {index}
          </Box>{' '}
          <Text
            as="h2"
            variant="display"
            id={titleId}
            data-split
            fontSize={{ default: 'clamp(46px, 7.4vw, 104px)', print: '13pt' }}
            fontWeight={700}
            lineHeight={{ default: 0.95, print: 1.3 }}
          >
            {title}
          </Text>
        </Box>
        {children}
      </Container>
    </Box>
  );
}
