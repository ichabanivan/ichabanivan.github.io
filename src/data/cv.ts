export type LogoKey = 'fiverr' | 'auto1' | 'intelliceed' | 'brightgrove' | 'alevel';

export type DocumentKey =
  | 'efset'
  | 'htmlCss'
  | 'javascript'
  | 'php'
  | 'masterComputerScience'
  | 'masterOilGas'
  | 'bachelorMining';

export interface DateLabel {
  label: string;
  iso?: string;
}

export interface Project {
  name: string;
  description: string;
}

export interface Position {
  title: string;
  client?: { name: string; logo?: LogoKey };
  start: Required<DateLabel>;
  end: DateLabel;
  summary: string;
  highlights: string[];
  projects?: Project[];
  tech: string[];
}

export interface Employer {
  company: string;
  logo?: LogoKey;
  location: string;
  positions: [Position, ...Position[]];
}

export const profile = {
  name: 'Ivan Chaban',
  firstName: 'Ivan',
  lastName: 'Chaban',
  title: 'Senior Software Engineer',
  location: 'Poznań, Poland',
  email: 'ichabanivan@gmail.com',
  phone: null as string | null,
  linkedin: 'https://www.linkedin.com/in/ivanchaban/',
  github: 'https://github.com/ichabanivan',
  cvPdf:
    'https://docs.google.com/document/d/1MK_L2FU4hosFpplFxnm-wJyn8X-SpZWBd6DNlu_4K70/export?format=pdf',
  telegram: 'https://t.me/ichabanivan',
  stack: ['React', 'TypeScript', 'Node.js', 'NestJS', 'Next.js'],
  address: { locality: 'Poznań', countryCode: 'PL' },
  contactNote: 'The fastest way to reach me is email.',
  summary: [
    'Senior Software Engineer building web products since 2016, currently at Fiverr. I work across the stack with React, TypeScript, Node.js, NestJS and Next.js, with a focus on scalable front-end architecture, design systems and measurable product impact.',
    'I have led front-end teams, run interviews and code reviews, mentored engineers, and shipped everything from micro-frontends and SSR applications to React Native and Flutter apps.',
  ],
};

export const marquee = [
  'React',
  'TypeScript',
  'Node.js',
  'NestJS',
  'Next.js',
  'React Native',
  'GraphQL',
  'Micro-Frontends',
  'GSAP',
];

export interface SkillGroup {
  group: string;
  items: string[];
  printHidden?: true;
}

export const skills: SkillGroup[] = [
  { group: 'Programming Languages', items: ['JavaScript', 'TypeScript', 'Dart'] },
  {
    group: 'Frameworks & Runtimes',
    items: [
      'ReactJS',
      'NextJS (SSR/CSR)',
      'React Native',
      'NodeJS',
      'NestJS',
      'Angular 2+',
      'Astro',
      'Flutter',
      'Prisma.io',
    ],
  },
  {
    group: 'React & JavaScript Libraries',
    items: [
      'React Apollo',
      'React Query',
      'Redux',
      'Redux Toolkit',
      'Redux Saga',
      'React DnD',
      'Reactstrap',
      'Antd',
      'MUI',
      'Apollo',
      'Formik',
      'React Hook Form',
      'Redux Form',
      'jQuery',
      'Lodash',
      'Moment',
      'Axios',
      'GSAP',
      'Survey JS',
      'Form.io',
      'Zod',
      'Yup',
    ],
  },
  {
    group: 'Frontend Development & CSS Methodologies',
    items: [
      'CSS',
      'PostCSS',
      'SCSS',
      'Styled Components',
      'Tailwind CSS',
      'BEM',
      'OOCSS',
      'Mobile/Desktop-first markup',
      'HTML',
      'Handlebars',
      'Jade (Pug)',
    ],
  },
  {
    group: 'AI-Assisted Development',
    items: [
      'Claude Code',
      'Claude',
      'Cursor',
      'MCP (Model Context Protocol)',
      'Figma MCP',
      'AI agents & subagents',
    ],
  },
  { group: 'Databases & Data Tools', items: ['MongoDB', 'PostgreSQL', 'Athena (AWS)', 'BigQuery'] },
  {
    group: 'Testing & Build Tools',
    items: ['Jest', 'Playwright', 'Docker', 'Gulp', 'Webpack', 'Vite', 'Rollup', 'CircleCI', 'Jenkins'],
  },
  {
    group: 'Monitoring, Logging & Analytics',
    items: ['Grafana', 'Coralogix', 'Groundcover', 'Rollout', 'A/B Testing', 'VictorOps'],
  },
  {
    group: 'Design & UI Tools',
    items: ['Figma', 'Zeplin', 'Avocode', 'Adobe Photoshop', 'InDesign'],
  },
  {
    group: 'Version Control & Collaboration Tools',
    items: ['Git (GitHub, GitLab, BitBucket)', 'Jira', 'Asana', 'Monday'],
    printHidden: true,
  },
  {
    group: 'Linters & Code Quality Tools',
    items: ['ESLint', 'Stylelint', 'Prettier'],
    printHidden: true,
  },
  {
    group: 'IDEs & Development Environments',
    items: ['IntelliJ IDEA', 'WebStorm', 'VS Code'],
    printHidden: true,
  },
  { group: 'Other DevOps & Infrastructure Tools', items: ['Consul'], printHidden: true },
  { group: 'Operating Systems', items: ['Mac OS', 'Windows', 'Linux'], printHidden: true },
];

