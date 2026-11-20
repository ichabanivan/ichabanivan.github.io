import { profile } from '../../data/cv';
import { Box, Button, Text } from '../../ui';
import { vars } from '../../styles/theme.css';
import * as styles from './Hero.css';
import { HeroContacts } from './HeroContacts';
import { HeroPortrait, type HeroPhoto } from './HeroPortrait';
import { NameLine } from './NameLine';

interface HeroProps {
  photo: HeroPhoto;
}

export function Hero({ photo }: HeroProps) {
  const gutter = vars.space.gutter;

  return (
    <Box
      as="section"
      id="top"
      data-hero
      position="relative"
      display={{ default: 'grid', print: 'block' }}
      gridTemplateColumns={{ default: 'minmax(0, 1fr)', lg: 'repeat(12, minmax(0, 1fr))' }}
      alignItems={{ default: 'start', lg: 'center' }}
      minHeight={{ default: 0, lg: '100svh', print: 0 }}
      padding={{
        default: `${vars.space.headerH} 0 6`,
        lg: `${vars.space.headerH} 0 0`,
        print: '0',
      }}
      overflow="hidden"
    >
      <Box
        position="relative"
        zIndex={2}
        gridColumn={{ default: '1', lg: '1 / 9' }}
        gridRow={{ default: 2, lg: 1 }}
        marginTop={{ default: '-19vw', lg: '0', print: '0' }}
        padding={{ default: `0 ${gutter}`, lg: `8 0 8 ${gutter}`, print: '0' }}
      >
        <Box
          as="h1"
          fontFamily={vars.font.display}
          fontSize={{
            default: 'clamp(72px, 26vw, 190px)',
            lg: 'clamp(96px, 15.5vw, 236px)',
            print: '26pt',
          }}
          fontWeight={700}
          lineHeight={{ default: 0.8, print: 1 }}
          letterSpacing="0.04em"
          textTransform="uppercase"
          color={vars.color.accent}
        >
          <NameLine line={0}>{profile.firstName}</NameLine>{' '}
          <NameLine line={1} paddingLeft={{ default: '0.5em', lg: '0.85em', print: '0' }}>
            {profile.lastName}
          </NameLine>
        </Box>
        <Text
          className={styles.item[0]}
          marginTop={{ default: 'clamp(20px, 3vw, 40px)', print: '1' }}
          fontSize={{ default: 'clamp(18px, 2.2vw, 30px)', print: '11pt' }}
          fontWeight={300}
          letterSpacing={{ default: '0.16em', lg: '0.22em', print: '0.05em' }}
          textTransform="uppercase"
          color={vars.color.textStrong}
        >
          {profile.title}
        </Text>
        <HeroContacts />
        <Box
          className={styles.item[2]}
          display={{ default: 'flex', print: 'none' }}
          flexWrap="wrap"
          gap="3"
          marginTop="clamp(28px, 4vw, 48px)"
        >
          <Button href="#experience" data-track="nav_click" data-track-target="experience">
            View experience
          </Button>{' '}
          <Button href="#contact" data-track="nav_click" data-track-target="contact">
            Get in touch
          </Button>
        </Box>
      </Box>

      <HeroPortrait photo={photo} />
    </Box>
  );
}
