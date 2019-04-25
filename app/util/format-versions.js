const chalk = require('chalk');
const Handlebars = require('handlebars');

const template = Handlebars.compile(
  `${chalk.yellow(chalk.underline('Version skews'))}

{{#each versions}}
{{name}}:
  {{#each versions}}
  {{@key}}:
    {{#each this}}
      - {{{this}}}
    {{/each}}
  {{/each}}
{{/each}}
`
);

const formatVersions = function (versions) {
  if (!versions || !versions.versions || !versions.versions.length) return ''

  return template({
    versions: versions.versions
  });
};

module.exports = formatVersions;
