import type { Meta, StoryObj } from '@storybook/react-vite';
import { experience } from '../../../data/cv';
import { logos } from '../../../stories/fixtures';
import { PositionBlock } from './PositionBlock';

const groupedEmployer =
  experience.find((employer) => employer.positions.length > 1) ?? experience[0];
const positionWithProjects =
  experience.flatMap((employer) => employer.positions).find((position) => position.projects) ??
  experience[0].positions[0];

const meta = {
  title: 'Components/Experience/PositionBlock',
  component: PositionBlock,
  args: { position: experience[0].positions[0], logos, isGrouped: false, isFirst: true },
} satisfies Meta<typeof PositionBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {};

export const Grouped: Story = {
  args: { position: groupedEmployer.positions[0], isGrouped: true },
};

export const FollowingPosition: Story = {
  args: { position: groupedEmployer.positions.at(-1), isGrouped: true, isFirst: false },
};

export const WithProjects: Story = { args: { position: positionWithProjects } };
