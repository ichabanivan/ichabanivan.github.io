import type { Meta, StoryObj } from '@storybook/react-vite';
import { pageParameters } from '../../stories/parameters';
import { Marquee } from './Marquee';

const meta = {
  title: 'Components/Marquee',
  component: Marquee,
  parameters: pageParameters,
} satisfies Meta<typeof Marquee>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
