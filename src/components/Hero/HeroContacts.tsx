import { profile } from '../../data/cv';
import { Box, PrintOnly } from '../../ui';
import { vars } from '../../styles/theme.css';
import { ContactLink } from './ContactLink';
import * as styles from './Hero.css';

export function HeroContacts() {
  return (
    <Box
      as="address"
      className={styles.item[1]}
      display="flex"
      flexWrap="wrap"
      gap={{ default: '5', print: '0 3' }}
      marginTop={{ default: '4', print: '1' }}
      fontSize={{ default: 15, print: 'inherit' }}
      color={vars.color.muted}
    >
      <span>{profile.location}</span>{' '}
      <ContactLink
        href={`mailto:${profile.email}`}
        data-track="contact_click"
        data-track-method="email"
      >
        {profile.email}
      </ContactLink>{' '}
      {profile.phone && (
        <>
          <ContactLink
            href={`tel:${profile.phone.replace(/\s/g, '')}`}
            data-track="contact_click"
            data-track-method="phone"
          >
            {profile.phone}
          </ContactLink>{' '}
        </>
      )}
      <ContactLink
        href={profile.linkedin}
        target="_blank"
        rel="me noopener noreferrer"
        data-track="social_click"
        data-track-network="linkedin"
      >
        LinkedIn
        <PrintOnly> ({profile.linkedin})</PrintOnly>
      </ContactLink>{' '}
      <ContactLink
        href={profile.telegram}
        target="_blank"
        rel="me noopener noreferrer"
        data-track="social_click"
        data-track-network="telegram"
      >
        Telegram
        <PrintOnly> ({profile.telegram})</PrintOnly>
      </ContactLink>{' '}
      <Box as="span" display={{ default: 'none', print: 'inline' }}>
        GitHub ({profile.github})
      </Box>
    </Box>
  );
}
