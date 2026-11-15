import { employerPeriod, type Employer } from '../../../data/cv';
import type { Logos } from '../../../lib/documents';
import { Box } from '../../../ui';
import { COLUMN_GAP, PERIOD_WIDTH } from '../../../styles/layout';
import { vars } from '../../../styles/theme.css';
import { Period } from '../../Period';
import { EmployerHeader } from '../EmployerHeader';
import { PositionBlock } from '../PositionBlock';
import { LINE_LEFT } from '../layout';

export interface EmployerEntryProps {
  employer: Employer;
  logos: Logos;
  isLast: boolean;
}

export function EmployerEntry({ employer, logos, isLast }: EmployerEntryProps) {
  const { start, end } = employerPeriod(employer);
  const isGrouped = employer.positions.length > 1;
  return (
    <Box
      as="article"
      data-reveal
      group
      position="relative"
      display="grid"
      gridTemplateColumns={{
        default: 'minmax(0, 1fr)',
        lg: `${PERIOD_WIDTH} minmax(0, 1fr)`,
        print: 'minmax(0, 1fr) auto',
      }}
      alignItems={{ print: 'baseline' }}
      gap={{ default: '4', lg: COLUMN_GAP, print: '0 4' }}
      paddingLeft={{ default: '8', lg: '0', print: '0' }}
      paddingBottom={{ default: isLast ? '0' : 'clamp(48px, 7vw, 96px)', print: '3' }}
    >
      <Box
        aria-hidden
        position="absolute"
        top={8}
        left={{ default: 0, lg: `calc(${LINE_LEFT} - 5px)` }}
        width={11}
        height={11}
        borderRadius="50%"
        background={vars.color.bg}
        border={`2px solid ${vars.color.accent}`}
        display={{ print: 'none' }}
      />
      <Period
        start={start}
        end={end}
        location={employer.location}
        showDuration
        gridColumn={{ print: '2' }}
        gridRow={{ print: '1' }}
        flexWrap={{ print: 'wrap' }}
        justifyContent={{ print: 'flex-end' }}
      />
      <Box display={{ print: 'contents' }}>
        <EmployerHeader employer={employer} logos={logos} />
        {employer.positions.map((position, i) => (
          <PositionBlock
            key={position.start.iso}
            position={position}
            logos={logos}
            isGrouped={isGrouped}
            isFirst={i === 0}
          />
        ))}
      </Box>
    </Box>
  );
}
