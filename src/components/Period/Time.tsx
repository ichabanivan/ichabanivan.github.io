import type { DateLabel } from '../../data/cv';

interface TimeProps {
  date: DateLabel;
}

export function Time({ date }: TimeProps) {
  return date.iso ? <time dateTime={date.iso}>{date.label}</time> : <>{date.label}</>;
}
