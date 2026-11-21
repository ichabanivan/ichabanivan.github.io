import { Box, Button, Container, Text } from '../../ui';
import { vars } from '../../styles/theme.css';

interface NotFoundProps {
  homeHref: string;
}

export function NotFound({ homeHref }: NotFoundProps) {
  return (
    <Box
      as="main"
      id="main"
      display="flex"
      alignItems="center"
      minHeight="100svh"
      paddingBlock={vars.space.section}
    >
      <Container>
        <Text variant="eyebrow">Error 404</Text>
        <Text
          as="h1"
          variant="display"
          marginTop="4"
          fontSize="clamp(46px, 7.4vw, 104px)"
          fontWeight={700}
          lineHeight={0.95}
        >
          Page not found
        </Text>
        <Text variant="lead" maxWidth="34ch" marginTop="6" color={vars.color.muted}>
          This address does not exist. The CV, experience and contact details are on the home page.
        </Text>
        <Box marginTop="clamp(28px, 4vw, 48px)">
          <Button variant="primary" href={homeHref}>
            Go to the home page
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
