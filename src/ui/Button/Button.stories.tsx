import type { Meta, StoryObj } from '@storybook/react-vite';
import { initMagnetic } from '../../scripts/magnetic';
import { withScript } from '../../stories/withScript';
import { Box } from '../Box';
import { Button } from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  decorators: [withScript(initMagnetic)],
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary'] },
    size: { control: 'inline-radio', options: ['medium', 'small'] },
    icon: { control: 'inline-radio', options: [undefined, '↓', '↗'] },
  },
  args: { href: '#', children: 'Get in touch' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Secondary: Story = {};

export const Primary: Story = { args: { variant: 'primary', children: 'View experience' } };

export const Small: Story = { args: { variant: 'primary', size: 'small' } };

export const WithIcon: Story = {
  args: { variant: 'primary', icon: '↓', children: 'Download CV' },
};

export const ExternalLink: Story = {
  args: { target: '_blank', rel: 'noopener noreferrer', children: 'LinkedIn' },
};

export const Group: Story = {
  render: () => (
    <Box display="flex" flexWrap="wrap" gap="3">
      <Button variant="primary" href="#">
        View experience
      </Button>
      <Button href="#">Get in touch</Button>
      <Button variant="primary" size="small" href="#" icon="↓">
        Download CV
      </Button>
    </Box>
  ),
};