export const experience: Employer[] = [
  {
    company: 'Fiverr',
    logo: 'fiverr',
    location: 'Israel, Remote',
    positions: [
      {
        title: 'Senior Software Engineer',
        start: { label: 'July 2023', iso: '2023-07' },
        end: { label: 'Present' },
        summary:
          'Global marketplace for freelance services, handling millions of transactions. Focus on scalable web applications and internal tools across the platform.',
        highlights: [
          'Designed and implemented the authentication flow (signup, social login, account activation, user questionnaire) with GDPR compliance, raising sign-in success by 15%, registrations by 18%, average selling price by 22% and sales per buyer by 10%.',
          'Built a reusable code-activation package with a centralized update mechanism and a trigger API, adopted by hundreds of consumers across projects.',
          'Lead front-end development of the Microsoft subscriptions sales project end to end.',
          'Developed Buyer Profile as a standalone React application with server- and client-side rendering and a Backend-for-Frontend (BFF) API.',
          'Migrated the main React monorepo to pnpm, cutting build time by up to 20%.',
          'Run rollout releases and A/B tests, and provide 24/7 on-call support with Grafana and Mixpanel dashboards.',
        ],
        tech: [
          'TypeScript',
          'React',
          'Next.js',
          'Node.js',
          'NestJS',
          'React Hook Form',
          'Zod',
          'pnpm',
          'Docker',
          'Kubernetes',
          'Okteto',
          'CircleCI',
          'Grafana',
          'Mixpanel',
          'Coralogix',
          'Athena',
          'Figma',
          'Cursor',
        ],
      },
    ],
  },
  {
    company: 'Auto1 Group',
    logo: 'auto1',
    location: 'Berlin, Germany, Remote',
    positions: [
      {
        title: 'Senior Software Engineer',
        start: { label: 'December 2021', iso: '2021-12' },
        end: { label: 'July 2023', iso: '2023-07' },
        summary:
          'Europe’s leading digital automotive platform, connecting car buyers and sellers across multiple markets. Focus on micro-frontends, internal tools and back-office applications.',
        highlights: [
          'Replaced legacy systems with micro-frontend applications, improving maintainability, modularity and performance.',
          'Planned and executed the migration of all front-end applications to the latest version of Ant Design, unifying the UI and speeding up feature delivery.',
          'Delivered a back-office application that streamlined administrative workflows and reduced manual effort.',
          'Built and optimized Jenkins CI/CD pipelines for MFE applications, improving deployment reliability and shortening release times.',
          'Upgraded multiple applications to the latest Node.js version, improving security compliance and performance.',
        ],
        tech: [
          'TypeScript',
          'React',
          'Micro-Frontends',
          'Ant Design',
          'Node.js',
          'GraphQL',
          'REST APIs',
          'Jenkins',
          'Docker',
        ],
      },
    ],
  },
  {
    company: 'Intelliceed Inc.',
    logo: 'intelliceed',
    location: 'Kharkiv, Ukraine, On-site',
    positions: [
      {
        title: 'Team Lead',
        start: { label: 'May 2020', iso: '2020-05' },
        end: { label: 'December 2021', iso: '2021-12' },
        summary:
          'Front-end team leadership across multiple client projects, covering hiring, code quality and mentoring.',
        highlights: [
          'Led the front-end team, overseeing delivery across multiple projects and designing the architecture of new ones.',
          'Interviewed candidates for Junior through Lead roles and mentored junior developers.',
          'Reviewed code for in-house and cross-company teams and audited codebases for performance and reliability issues.',
        ],
        tech: ['React', 'React Native', 'Flutter', 'Dart', 'GraphQL', 'Apollo'],
      },
      {
        title: 'Senior Software Engineer',
        client: { name: 'Brightgrove', logo: 'brightgrove' },
        start: { label: 'November 2020', iso: '2020-11' },
        end: { label: 'November 2021', iso: '2021-11' },
        summary:
          'Event-management and CRM platform for sales, customer communication, production workflows and public events with digital ticketing.',
        highlights: [
          'Built a React CRM with admin areas for sales, communication tracking, feedback and production management.',
          'Delivered a ticketing module, a public events web app and a React Native app for real-time ticket validation and attendee check-in.',
          'Shipped producer and sponsor tools for product sales and order management, plus a survey app with an admin dashboard.',
          'Integrated Apollo and GraphQL to handle data between client and server.',
        ],
        tech: [
          'React',
          'React Native',
          'GraphQL',
          'Apollo',
          'Formik',
          'Yup',
          'i18n',
          'Jest',
          'Bootstrap (Reactstrap)',
        ],
      },
      {
        title: 'Senior Software Engineer',
        start: { label: 'January 2020', iso: '2020-01' },
        end: { label: 'April 2021', iso: '2021-04' },
        summary: 'Cross-platform mobile applications for client projects, built with Flutter and React Native.',
        highlights: ['Developed two cross-platform mobile applications with Flutter and React Native.'],
        projects: [
          {
            name: 'Motorsport management software',
            description: 'Timing and flagging app for circuit racing, marathon and biking events.',
          },
          {
            name: 'Healthcare Platform',
            description: 'Patient treatment app that generates individual weekly diet plans.',
          },
        ],
        tech: [
          'Flutter',
          'Dart',
          'React Native',
          'JavaScript',
          'Redux',
          'Redux-Saga',
          'Provider',
          'SQLite (sqflite)',
          'Geolocator',
        ],
      },
      {
        title: 'Middle Software Engineer',
        start: { label: 'April 2018', iso: '2018-04' },
        end: { label: 'December 2019', iso: '2019-12' },
        summary:
          'Multilingual media products for TV channels, with advertising and social media integrations.',
        highlights: [
          'Implemented new features and improvements and fixed bugs across three multilingual media products.',
          'Integrated the YouTube API and social media platforms, and supported English and Arabic content.',
        ],
        projects: [
          { name: 'News Extra', description: 'News content for a TV channel.' },
          {
            name: 'TV Drama',
            description: 'Entertainment content for an English- and Arabic-speaking audience.',
          },
          { name: 'Sofra', description: 'Culinary content for a TV channel’s audience.' },
        ],
        tech: [
          'React',
          'React Native',
          'JavaScript',
          'Redux',
          'Redux-Saga',
          'Redux-Thunk',
          'jQuery',
          'YouTube API',
        ],
      },
    ],
  },
  {
    company: 'A-level Ukraine',
    logo: 'alevel',
    location: 'Kharkiv, Ukraine, On-site',
    positions: [
      {
        title: 'Junior Software Engineer',
        start: { label: 'September 2016', iso: '2016-09' },
        end: { label: 'February 2018', iso: '2018-02' },
        summary: 'Page markup and front-end features for different services.',
        highlights: ['Implemented features and improvements and fixed bugs in front-end code.'],
        tech: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Redux', 'Redux-Saga', 'Redux-Thunk'],
      },
    ],
  },
];

