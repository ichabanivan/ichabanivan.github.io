import { Box, type BoxProps } from '../../ui';
import * as styles from './Hero.css';

type NameLineProps = BoxProps<'span'> & {
  line: 0 | 1;
};

export function NameLine({ line, children, ...props }: NameLineProps) {
  return (
    <Box
      as="span"
      display={{ default: 'block', print: 'inline' }}
      paddingTop={{ default: '0.06em', print: '0' }}
      overflow="hidden"
      {...props}
    >
      <Box
        as="span"
        className={styles.nameInner[line]}
        display={{ default: 'block', print: 'inline' }}
      >
        {children}
      </Box>
    </Box>
  );
}
