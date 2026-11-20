import { profile } from '../../data/cv';
import { Box } from '../../ui';
import { hitArea, underlined } from '../../styles/a11y.css';
import { vars } from '../../styles/theme.css';

interface FooterProps {
  year: number;
}

export function Footer({ year }: FooterProps) {
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
      <Box
        as="button"
        type="button"
        data-consent-open
        hidden
        className={`${hitArea} ${underlined}`}
        padding="0"
        border={0}
        background="none"
        color={{ default: 'inherit', hover: vars.color.textStrong }}
        fontSize="inherit"
        cursor="pointer"
      >
        Cookie settings
      </Box>
    </Box>
  );
}
