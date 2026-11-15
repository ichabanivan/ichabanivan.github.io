import type { Meta, StoryObj } from '@storybook/react-vite';
import { pageParameters } from '../../stories/parameters';
import { logos } from '../../stories/fixtures';
import { Experience } from './Experience';

const meta = {
  title: 'Components/Experience',
  component: Experience,
  parameters: pageParameters,
  args: { logos },
} satisfies Meta<typeof Experience>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
