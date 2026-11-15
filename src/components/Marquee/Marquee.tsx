import { marquee } from '../../data/cv';
import { Box } from '../../ui';
import { MarqueeTrack } from './MarqueeTrack';

const ROW = [...marquee, ...marquee];

export function Marquee() {
  return (
    <Box
      aria-hidden
      data-marquee
      display={{ default: 'grid', print: 'none' }}
      gap="1"
      paddingBlock="clamp(16px, 4vw, 48px)"
      overflow="hidden"
      userSelect="none"
    >
      <MarqueeTrack words={ROW} direction={-1} />
      <MarqueeTrack words={[...ROW].reverse()} direction={1} />
    </Box>
  );
}
