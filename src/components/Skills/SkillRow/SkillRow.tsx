import { Fragment } from 'react';
import type { SkillGroup } from '../../../data/cv';
import { Box, PrintOnly, Text } from '../../../ui';
import { COLUMN_GAP, PERIOD_WIDTH } from '../../../styles/layout';
import { vars } from '../../../styles/theme.css';
import * as styles from '../Skills.css';

const COLUMNS = {
  default: 'minmax(0, 1fr)',
  md: '200px minmax(0, 1fr)',
  lg: `${PERIOD_WIDTH} minmax(0, 1fr)`,
};

export interface SkillRowProps {
  skill: SkillGroup;
}

export function SkillRow({ skill }: SkillRowProps) {
  const lastIndex = skill.items.length - 1;
  return (
    <Box
      data-skill-row
      display={{ default: 'grid', print: skill.printHidden ? 'none' : 'block' }}
      gridTemplateColumns={COLUMNS}
      alignItems="baseline"
      gap={{ default: '2', md: COLUMN_GAP }}
      padding={{ default: 'clamp(16px, 2vw, 24px) 0', print: '0' }}
      borderTop={{ default: `1px solid ${vars.color.line}`, print: 0 }}
      breakInside={{ print: 'avoid' }}
    >
      <Text as="h3" variant="eyebrow" display={{ print: 'inline' }} color={vars.color.muted}>
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
            <li className={styles.item}>
              <span className={styles.label}>{item}</span>
              {i < lastIndex && <span className={styles.comma}>,</span>}
            </li>
          </Fragment>
        ))}
      </Box>
    </Box>
  );
}
