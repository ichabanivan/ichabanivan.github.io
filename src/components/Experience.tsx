import type { ReactNode } from 'react';
import Section from './Section';
import Period, { PERIOD_WIDTH } from './Period';
import { experience, type Role } from '../data/cv';
import type { Logos } from '../lib/documents';
import { Box, Card, PrintOnly, Text, vars } from '../ui';

const COLUMN_GAP = 'clamp(24px, 4vw, 56px)';
const LINE_LEFT = `calc(${PERIOD_WIDTH} + ${COLUMN_GAP} / 2)`;

const Strong = ({ children }: { children: ReactNode }) => (
  <Box as="strong" color={vars.color.text} fontWeight={600}>
    {children}
  </Box>
);

function RoleCard({ role, logos, last }: { role: Role; logos: Logos; last: boolean }) {
  const logo = role.logo ? logos[role.logo] : null;
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
        print: 'auto auto minmax(0, 1fr)',
      }}
      alignItems={{ print: 'baseline' }}
      gap={{ default: '4', lg: COLUMN_GAP, print: '0 1' }}
      paddingLeft={{ default: '8', lg: '0', print: '0' }}
      paddingBottom={{ default: last ? '0' : 'clamp(48px, 7vw, 96px)', print: '2' }}
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
        start={role.start}
        end={role.end}
        location={role.location}
        showDuration
        gridColumn={{ print: '3' }}
        gridRow={{ print: '1' }}
        flexWrap={{ print: 'wrap' }}
        justifyContent={{ print: 'flex-end' }}
      />
      <Box display={{ print: 'contents' }}>
        <Box
          display={{ default: 'flex', print: 'inline' }}
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
          gap="3 6"
        >
          <Text
            as="h3"
            variant="display"
            display={{ print: 'inline' }}
            fontSize={{ default: 'clamp(34px, 4vw, 52px)', print: '12pt' }}
          >
            {role.company}
          </Text>
          {logo && (
            <Box
              as="img"
              src={logo.src}
              htmlWidth={logo.width}
              htmlHeight={logo.height}
              alt=""
              loading="lazy"
              flex="none"
              width="auto"
              height={logo.displayHeight ?? 22}
              maxWidth={150}
              objectFit="contain"
              opacity={{ default: 0.75, groupHover: 1 }}
              transition="opacity 0.4s"
              display={{ print: 'none' }}
            />
          )}
        </Box>
        <Text
          display={{ print: 'inline' }}
          marginTop={{ default: '2', print: '0' }}
          fontSize={{ default: 18, print: '10pt' }}
          fontWeight={600}
          color={vars.color.text}
        >
          <PrintOnly> — </PrintOnly>
          {role.title}
        </Text>
        {role.summary && (
          <Text
            display={{ print: 'none' }}
            marginTop={{ default: '5', print: '1' }}
            color={vars.color.muted}
          >
            {role.summary}
          </Text>
        )}
        {role.tech && (
          <Text
            gridColumn={{ print: '1 / -1' }}
            marginTop={{ default: '4', print: '1' }}
            padding={{ default: '4', print: '0' }}
            borderLeft={{ default: `2px solid ${vars.color.accent}`, print: 0 }}
            borderRadius="0 10px 10px 0"
            background={{ default: vars.color.surface, print: 'none' }}
            fontSize={{ default: 14, print: 'inherit' }}
            color={vars.color.muted}
          >
            <Strong>Technologies:</Strong> {role.tech}
          </Text>
        )}
        {role.bullets && (
          <>
            <Text
              as="h4"
              variant="eyebrow"
              gridColumn={{ print: '1 / -1' }}
              marginTop={{ default: '6', print: '1' }}
              color={vars.color.muted}
            >
              Responsibilities
            </Text>
            <BulletList items={role.bullets} />
          </>
        )}
        {role.projects && (
          <Box
            display="grid"
            gridColumn={{ print: '1 / -1' }}
            gap={{ default: '4', print: '1' }}
            marginTop={{ default: '5', print: '1' }}
          >
            {role.projects.map((project) => (
              <Card
                key={project.name}
                padding={{ default: '5', print: '0' }}
                breakInside={{ print: 'avoid-page' }}
              >
                <Text
                  as="h4"
                  display={{ print: 'inline' }}
                  fontSize={{ default: 17, print: 'inherit' }}
                  fontWeight={600}
                  color={vars.color.white}
                >
                  {project.name}
                </Text>
                <Text marginTop="2" display={{ print: 'none' }} color={vars.color.muted}>
                  {project.description}
                </Text>
                {project.tech && (
                  <Text
                    display={{ print: 'inline' }}
                    marginTop={{ default: '2', print: '0' }}
                    fontSize={{ default: 14, print: 'inherit' }}
                    color={vars.color.muted}
                  >
                    <PrintOnly> — </PrintOnly>
                    <Strong>Technologies:</Strong> {project.tech}
                  </Text>
                )}
                {project.responsibilities && (
                  <Text
                    marginTop={{ default: '2', print: '0' }}
                    fontSize={{ default: 14, print: 'inherit' }}
                    color={vars.color.muted}
                  >
                    <Strong>Responsibilities:</Strong> {project.responsibilities}
                  </Text>
                )}
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <Box
      as="ul"
      display="grid"
      gridColumn={{ print: '1 / -1' }}
      gap={{ default: '3', print: '0' }}
      marginTop={{ default: '3', print: '1' }}
    >
      {items.map((item) => (
        <Box
          as="li"
          key={item}
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
          {item}
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
        {experience.map((role, i) => (
          <RoleCard
            role={role}
            logos={logos}
            last={i === experience.length - 1}
            key={`${role.company}-${role.start.iso}`}
          />
        ))}
      </Box>
    </Section>
  );
}