export const currentPosition = experience[0].positions[0];
export const careerStart = experience.at(-1)!.positions.at(-1)!.start;

export function employerPeriod({ positions }: Employer) {
  const start = positions.reduce((a, p) => (p.start.iso < a.iso ? p.start : a), positions[0].start);
  const end = positions.reduce<DateLabel>(
    (a, p) => (!a.iso ? a : !p.end.iso || p.end.iso > a.iso ? p.end : a),
    positions[0].end,
  );
  return { start, end };
}

export const education = [
  {
    school: 'National Technical University “Kharkiv Polytechnic Institute”',
    location: 'Kharkiv, Ukraine',
    degree: 'Master’s degree, Computer Sciences',
    diploma: 'masterComputerScience' as DocumentKey,
    start: { label: 'September 2020', iso: '2020-09' },
    end: { label: 'December 2021', iso: '2021-12' },
    details: [
      'Program Subject Area: Computer Sciences.',
      'Educational Program: Computer Science. Modeling, Designing and Computer Graphics.',
      'Main fields of study: ISCE-061 Information and Communication Technologies, ISCE-0611 Computer use, ISCE-0613 Software and applications development and analysis.',
    ],
  },
  {
    school: 'National University “Yuri Kondratyuk Poltava Polytechnic”',
    location: 'Poltava, Ukraine',
    degree: 'Master’s degree, Oil and Gas Engineering',
    diploma: 'masterOilGas' as DocumentKey,
    start: { label: 'September 2019', iso: '2019-09' },
    end: { label: 'December 2020', iso: '2020-12' },
    details: [
      'Program Subject Area: Oil and Gas Engineering and Technology.',
      'Educational Program: Oil and Gas Engineering and Technology.',
    ],
  },
  {
    school: 'National University “Yuri Kondratyuk Poltava Polytechnic”',
    location: 'Poltava, Ukraine',
    degree: 'Bachelor’s degree, Mining. Drilling Wells',
    diploma: 'bachelorMining' as DocumentKey,
    start: { label: 'September 2016', iso: '2016-09' },
    end: { label: 'June 2019', iso: '2019-06' },
    details: ['Program Subject Area: Mining.', 'Educational Program: Drilling wells.'],
  },
];

