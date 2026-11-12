import { Box, logoStyles as s, type BoxProps } from '../ui';

const ARC = 'M48 23v-4a8 8 0 0 0-8-8h-4a8 8 0 0 0-8 8v26a8 8 0 0 0 8 8h4a8 8 0 0 0 8-8v-4';

export default function LogoMark(props: BoxProps<'svg'>) {
  return (
    <Box as="svg" viewBox="0 0 64 64" aria-hidden focusable="false" {...props}>
      <rect className={s.tile} x="0.5" y="0.5" width="63" height="63" rx="15.5" />
      <rect className={s.stem} x="12" y="8" width="8" height="48" />
      <path className={s.arc} d={ARC} pathLength={1} />
    </Box>
  );
}
