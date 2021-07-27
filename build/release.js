const shell = require('shelljs')
const { version } = require('../package.json')

shell.exec(`git checkout main`)
shell.exec(`yarn build`)
shell.exec(`yarn build:cjs`)
shell.exec(`git add -A`)
shell.exec(`standard-version --commit-all --release-as ${version}`)
shell.exec(`git push --tags origin main`)

shell.exec(`npm publish --registry=https://registry.npmjs.org`)
