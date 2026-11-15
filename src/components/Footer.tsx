import { profile } from '../data/cv';
import { Box, vars } from '../ui';

export default function Footer({ year }: { year: number }) {
  return (
    <Box
      as="footer"
      display={{ default: 'flex', print: 'none' }}
      flexWrap="wrap"
      justifyContent="space-between"
      gap="2 6"
      padding={`7 ${vars.space.gutter}`}
      borderTop={`1px solid ${vars.color.line}`}
      fontSize={14}
      color={vars.color.muted}
    >
      <p>
        © {year} {profile.name}
      </p>
      <p>{profile.location}</p>
    </Box>
  );
}
