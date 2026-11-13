import { Box, type StyleProps } from './Box';
import { PrintOnly, ScreenOnly } from './PrintOnly';
import { vars } from './theme.css';
import { srOnly } from './effects.css';
import { NEW_TAB_HINT_ID } from './hints';

type VerifyLinkProps = StyleProps & {
  href: string;
  /** Screen-reader context, e.g. the certificate title. */
  label?: string;
};

export function VerifyLink({ href, label, ...style }: VerifyLinkProps) {
  return (
    <Box
      as="a"
      group
      href={href}
      target="_blank"
      rel="noopener"
      aria-describedby={NEW_TAB_HINT_ID}
      display={{ default: 'inline-flex', print: 'inline' }}
      alignItems="center"
      gap="2"
      fontWeight={{ default: 500, print: 400 }}
      color={{ default: vars.color.muted, hover: vars.color.white }}
      transition="color 0.3s"
      {...style}
    >
      <ScreenOnly>
        Verify credential
        {label && <span className={srOnly}>: {label}</span>}
      </ScreenOnly>
      <Box
        as="span"
        aria-hidden
        display={{ print: 'none' }}
        color={vars.color.accentText}
        transform={{ default: 'none', groupHover: 'translate(2px, -2px)' }}
        transition={`transform 0.4s ${vars.ease}`}
      >
        ↗
      </Box>
      <PrintOnly> ({href})</PrintOnly>
    </Box>
  );
}
