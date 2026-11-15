import { Box, type BoxProps } from '../../ui';
import * as styles from './Hero.css';

type StripProps = BoxProps<'div'> & {
  index: number;
};

export function Strip({ index, className, ...props }: StripProps) {
  return (
    <Box
      data-strip
      position="absolute"
      inset={0}
      overflow="hidden"
      className={[styles.strip, index % 2 ? styles.stripDown : styles.stripUp, className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
}
