import type { Meta, StoryObj } from '@storybook/react-vite';
import { pageParameters } from '../../stories/parameters';
import { NotFound } from './NotFound';

const meta = {
  title: 'Components/NotFound',
  component: NotFound,
  parameters: pageParameters,
  args: { homeHref: '/' },
} satisfies Meta<typeof NotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
