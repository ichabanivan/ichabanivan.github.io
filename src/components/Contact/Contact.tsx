import { Section } from '../Section';
import { profile } from '../../data/cv';
import { Box, Button, Text } from '../../ui';
import { vars } from '../../styles/theme.css';

const underline = (thickness: string) =>
  `linear-gradient(${vars.color.accent}, ${vars.color.accent}) no-repeat 0 100% / 100% ${thickness}`;

interface ContactProps {
  cvHref: string;
}

export function Contact({ cvHref }: ContactProps) {
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
        data-track="contact_click"
        data-track-method="email"
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
        color={{ default: vars.color.textStrong, hover: vars.color.accentText }}
        background={{ default: underline('3px'), print: 'none' }}
        transition={`color ${vars.duration.base} ${vars.ease}`}
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
        <Button
          href={profile.linkedin}
          target="_blank"
          rel="me noopener noreferrer"
          data-track="social_click"
          data-track-network="linkedin"
        >
          LinkedIn
        </Button>{' '}
        <Button
          href={profile.github}
          target="_blank"
          rel="me noopener noreferrer"
          data-track="social_click"
          data-track-network="github"
        >
          GitHub
        </Button>{' '}
        <Button
          href={profile.telegram}
          target="_blank"
          rel="me noopener noreferrer"
          data-track="social_click"
          data-track-network="telegram"
        >
          Telegram
        </Button>{' '}
        <Button variant="primary" href={cvHref} download icon="↓" data-track="cv_download">
          Download CV
        </Button>
      </Box>
    </Section>
  );
}
