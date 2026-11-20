import { Box, Text } from '../../ui';
import { vars } from '../../styles/theme.css';
import './ConsentBanner.css';
import { ConsentButton } from './ConsentButton';

export function ConsentBanner() {
  return (
    <Box
      as="section"
      aria-label="Cookie consent"
      data-consent-banner
      hidden
      position="fixed"
      inset={`auto ${vars.space.gutter} 16px auto`}
      zIndex={vars.layer.banner}
      display={{ print: 'none' }}
      width={`min(400px, calc(100% - 2 * ${vars.space.gutter}))`}
      padding="4"
      border={`1px solid ${vars.color.line}`}
      borderRadius={vars.radius}
      background={vars.color.surface}
    >
      <Text fontSize={14} color={vars.color.muted}>
        This site uses Google Analytics to count visits. Cookies are set only if you accept.
      </Text>
      <Box display="grid" gridTemplateColumns="repeat(2, minmax(0, 1fr))" gap="2" marginTop="3">
        <ConsentButton data-consent-accept>Accept</ConsentButton>
        <ConsentButton data-consent-decline>Decline</ConsentButton>
      </Box>
    </Box>
  );
}
