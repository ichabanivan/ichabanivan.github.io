import { Box, Button, Text } from '../../ui';
import { vars } from '../../styles/theme.css';
import { NameLine } from '../Hero';
import { Marquee } from '../Marquee';

const MARQUEE_WORDS = ['404', 'Not found', 'Wrong turn', 'No such page', 'Dead end', '404'];

interface NotFoundProps {
  homeHref: string;
}

export function NotFound({ homeHref }: NotFoundProps) {
  const gutter = vars.space.gutter;

  return (
    <Box
      as="main"
      id="main"
      data-not-found
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100svh"
      paddingTop={vars.space.headerH}
      overflow="hidden"
    >
      <Box as="section" id="top" padding={`clamp(48px, 9vw, 120px) ${gutter} 8`}>
        <Text variant="eyebrow">Error 404</Text>
        <Box
          as="h1"
          marginTop="4"
          fontFamily={vars.font.display}
          fontSize={{ default: 'clamp(56px, 17vw, 190px)', lg: 'clamp(96px, 13vw, 236px)' }}
          fontWeight={700}
          lineHeight={0.8}
          letterSpacing="0.04em"
          textTransform="uppercase"
          color={vars.color.accent}
        >
          <NameLine line={0}>Page</NameLine>{' '}
          <NameLine line={1} paddingLeft={{ default: '0.5em', lg: '0.85em' }}>
            Not found
          </NameLine>
        </Box>
        <Text
          marginTop="clamp(20px, 3vw, 40px)"
          fontSize="clamp(18px, 2.2vw, 30px)"
          fontWeight={300}
          letterSpacing={{ default: '0.16em', lg: '0.22em' }}
          textTransform="uppercase"
          color={vars.color.textStrong}
        >
          This address does not exist
        </Text>
        <Box display="flex" flexWrap="wrap" gap="3" marginTop="clamp(28px, 4vw, 48px)">
          <Button
            variant="primary"
            href={homeHref}
            data-track="nav_click"
            data-track-target="home"
            data-track-placement="not_found"
          >
            Go to the home page
          </Button>{' '}
          <Button
            href={`${homeHref}#contact`}
            data-track="nav_click"
            data-track-target="contact"
            data-track-placement="not_found"
          >
            Get in touch
          </Button>
        </Box>
      </Box>
      <Marquee words={MARQUEE_WORDS} />
    </Box>
  );
}
