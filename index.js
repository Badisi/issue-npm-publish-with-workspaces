const { exec } = require('node:child_process');

const cmd = exec(
    `npm publish ${process.cwd()}/dist/a --dry-run`,
    { cwd: `${process.cwd()}/projects/a` }
);
cmd.stdout.pipe(process.stdout, { end: false });
cmd.stderr.pipe(process.stderr, { end: false });
