import type { Education } from '../../data/cv';
import type { DocumentImage } from '../../lib/documents';
import { Box, PrintOnly, Text } from '../../ui';
import { COLUMN_GAP, PERIOD_WIDTH } from '../../styles/layout';
import { vars } from '../../styles/theme.css';
import { DocumentThumb } from '../DocumentThumb';
import { Period } from '../Period';

interface SchoolEntryProps {
  school: Education;
  diploma: DocumentImage;
  isLast: boolean;
}

export function SchoolEntry({ school, diploma, isLast }: SchoolEntryProps) {
  return (
    <Box
      as="article"
      data-reveal
      display={{ default: 'grid', print: 'block' }}
      gridTemplateColumns={{
        default: 'minmax(0, 1fr)',
        lg: `${PERIOD_WIDTH} minmax(0, 1fr) minmax(0, 220px)`,
      }}
      alignItems="start"
      gap={{ default: '3', lg: COLUMN_GAP }}
      padding={{ default: 'clamp(20px, 3vw, 36px) 0', print: '0 0 2' }}
      borderTop={{ default: `1px solid ${vars.color.line}`, print: 0 }}
      borderBottom={isLast ? { default: `1px solid ${vars.color.line}`, print: 0 } : undefined}
      breakInside={{ print: 'avoid-page' }}
    >
      <Period start={school.start} end={school.end} location={school.location} />
      <div>
        <Text
          as="h3"
          display={{ print: 'inline' }}
          fontSize={{ default: 'clamp(19px, 2vw, 24px)', print: '10.5pt' }}
          fontWeight={600}
          lineHeight={1.3}
          color={vars.color.textStrong}
        >
          {school.school}
        </Text>
        <Text
          display={{ print: 'inline' }}
          marginTop={{ default: '2', print: '0' }}
          color={vars.color.text}
        >
          <PrintOnly> — </PrintOnly>
          {school.degree}
        </Text>
        <Box
          as="ul"
          display={{ default: 'grid', print: 'none' }}
          gap="1"
          marginTop="3"
          fontSize={{ default: 15, print: 'inherit' }}
          color={vars.color.muted}
        >
          {school.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </Box>
      </div>
      <DocumentThumb
        image={diploma}
        caption={`${school.degree}. ${school.school}`}
        maxWidth={{ default: 320, lg: 'none' }}
      />
    </Box>
  );
}
