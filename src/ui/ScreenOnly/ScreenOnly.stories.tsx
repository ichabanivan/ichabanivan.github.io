import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../Text';
import { ScreenOnly } from './ScreenOnly';

const meta = {
  title: 'UI/ScreenOnly',
  component: ScreenOnly,
  parameters: {
    docs: {
      description: {
        component: 'Renders its children on screen and hides them in print.',
      },
    },
  },
} satisfies Meta<typeof ScreenOnly>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Verify credential' },
  render: (args) => (
    <Text>
      <ScreenOnly {...args} />
    </Text>
  ),
};
