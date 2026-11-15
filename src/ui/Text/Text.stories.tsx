import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '../Box';
import { Text } from './Text';

const VARIANTS = ['body', 'display', 'eyebrow', 'lead', 'meta', 'title'] as const;

const meta: Meta = {
  title: 'UI/Text',
  component: Text,
  argTypes: { variant: { control: 'select', options: VARIANTS } },
  args: { variant: 'body', children: 'Senior Software Engineer' },
};

export default meta;
type Story = StoryObj;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <Box display="grid" gap="4">
      {VARIANTS.map((variant) => (
        <Text key={variant} variant={variant}>
          {variant}: building web products since 2016
        </Text>
      ))}
    </Box>
  ),
};

export const AsHeading: Story = {
  args: { as: 'h2', variant: 'display', fontSize: 48, children: 'Section title' },
};
