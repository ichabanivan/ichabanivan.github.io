import type { ReactNode } from 'react';
import { Box, Container, Text, vars, type StyleProps } from '../ui';

type Props = StyleProps & {
  id: string;
  index: string;
  title: string;
  className?: string;
  children: ReactNode;
};

export default function Section({ id, index, title, className, children, ...style }: Props) {
  const titleId = `${id}-title`;
  return (
    <Box
      as="section"
      id={id}
      aria-labelledby={titleId}
      data-section
      className={className}
      paddingBlock={vars.space.section}
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
            fontWeight={600}
            letterSpacing="0.12em"
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
