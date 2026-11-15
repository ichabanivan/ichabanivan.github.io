import type { Meta, StoryObj } from '@storybook/react-vite';
import { experience } from '../../../data/cv';
import { logos } from '../../../stories/fixtures';
import { EmployerEntry } from './EmployerEntry';

const groupedEmployer =
  experience.find((employer) => employer.positions.length > 1) ?? experience[0];

const meta = {
  title: 'Components/Experience/EmployerEntry',
  component: EmployerEntry,
  args: { employer: experience[0], logos, isLast: true },
} satisfies Meta<typeof EmployerEntry>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SinglePosition: Story = {};

export const SeveralPositions: Story = { args: { employer: groupedEmployer } };
