import type { Meta, StoryObj } from '@storybook/react-vite';
import { RoundButton } from './RoundButton';

const meta = {
  title: 'Components/Lightbox/RoundButton',
  component: RoundButton,
  args: { position: 'static', 'aria-label': 'Close', children: '×' },
} satisfies Meta<typeof RoundButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Close: Story = {};

export const Previous: Story = { args: { 'aria-label': 'Previous document', children: '‹' } };

export const Next: Story = { args: { 'aria-label': 'Next document', children: '›' } };
