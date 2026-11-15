import { Box } from '../../ui';
import { vars } from '../../styles/theme.css';
import { marqueeWord } from './Marquee.css';

interface MarqueeTrackProps {
  words: string[];
  direction: 1 | -1;
}

export function MarqueeTrack({ words, direction }: MarqueeTrackProps) {
  return (
    <Box
      data-marquee-track={direction}
      display="flex"
      gap="0.5em"
      width="max-content"
      marginLeft={direction === 1 ? '-40vw' : undefined}
      fontFamily={vars.font.display}
      fontSize="clamp(64px, 12vw, 180px)"
      lineHeight={0.95}
      letterSpacing="0.03em"
      textTransform="uppercase"
      whiteSpace="nowrap"
      color="transparent"
    >
      {words.map((word, i) => (
        <span className={marqueeWord} data-word={word} key={i} />
      ))}
    </Box>
  );
}
