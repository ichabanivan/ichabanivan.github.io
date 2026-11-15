import type { Employer } from '../../data/cv';
import type { Logos } from '../../lib/documents';
import { Box, Text } from '../../ui';
import { LogoImage } from './LogoImage';

interface EmployerHeaderProps {
  employer: Employer;
  logos: Logos;
}

export function EmployerHeader({ employer, logos }: EmployerHeaderProps) {
  const logo = employer.logo ? logos[employer.logo] : null;
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="space-between"
      gap="3 6"
      gridColumn={{ print: '1' }}
      gridRow={{ print: '1' }}
    >
      <Text
        as="h3"
        variant="display"
        fontSize={{ default: 'clamp(34px, 4vw, 52px)', print: '12pt' }}
      >
        {employer.company}
      </Text>
      {logo && <LogoImage logo={logo} />}
    </Box>
  );
}
