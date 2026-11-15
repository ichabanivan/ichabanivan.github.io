import { profile } from '../../data/cv';
import { Box, Button } from '../../ui';
import { hitArea } from '../../styles/a11y.css';
import { vars } from '../../styles/theme.css';
import { LogoMark } from '../LogoMark';
import * as styles from './Header.css';
import { MenuToggle } from './MenuToggle';
import { NavLink } from './NavLink';
import { NAV_GAP, NAV_LINKS } from './links';

const NAV_ID = 'site-nav';

interface HeaderProps {
  cvHref: string;
}

export function Header({ cvHref }: HeaderProps) {
  return (
    <Box
      as="header"
      className={styles.headerBar}
      data-header
      position="fixed"
      inset="0 0 auto 0"
      zIndex={vars.layer.header}
      height={vars.space.headerH}
      display={{ print: 'none' }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap="6"
        height="100%"
        paddingInline={vars.space.gutter}
      >
        <Box
          as="a"
          group
          href="#top"
          className={hitArea}
          aria-label={`${profile.name}, home`}
          display="inline-flex"
          alignItems="center"
          gap="3"
          fontFamily={vars.font.display}
          fontSize={22}
          letterSpacing="0.08em"
          lineHeight={1}
          color={vars.color.text}
        >
          <LogoMark width={36} height={36} flex="none" />
          <Box as="span" paddingTop="1" display={{ default: 'none', sm: 'inline' }}>
            {profile.name}
          </Box>
        </Box>

        <MenuToggle controls={NAV_ID} />

        <Box
          as="nav"
          id={NAV_ID}
          aria-label="Sections"
          className={styles.navMenu}
          display="flex"
          position={{ default: 'fixed', lg: 'static' }}
          inset={`${vars.space.headerH} 0 0 0`}
          flexDirection={{ default: 'column', lg: 'row' }}
          alignItems={{ default: 'flex-start', lg: 'center' }}
          justifyContent="flex-start"
          gap={{ default: '8', lg: NAV_GAP }}
          padding={{ default: `8 ${vars.space.gutter}`, lg: '0' }}
          background={{ default: vars.color.bg, lg: 'none' }}
        >
          <Box
            as="ul"
            display="flex"
            flexDirection={{ default: 'column', lg: 'row' }}
            gap={{ default: '1', lg: NAV_GAP }}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} label={link.label} />
              </li>
            ))}
          </Box>
          <Button variant="primary" size="small" href={cvHref} download icon="↓">
            Download CV
          </Button>
        </Box>
      </Box>
      <Box
        data-progress
        aria-hidden
        position="absolute"
        inset="auto 0 0 0"
        height={2}
        background={vars.color.accent}
        transform="scaleX(0)"
        transformOrigin="left"
      />
    </Box>
  );
}
