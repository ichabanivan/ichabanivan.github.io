import type { Meta, StoryObj } from '@storybook/react-vite';
import { documents } from '../../stories/fixtures';
import { DocumentThumb } from './DocumentThumb';

const meta = {
  title: 'Components/DocumentThumb',
  component: DocumentThumb,
  parameters: {
    docs: {
      description: {
        component:
          'Thumbnail link to a document image. On the site a click opens the Lightbox; here it follows the link.',
      },
    },
  },
  args: {
    image: documents.masterComputerScience,
    caption: 'Master’s degree, Computer Sciences',
    maxWidth: 320,
  },
} satisfies Meta<typeof DocumentThumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Diploma: Story = {};

export const Certificate: Story = {
  args: {
    image: documents.efset2026,
    caption: 'EF SET English Certificate. EF SET, 2026',
    verify: 'https://cert.efset.org/cbSU9g',
  },
};
