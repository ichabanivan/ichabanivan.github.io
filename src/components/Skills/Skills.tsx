import { skills } from '../../data/cv';
import { Box } from '../../ui';
import { lightTheme, vars } from '../../styles/theme.css';
import { Section } from '../Section';
import { SkillRow } from './SkillRow';
import * as styles from './Skills.css';

export function Skills() {
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
      <div aria-hidden data-light-backdrop className={styles.backdrop} />
      <Box borderBottom={{ default: `1px solid ${vars.color.line}`, print: 0 }}>
        {skills.map((skill) => (
          <SkillRow skill={skill} key={skill.group} />
        ))}
      </Box>
    </Section>
  );
}
