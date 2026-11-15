import { COLUMN_GAP, PERIOD_WIDTH } from '../../styles/layout';

export const LINE_LEFT = `calc(${PERIOD_WIDTH} + ${COLUMN_GAP} / 2)`;
export const PRINT_FULL_ROW = { print: '1 / -1' } as const;
