import { Fragment } from 'react';
import Section from './Section';
import { PERIOD_WIDTH } from './Period';
import { skills, type SkillGroup } from '../data/cv';
import { Box, PrintOnly, Text, lightTheme, skillStyles as s, vars } from '../ui';

const COLUMNS = {
  default: 'minmax(0, 1fr)',
  md: '200px minmax(0, 1fr)',
  lg: `${PERIOD_WIDTH} minmax(0, 1fr)`,
};

function SkillRow({ skill }: { skill: SkillGroup }) {
  const last = skill.items.length - 1;
  return (
    <Box
      data-skill-row
      display={{ default: 'grid', print: skill.printHidden ? 'none' : 'block' }}
      gridTemplateColumns={COLUMNS}
      alignItems="baseline"
      gap={{ default: '2', md: 'clamp(24px, 4vw, 56px)' }}
      padding={{ default: 'clamp(16px, 2vw, 24px) 0', print: '0' }}
      borderTop={{ default: `1px solid ${vars.color.line}`, print: 0 }}
      breakInside={{ print: 'avoid' }}
    >
      <Text
        as="h3"
        variant="eyebrow"
        display={{ print: 'inline' }}
        color={vars.color.muted}
      >
        {skill.group}
        <PrintOnly>: </PrintOnly>
      </Text>
      <Box
        as="ul"
        display={{ print: 'inline' }}
        fontSize={{ default: 17, print: 'inherit' }}
        lineHeight={{ default: 1.8, print: 'inherit' }}
        color={vars.color.text}
      >
        {skill.items.map((item, i) => (
          <Fragment key={item}>
            {i > 0 && ' '}
            <li className={s.item}>
              <span className={s.label}>{item}</span>
              {i < last && <span className={s.comma}>,</span>}
            </li>
          </Fragment>
        ))}
      </Box>
    </Box>
  );
}

export default function Skills() {
  return (
    <Section
      id="skills"
      index="03"
      title="Technical Skills"
      className={lightTheme}
      data-light
      position="relative"
      zIndex={0}
      color={vars.color.text}
    >
      <div aria-hidden data-light-backdrop className={s.backdrop} />
      <Box borderBottom={{ default: `1px solid ${vars.color.line}`, print: 0 }}>
        {skills.map((skill) => (
          <SkillRow skill={skill} key={skill.group} />
        ))}
      </Box>
    </Section>
  );
}
