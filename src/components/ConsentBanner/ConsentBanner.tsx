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
      inset={{
        default: `auto ${vars.space.gutter} 16px ${vars.space.gutter}`,
        md: `auto ${vars.space.gutter} 16px auto`,
      }}
      zIndex={vars.layer.banner}
      display={{ print: 'none' }}
      width={{ md: 420 }}
      padding="5"
      border={`1px solid ${vars.color.line}`}
      borderRadius={vars.radius}
      background={vars.color.surface}
    >
      <Text fontSize={14} color={vars.color.muted}>
        This site uses Google Analytics to count visits. Cookies are set only if you accept.
      </Text>
      <Box display="flex" gap="3" marginTop="4">
        <ConsentButton data-consent-accept>Accept cookies</ConsentButton>
        <ConsentButton data-consent-decline>Decline</ConsentButton>
      </Box>
    </Box>
  );
}
