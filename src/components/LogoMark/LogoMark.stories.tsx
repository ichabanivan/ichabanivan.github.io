import type { Meta, StoryObj } from '@storybook/react-vite';
import { LogoMark } from './LogoMark';

const meta = {
  title: 'Components/LogoMark',
  component: LogoMark,
  args: { width: 36, height: 36 },
} satisfies Meta<typeof LogoMark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Large: Story = { args: { width: 128, height: 128 } };
