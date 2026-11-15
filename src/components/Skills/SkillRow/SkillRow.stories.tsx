import type { Meta, StoryObj } from '@storybook/react-vite';
import { skills } from '../../../data/cv';
import { SkillRow } from './SkillRow';

const meta = {
  title: 'Components/Skills/SkillRow',
  component: SkillRow,
  args: { skill: skills[0] },
} satisfies Meta<typeof SkillRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Short: Story = {};

export const Long: Story = { args: { skill: skills[2] } };
