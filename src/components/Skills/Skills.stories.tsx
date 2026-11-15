import type { Meta, StoryObj } from '@storybook/react-vite';
import { pageParameters } from '../../stories/parameters';
import { Skills } from './Skills';

const meta = {
  title: 'Components/Skills',
  component: Skills,
  parameters: pageParameters,
} satisfies Meta<typeof Skills>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
