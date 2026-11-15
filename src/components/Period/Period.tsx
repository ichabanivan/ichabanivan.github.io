import { tenure } from '../../lib/tenure';
import type { DateLabel } from '../../data/cv';
import { Box, Text, type StyleProps } from '../../ui';
import { vars } from '../../styles/theme.css';
import { DateRange } from './DateRange';

export type PeriodProps = StyleProps & {
  start: Required<DateLabel>;
  end: DateLabel;
  location: string;
  showDuration?: boolean;
};

export function Period({ start, end, location, showDuration, ...style }: PeriodProps) {
  return (
    <Box
      position={{ default: 'static', lg: 'sticky', print: 'static' }}
      top={`calc(${vars.space.headerH} + 24px)`}
      alignSelf="start"
      display={{ default: 'grid', print: 'flex' }}
      gap={{ default: '2', print: '0 2' }}
      {...style}
    >
      <Text
        fontSize={{ default: 14, print: 'inherit' }}
        fontWeight={600}
        letterSpacing={{ default: '0.06em', print: 0 }}
        textTransform={{ default: 'uppercase', print: 'none' }}
        color={vars.color.accentText}
      >
        <DateRange start={start} end={end} />
      </Text>
      {showDuration && (
        <Text
          fontSize={{ default: 14, print: 'inherit' }}
          fontWeight={{ default: 600, print: 400 }}
          color={vars.color.text}
          data-tenure-start={start.iso}
          data-tenure-end={end.iso}
        >
          {tenure(start.iso, end.iso)}
        </Text>
      )}
      <Text variant="meta">{location}</Text>
    </Box>
  );
}
