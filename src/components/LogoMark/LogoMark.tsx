import { Box, type BoxProps } from '../../ui';
import * as styles from './LogoMark.css';

const ARC_PATH = 'M48 23v-4a8 8 0 0 0-8-8h-4a8 8 0 0 0-8 8v26a8 8 0 0 0 8 8h4a8 8 0 0 0 8-8v-4';

export type LogoMarkProps = BoxProps<'svg'>;

export function LogoMark(props: LogoMarkProps) {
  return (
    <Box as="svg" viewBox="0 0 64 64" aria-hidden focusable="false" {...props}>
      <rect className={styles.tile} x="0.5" y="0.5" width="63" height="63" rx="15.5" />
      <rect className={styles.stem} x="12" y="8" width="8" height="48" />
      <path className={styles.arc} d={ARC_PATH} pathLength={1} />
    </Box>
  );
}
