# issue-npm-publish-with-workspaces

This repository illustrate an issue that can be faced with `npm` when trying to publish a package within a workspace.

*Original issue: https://github.com/npm/cli/issues/5745*  
*Related issues: https://github.com/dhoulb/multi-semantic-release/issues/127 and https://github.com/semantic-release/npm/issues/504*

### Info

- **platform**: macOS Monterey 12.5.1 (21G83)
- **node**: v16.14.2
- **npm**: 8.19.2 (EDIT: still exists in 10.2.0, Node 18 & 20)

### Issue

Considering the following project structure and code:

```sh
my-project
├── dist
│   └── a
│       └── package.json # { "name: "a", "version": "1.0.0" }
├── projects
│   └── a
│       └── package.json # { "name: "a", "version": "0.0.0-semantically-released" }
├── package.json # { "name: "my-project", "workspaces": [ "projects/a" ] }
└── index.js
```

```js
// index.js
const { exec } = require('node:child_process');
const cmd = exec(
    `npm publish ${process.cwd()}/dist/a --dry-run`,
    { cwd: `${process.cwd()}/projects/a` }
);
cmd.stdout.pipe(process.stdout, { end: false });
cmd.stderr.pipe(process.stderr, { end: false });
```

Running `node index.js` from `./my-project` will result in:
> npm notice filename: a-0.0.0-semantically-released.tgz

instead of
> npm notice filename: a-1.0.0.tgz

The issue seems to be related to the `workspaces` attribute from the root `package.json`.

Because removing this attribute will produce the proper result.

### How to reproduce

1. `git clone https://github.com/Badisi/issue-npm-publish-with-workspaces`
2. `npm install`
3. `npm run start`
