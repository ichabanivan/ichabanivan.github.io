import { Box, type BoxProps } from '../Box';
import { vars } from '../../styles/theme.css';
import * as styles from './Button.css';
import { NEW_TAB_HINT_ID } from '../../styles/hints';

export type ButtonProps = BoxProps<'a'> & {
  variant?: 'primary' | 'secondary';
  size?: 'medium' | 'small';
  icon?: '↓' | '↗';
};

export function Button({
  variant = 'secondary',
  size = 'medium',
  icon,
  className,
  children,
  ...props
}: ButtonProps) {
  const primary = variant === 'primary';
  const small = size === 'small';

  const classes = [styles.button, primary && styles.buttonPrimary, className]
    .filter(Boolean)
    .join(' ');

  return (
    <Box
      as="a"
      data-magnetic
      display={{ default: 'inline-flex', print: 'none' }}
      alignItems="center"
      justifyContent="center"
      minHeight={small ? 44 : 48}
      padding={small ? '0 5' : '0 6'}
      border="1px solid"
      borderColor={primary ? vars.color.accent : vars.color.line}
      borderRadius={999}
      background={primary ? vars.color.accent : undefined}
      color={primary ? vars.color.onAccent : undefined}
      fontSize={small ? 14 : 15}
      fontWeight={600}
      letterSpacing="0.01em"
      whiteSpace="nowrap"
      className={classes}
      aria-describedby={props.target === '_blank' ? NEW_TAB_HINT_ID : undefined}
      {...props}
    >
      <span aria-hidden className={styles.buttonDeco} />
      <Box as="span" data-magnetic-label display="inline-flex" alignItems="center" gap="3">
        {children}
        {icon && <span aria-hidden className={styles.buttonIcon} data-text={icon} />}
      </Box>
    </Box>
  );
}
