import type { ReactNode } from 'react';
import Section from './Section';
import Period, { DateRange, PERIOD_WIDTH } from './Period';
import { employerPeriod, experience, type Employer, type Position } from '../data/cv';
import type { Logo, Logos } from '../lib/documents';
import { tenure } from '../lib/tenure';
import { Box, Text, vars } from '../ui';

const COLUMN_GAP = 'clamp(24px, 4vw, 56px)';
const LINE_LEFT = `calc(${PERIOD_WIDTH} + ${COLUMN_GAP} / 2)`;
const PRINT_FULL_ROW = { print: '1 / -1' } as const;

const Strong = ({ children }: { children: ReactNode }) => (
  <Box as="strong" color={vars.color.text} fontWeight={600}>
    {children}
  </Box>
);

function EmployerEntry({ employer, logos, last }: { employer: Employer; logos: Logos; last: boolean }) {
  const { start, end } = employerPeriod(employer);
  const grouped = employer.positions.length > 1;
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
      paddingBottom={{ default: last ? '0' : 'clamp(48px, 7vw, 96px)', print: '3' }}
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
            grouped={grouped}
            first={i === 0}
          />
        ))}
      </Box>
    </Box>
  );
}

function EmployerHeader({ employer, logos }: { employer: Employer; logos: Logos }) {
  const logo = employer.logo ? logos[employer.logo] : null;
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="space-between"
      gap="3 6"
      gridColumn={{ print: '1' }}
      gridRow={{ print: '1' }}
    >
      <Text as="h3" variant="display" fontSize={{ default: 'clamp(34px, 4vw, 52px)', print: '12pt' }}>
        {employer.company}
      </Text>
      {logo && <LogoImage logo={logo} />}
    </Box>
  );
}

function LogoImage({ logo, height = 22 }: { logo: Logo; height?: number }) {
  return (
    <Box
      as="img"
      src={logo.src}
      htmlWidth={logo.width}
      htmlHeight={logo.height}
      alt=""
      loading="lazy"
      flex="none"
      width="auto"
      height={logo.displayHeight ?? height}
      maxWidth={150}
      objectFit="contain"
      opacity={{ default: 0.75, groupHover: 1 }}
      transition="opacity 0.4s"
      display={{ print: 'none' }}
    />
  );
}

function PositionBlock({
  position,
  logos,
  grouped,
  first,
}: {
  position: Position;
  logos: Logos;
  grouped: boolean;
  first: boolean;
}) {
  const clientLogo = position.client?.logo ? logos[position.client.logo] : null;
  return (
    <Box
      gridColumn={PRINT_FULL_ROW}
      marginTop={{ default: first ? '2' : '8', print: first ? '0' : '2' }}
      paddingTop={{ default: first ? '0' : '8', print: '0' }}
      borderTop={{ default: first ? 0 : `1px solid ${vars.color.line}`, print: 0 }}
      breakInside={{ print: 'avoid-page' }}
    >
      <Box display="flex" flexWrap="wrap" alignItems="center" justifyContent="space-between" gap="2 6">
        <Text
          as="h4"
          fontSize={{ default: 18, print: '10pt' }}
          fontWeight={600}
          color={vars.color.text}
        >
          {position.title}
        </Text>
        {clientLogo && <LogoImage logo={clientLogo} height={18} />}
      </Box>
      {grouped && (
        <Text variant="meta" marginTop={{ default: '1', print: '0' }}>
          {position.client && (
            <>
              Client: <Strong>{position.client.name}</Strong>
              {' · '}
            </>
          )}
          <DateRange start={position.start} end={position.end} />
          {' · '}
          <span data-tenure-start={position.start.iso} data-tenure-end={position.end.iso}>
            {tenure(position.start.iso, position.end.iso)}
          </span>
        </Text>
      )}
      <Text display={{ print: 'none' }} marginTop="4" color={vars.color.muted}>
        {position.summary}
      </Text>
      <ListHeading>Highlights</ListHeading>
      <BulletList items={position.highlights.map((text) => ({ key: text, content: text }))} />
      {position.projects && (
        <>
          <ListHeading>Projects</ListHeading>
          <BulletList
            items={position.projects.map((project) => ({
              key: project.name,
              content: (
                <>
                  <Strong>{project.name}</Strong>: {project.description}
                </>
              ),
            }))}
          />
        </>
      )}
      <Text
        marginTop={{ default: '5', print: '1' }}
        padding={{ default: '4', print: '0' }}
        borderLeft={{ default: `2px solid ${vars.color.accent}`, print: 0 }}
        borderRadius="0 10px 10px 0"
        background={{ default: vars.color.surface, print: 'none' }}
        fontSize={{ default: 14, print: 'inherit' }}
        color={vars.color.muted}
      >
        <Strong>Technologies:</Strong> {position.tech.join(', ')}
      </Text>
    </Box>
  );
}

const ListHeading = ({ children }: { children: ReactNode }) => (
  <Text
    as="h5"
    variant="eyebrow"
    marginTop={{ default: '5', print: '1' }}
    color={vars.color.muted}
  >
    {children}
  </Text>
);

function BulletList({ items }: { items: { key: string; content: ReactNode }[] }) {
  return (
    <Box
      as="ul"
      display="grid"
      gap={{ default: '3', print: '0' }}
      marginTop={{ default: '3', print: '1' }}
    >
      {items.map((item) => (
        <Box
          as="li"
          key={item.key}
          position="relative"
          paddingLeft={{ default: '6', print: '4' }}
          breakInside={{ print: 'avoid-page' }}
        >
          <Box
            as="span"
            aria-hidden
            position="absolute"
            top="0.7em"
            left={0}
            width={{ default: 10, print: '4pt' }}
            height={{ default: 2, print: 1 }}
            background={vars.color.accent}
          />
          {item.content}
        </Box>
      ))}
    </Box>
  );
}

export default function Experience({ logos }: { logos: Logos }) {
  return (
    <Section id="experience" index="02" title="Professional Experience">
      <Box data-timeline position="relative">
        <Box
          data-timeline-line
          aria-hidden
          position="absolute"
          top={8}
          bottom={0}
          left={{ default: 5, lg: LINE_LEFT }}
          width={1}
          background={`linear-gradient(to bottom, ${vars.color.accent}, ${vars.color.accentFaint})`}
          transformOrigin="top"
          display={{ print: 'none' }}
        />
        {experience.map((employer, i) => (
          <EmployerEntry
            employer={employer}
            logos={logos}
            last={i === experience.length - 1}
            key={employer.company}
          />
        ))}
      </Box>
    </Section>
  );
}
