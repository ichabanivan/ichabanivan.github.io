import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars } from '../../styles/theme.css';
import { Box } from './Box';

const meta: Meta = {
  title: 'UI/Box',
  component: Box,
  parameters: {
    docs: {
      description: {
        component:
          'Layout primitive. Style props accept a single value or an object keyed by condition (default, sm, md, lg, print, hover, groupHover). Spacing props take tokens from the 4px scale.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Spacing: Story = {
  render: () => (
    <Box display="grid" gap="4">
      {(['2', '4', '8'] as const).map((token) => (
        <Box key={token} padding={token} border={`1px solid ${vars.color.line}`} borderRadius={8}>
          padding="{token}"
        </Box>
      ))}
    </Box>
  ),
};

export const Responsive: Story = {
  render: () => (
    <Box
      display="grid"
      gridTemplateColumns={{ default: 'minmax(0, 1fr)', md: 'repeat(3, minmax(0, 1fr))' }}
      gap="4"
    >
      {['One', 'Two', 'Three'].map((label) => (
        <Box key={label} padding="6" background={vars.color.surface} borderRadius={8}>
          {label}
        </Box>
      ))}
    </Box>
  ),
};

export const HoverState: Story = {
  render: () => (
    <Box
      as="a"
      href="#"
      display="inline-block"
      padding="4"
      border="1px solid"
      borderColor={{ default: vars.color.line, hover: vars.color.accent }}
      borderRadius={8}
      color={{ default: vars.color.text, hover: vars.color.white }}
      transition="border-color 0.3s, color 0.3s"
    >
      Hover or focus me
    </Box>
  ),
};
