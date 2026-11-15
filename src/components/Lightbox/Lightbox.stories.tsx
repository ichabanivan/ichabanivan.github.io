import type { Meta, StoryObj } from '@storybook/react-vite';
import { initLightbox } from '../../scripts/lightbox';
import { documents } from '../../stories/fixtures';
import { pageParameters } from '../../stories/parameters';
import { withScript } from '../../stories/withScript';
import { Box } from '../../ui';
import { DocumentThumb } from '../DocumentThumb';
import { Lightbox } from './Lightbox';

const GALLERY = [
  { image: documents.masterComputerScience, caption: 'Master’s degree, Computer Sciences' },
  {
    image: documents.efset2026,
    caption: 'EF SET English Certificate. EF SET, 2026',
    verify: 'https://cert.efset.org/cbSU9g',
  },
  { image: documents.htmlCss, caption: 'HTML, CSS. Test Provider, 2017' },
];

const meta = {
  title: 'Components/Lightbox',
  component: Lightbox,
  decorators: [withScript(initLightbox)],
  parameters: {
    ...pageParameters,
    docs: {
      ...pageParameters.docs,
      description: {
        component:
          'Click a thumbnail to open the dialog. Arrow keys and the side buttons step through the documents; Escape, the backdrop and the close button close it.',
      },
    },
  },
} satisfies Meta<typeof Lightbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {
  render: () => (
    <Box padding="6">
      <Box display="grid" gridTemplateColumns="repeat(3, minmax(0, 220px))" gap="4">
        {GALLERY.map((item) => (
          <DocumentThumb key={item.caption} {...item} />
        ))}
      </Box>
      <Lightbox />
    </Box>
  ),
};

export const SingleDocument: Story = {
  render: () => (
    <Box padding="6">
      <DocumentThumb {...GALLERY[0]} maxWidth={220} />
      <Lightbox />
    </Box>
  ),
};
