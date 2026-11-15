import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars } from '../../styles/theme.css';
import { pageParameters } from '../../stories/parameters';
import { Box } from '../Box';
import { Container } from './Container';

const meta: Meta = {
  title: 'UI/Container',
  component: Container,
  parameters: {
    ...pageParameters,
    docs: {
      ...pageParameters.docs,
      description: { component: 'Centres content at the page width and applies the side gutter.' },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Container>
      <Box padding="6" background={vars.color.surface} borderRadius={8}>
        Content is limited to the page width.
      </Box>
    </Container>
  ),
};
