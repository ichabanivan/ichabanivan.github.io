import { Box } from '../../ui';
import { hitArea } from '../../styles/a11y.css';
import { vars } from '../../styles/theme.css';
import * as styles from './Header.css';

interface NavLinkProps {
  href: string;
  label: string;
}

export function NavLink({ href, label }: NavLinkProps) {
  return (
    <Box
      as="a"
      href={href}
      data-nav-link
      data-track="nav_click"
      data-track-target={href.slice(href.indexOf('#') + 1)}
      className={`${styles.navLink} ${hitArea}`}
      position="relative"
      padding="2 0"
      fontSize={{ default: 44, lg: 14 }}
      fontWeight={500}
      color={{
        default: vars.color.text,
        lg: vars.color.muted,
        hover: vars.color.textStrong,
      }}
      transition={`color ${vars.duration.base} ${vars.ease}`}
      fontFamily={{ default: vars.font.display, lg: vars.font.body }}
      lineHeight={{ default: 1.15, lg: 'inherit' }}
      letterSpacing={{ default: '0.03em', lg: 'normal' }}
      textTransform={{ default: 'uppercase', lg: 'none' }}
    >
      {label}
    </Box>
  );
}
