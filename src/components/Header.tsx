import { profile } from '../data/cv';
import { Box, Button, effects, vars } from '../ui';
import LogoMark from './Logo';

const LINKS = [
  { href: '#about', label: 'Summary' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
];

const navGap = 'clamp(16px, 2.4vw, 36px)';

export default function Header({ cvHref }: { cvHref: string }) {
  return (
    <Box
      as="header"
      className={effects.headerBar}
      data-header
      position="fixed"
      inset="0 0 auto 0"
      zIndex={50}
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
          className={effects.hitArea}
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

        <Box
          as="button"
          type="button"
          aria-label="Menu"
          aria-expanded="false"
          aria-controls="site-nav"
          data-nav-toggle
          display={{ default: 'block', lg: 'none' }}
          width={44}
          height={44}
          marginRight="-3"
          padding="0"
          border={0}
          background="none"
          color={vars.color.text}
          cursor="pointer"
        >
          {[0, 1].map((bar) => (
            <Box
              as="span"
              key={bar}
              className={effects.menuBar}
              display="block"
              width={24}
              height={2}
              margin="2 auto"
              background="currentColor"
              transition={`transform 0.35s ${vars.ease}`}
            />
          ))}
        </Box>

        <Box
          as="nav"
          id="site-nav"
          aria-label="Sections"
          className={effects.navMenu}
          display="flex"
          position={{ default: 'fixed', lg: 'static' }}
          inset={`${vars.space.headerH} 0 0 0`}
          flexDirection={{ default: 'column', lg: 'row' }}
          alignItems={{ default: 'flex-start', lg: 'center' }}
          justifyContent="flex-start"
          gap={{ default: '8', lg: navGap }}
          padding={{ default: `8 ${vars.space.gutter}`, lg: '0' }}
          background={{ default: vars.color.bg, lg: 'none' }}
        >
          <Box
            as="ul"
            display="flex"
            flexDirection={{ default: 'column', lg: 'row' }}
            gap={{ default: '1', lg: navGap }}
          >
            {LINKS.map((link) => (
              <li key={link.href}>
                <Box
                  as="a"
                  href={link.href}
                  data-nav-link
                  className={`${effects.navLink} ${effects.hitArea}`}
                  position="relative"
                  padding="2 0"
                  fontSize={{ default: 44, lg: 14 }}
                  fontWeight={500}
                  color={{
                    default: vars.color.text,
                    lg: vars.color.muted,
                    hover: vars.color.white,
                  }}
                  transition="color 0.3s"
                  fontFamily={{ default: vars.font.display, lg: vars.font.body }}
                  lineHeight={{ default: 1.15, lg: 'inherit' }}
                  letterSpacing={{ default: '0.03em', lg: 'normal' }}
                  textTransform={{ default: 'uppercase', lg: 'none' }}
                >
                  {link.label}
                </Box>
              </li>
            ))}
          </Box>
          <Button
            variant="primary"
            size="small"
            href={cvHref}
            download
            icon="↓"
          >
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
