import Section from './Section';
import { profile } from '../data/cv';
import { Box, Button, Text, vars } from '../ui';

const underline = (thickness: string) =>
  `linear-gradient(${vars.color.accent}, ${vars.color.accent}) no-repeat 0 100% / 100% ${thickness}`;

interface Props {
  cvHref: string;
}

export default function Contact({ cvHref }: Props) {
  return (
    <Section
      id="contact"
      index="06"
      title="Contact"
      borderTop={{ default: `1px solid ${vars.color.line}`, print: 0 }}
      display={{ print: 'none' }}
    >
      <Text variant="lead" data-reveal maxWidth="34ch" color={vars.color.muted}>
        {profile.contactNote}
      </Text>
      <Box
        as="a"
        href={`mailto:${profile.email}`}
        data-reveal
        display="inline-block"
        maxWidth="100%"
        marginTop="clamp(20px, 3vw, 36px)"
        paddingBottom="2"
        fontFamily={{ default: vars.font.display, print: 'inherit' }}
        fontSize={{ default: 'clamp(30px, 6.6vw, 104px)', print: 'inherit' }}
        lineHeight={1}
        letterSpacing="0.02em"
        textTransform={{ default: 'uppercase', print: 'none' }}
        overflowWrap="anywhere"
        color={{ default: vars.color.white, hover: vars.color.accentText }}
        background={{ default: underline('3px'), print: 'none' }}
        transition="color 0.3s"
      >
        {profile.email}
      </Box>
      <Box
        data-reveal
        display={{ default: 'flex', print: 'none' }}
        flexWrap="wrap"
        gap="3"
        marginTop="clamp(28px, 4vw, 48px)"
      >
        <Button href={profile.linkedin} target="_blank" rel="me noopener noreferrer">
          LinkedIn
        </Button>{' '}
        <Button href={profile.github} target="_blank" rel="me noopener noreferrer">
          GitHub
        </Button>{' '}
        <Button href={profile.telegram} target="_blank" rel="me noopener noreferrer">
          Telegram
        </Button>{' '}
        <Button variant="primary" href={cvHref} download icon="↓">
          Download CV
        </Button>
      </Box>
    </Section>
  );
}
