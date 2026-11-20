import type { DateLabel } from '../../data/cv';
import { Time } from './Time';

interface DateRangeProps {
  start: DateLabel;
  end: DateLabel;
}

export function DateRange({ start, end }: DateRangeProps) {
  return (
    <>
      <Time date={start} /> – <Time date={end} />
    </>
  );
}
