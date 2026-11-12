import { profile, experience, skills, languages, education, certifications } from '../data/cv';

interface JsonLdInput {
  canonical: string;
  image: string;
  description: string;
  dateModified: string;
}

export function buildJsonLd({ canonical, image, description, dateModified }: JsonLdInput) {
  const websiteId = `${canonical}#website`;
  const personId = `${canonical}#person`;

  const website = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: canonical,
    name: profile.name,
    inLanguage: 'en',
  };

  const page = {
    '@type': 'ProfilePage',
    '@id': canonical,
    url: canonical,
    isPartOf: { '@id': websiteId },
    dateModified,
    mainEntity: { '@id': personId },
  };

  const schools = [...new Set(education.map((e) => e.school))];

  const person = {
    '@type': 'Person',
    '@id': personId,
    name: profile.name,
    givenName: profile.firstName,
    familyName: profile.lastName,
    jobTitle: profile.title,
    description,
    url: canonical,
    image,
    email: profile.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.address.locality,
      addressCountry: profile.address.countryCode,
    },
    worksFor: { '@type': 'Organization', name: experience[0].company },
    hasOccupation: {
      '@type': 'Occupation',
      name: profile.title,
      skills: profile.stack.join(', '),
    },
    sameAs: [profile.linkedin, profile.github, profile.telegram],
    knowsAbout: skills.slice(0, 3).flatMap((s) => s.items),
    knowsLanguage: languages.map((l) => ({ '@type': 'Language', name: l.name })),
    alumniOf: schools.map((name) => ({ '@type': 'CollegeOrUniversity', name })),
    hasCredential: [
      ...education.map((e) => ({
        '@type': 'EducationalOccupationalCredential',
        name: e.degree,
        credentialCategory: 'degree',
        recognizedBy: { '@type': 'CollegeOrUniversity', name: e.school },
      })),
      ...certifications.map((c) => ({
        '@type': 'EducationalOccupationalCredential',
        name: c.title,
        credentialCategory: 'certificate',
        recognizedBy: { '@type': 'Organization', name: c.issuer },
        ...(c.url ? { url: c.url } : {}),
      })),
    ],
  };

  return { '@context': 'https://schema.org', '@graph': [website, page, person] };
}
