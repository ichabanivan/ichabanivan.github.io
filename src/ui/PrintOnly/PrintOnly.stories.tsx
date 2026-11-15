import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../Text';
import { PrintOnly } from './PrintOnly';

const meta = {
  title: 'UI/PrintOnly',
  component: PrintOnly,
  parameters: {
    docs: {
      description: {
        component:
          'Renders its children only in print. Open the browser print preview to see the URL after the link text.',
      },
    },
  },
} satisfies Meta<typeof PrintOnly>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: ' (https://github.com/ichabanivan)' },
  render: (args) => (
    <Text>
      GitHub
      <PrintOnly {...args} />
    </Text>
  ),
};
