/* eslint no-use-before-define: off */
import chalk from 'chalk';

import formatVersions from '../../../../app/util/format-versions';

describe('formatVersions', () => {
  it('should handle versions being undefined correctly', () => {
    expect(formatVersions(undefined)).toBe('');
  });

  it('should handle versions.version being undefined correctly', () => {
    expect(formatVersions({ versions: undefined })).toBe('');
  });

  it('should handle versions.version being empty array', () => {
    expect(formatVersions({ versions: [] })).toBe('');
  });

  it('should handle versions.version being set with correct values', () => {
    const expected = `${chalk.yellow(chalk.underline('Version skews'))}

webpack:
  a:
      - Abc
`;

    expect(formatVersions(correctVersionsFixture())).toEqual(expected);
  });
});

const Problem = {
  toString() {
    return 'Abc'
  }
}

const correctVersionsFixture = () => ({
  versions: [
    {
      name: 'webpack',
      versions: {
        a: Problem,
      }
    }
  ]
});
