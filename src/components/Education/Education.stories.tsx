import type { Meta, StoryObj } from '@storybook/react-vite';
import { pageParameters } from '../../stories/parameters';
import { documents } from '../../stories/fixtures';
import { Education } from './Education';

const meta = {
  title: 'Components/Education',
  component: Education,
  parameters: pageParameters,
  args: { documents },
} satisfies Meta<typeof Education>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
