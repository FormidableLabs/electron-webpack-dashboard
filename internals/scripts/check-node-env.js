// @flow
import chalk from 'chalk';

export default function CheckNodeEnv(expectedEnv: string) {
  if (!expectedEnv) {
    throw new Error('"expectedEnv" not set');
  }

  if (process.env.NODE_ENV !== expectedEnv) {
    console.log(chalk.whiteBright.bgRed.bold( // eslint-disable-line no-console
      `"process.env.NODE_ENV" must be "${expectedEnv}" to use this webpack config`
    ));
    process.exit(2);
  }
}
