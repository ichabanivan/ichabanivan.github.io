import { Box } from '../../ui';
import { vars } from '../../styles/theme.css';
import * as styles from './Header.css';

const BARS = [0, 1];

interface MenuToggleProps {
  controls: string;
}

export function MenuToggle({ controls }: MenuToggleProps) {
  return (
    <Box
      as="button"
      type="button"
      aria-label="Menu"
      aria-expanded="false"
      aria-controls={controls}
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
      {BARS.map((bar) => (
        <Box
          as="span"
          key={bar}
          className={styles.menuBar}
          display="block"
          width={24}
          height={2}
          margin="2 auto"
          background="currentColor"
          transition={`transform 0.35s ${vars.ease}`}
        />
      ))}
    </Box>
  );
}
