import type { Meta, StoryObj } from '@storybook/react-vite';
import { pageParameters } from '../../stories/parameters';
import { Footer } from './Footer';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: pageParameters,
  args: { year: 2026 },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
