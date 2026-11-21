import {
  certifications,
  currentEmployer,
  education,
  experience,
  languages,
  profile,
  skills,
} from '../data/cv';

const bullet = (text: string) => `- ${text}`;
const link = (label: string, url: string, note?: string) =>
  bullet(`[${label}](${url})${note ? `: ${note}` : ''}`);
const block = (title: string, lines: string[]) => [`**${title}**`, '', ...lines].join('\n');

export function buildLlmsText(siteUrl: string): string {
  const headline = `${profile.title} at ${currentEmployer.company} based in ${profile.location}. Works with ${profile.stack.join(', ')}.`;

  const positions = experience.flatMap((employer) =>
    employer.positions.map((position) =>
      bullet(
        `${position.title}, ${employer.company} (${position.start.label} to ${position.end.label}, ${employer.location}): ${position.summary}`,
      ),
    ),
  );

  const credentials = certifications.flatMap((certification) =>
    certification.url
      ? [
          link(
            certification.title,
            certification.url,
            [certification.issuer, certification.year].filter(Boolean).join(', '),
          ),
        ]
      : [],
  );

  const sections = [
    `# ${profile.name}`,
    `> ${headline}`,
    ...profile.summary,
    block('Experience', positions),
    block(
      'Skills',
      skills.map(({ group, items }) => bullet(`${group}: ${items.join(', ')}`)),
    ),
    block(
      'Education',
      education.map(({ degree, school, start, end }) =>
        bullet(`${degree}, ${school} (${start.label} to ${end.label})`),
      ),
    ),
    block(
      'Languages',
      languages.map(({ name, level }) => bullet(`${name}: ${level}`)),
    ),
    [
      '## Pages',
      '',
      link('CV site', siteUrl, 'experience, skills, education, certificates and contact details'),
      link('CV as PDF', profile.cvPdf),
    ].join('\n'),
    [
      '## Contact',
      '',
      link('Email', `mailto:${profile.email}`),
      link('LinkedIn', profile.linkedin),
      link('GitHub', profile.github),
      link('Telegram', profile.telegram),
    ].join('\n'),
    ['## Optional', '', ...credentials].join('\n'),
  ];

  return `${sections.join('\n\n')}\n`;
}
