import { execFileSync } from 'node:child_process';

const CONTENT_PATHS = ['src/data/cv.ts'];

export function contentModifiedDate(): string {
  const committed = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...CONTENT_PATHS], {
    encoding: 'utf8',
  }).trim();
  if (!committed) throw new Error(`No git history found for ${CONTENT_PATHS.join(', ')}`);
  return new Date(committed).toISOString();
}
