import { Box, type BoxProps } from '../Box';
import { PrintOnly } from '../PrintOnly';
import { ScreenOnly } from '../ScreenOnly';
import { vars } from '../../styles/theme.css';
import { srOnly } from '../../styles/a11y.css';
import { NEW_TAB_HINT_ID } from '../../styles/hints';

export type VerifyLinkProps = Omit<BoxProps<'a'>, 'href' | 'children'> & {
  href: string;
  credentialName?: string;
};

export function VerifyLink({ href, credentialName, ...props }: VerifyLinkProps) {
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
      color={{ default: vars.color.muted, hover: vars.color.textStrong }}
      transition={`color ${vars.duration.base} ${vars.ease}`}
      {...props}
    >
      <ScreenOnly>
        Verify credential
        {credentialName != null && (
          <span className={srOnly} data-verify-label>
            : {credentialName}
          </span>
        )}
      </ScreenOnly>
      <Box
        as="span"
        aria-hidden
        display={{ print: 'none' }}
        color={vars.color.accentText}
        transform={{ default: 'none', groupHover: 'translate(2px, -2px)' }}
        transition={`transform ${vars.duration.base} ${vars.ease}`}
      >
        ↗
      </Box>
      <PrintOnly> ({href})</PrintOnly>
    </Box>
  );
}