export interface Certification {
  title: string;
  issuer: string;
  year?: number;
  url?: string;
  image?: DocumentKey;
}

export const certifications: Certification[] = [
  {
    title: 'EF SET English Certificate 57/100 (B2 Upper Intermediate)',
    issuer: 'EF SET',
    year: 2024,
    url: 'https://cert.efset.org/cbSU9g',
    image: 'efset',
  },
  {
    title: 'HTML, CSS',
    issuer: 'Test Provider',
    year: 2017,
    url: 'https://testprovider.com/ru/Certificate/Search/TP50742782',
    image: 'htmlCss',
  },
  {
    title: 'JavaScript',
    issuer: 'Test Provider',
    year: 2017,
    url: 'https://testprovider.com/ru/Certificate/Search/TP87878809',
    image: 'javascript',
  },
  {
    title: 'PHP',
    issuer: 'Test Provider',
    url: 'https://testprovider.com/ru/Certificate/Search/TP29131587',
    image: 'php',
  },
  { title: 'Front-End', issuer: 'A-level Ukraine', year: 2016 },
  { title: 'Development Basics', issuer: 'A-level Ukraine', year: 2016 },
];

export interface Volunteering {
  organization: string;
  role: string;
  start: { label: string; iso: string };
  end: { label: string; iso: string };
  note: string;
}

export const volunteering: Volunteering[] = [
  {
    organization: 'A-Level Ukraine',
    role: 'Mentoring “Programming for Children”',
    start: { label: 'June 2017', iso: '2017-06' },
    end: { label: 'September 2017', iso: '2017-09' },
    note: 'Project from the City Administration: #Itforyou.',
  },
];

export const languages = [
  { name: 'English', level: 'B2, Upper Intermediate' },
  { name: 'Polish', level: 'B2, Upper Intermediate' },
  { name: 'Ukrainian', level: 'Native' },
  { name: 'Russian', level: 'C2, Fluent' },
];
