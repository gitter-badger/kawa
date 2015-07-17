# [Kawa](repo-url)

> Minimal front-end framework/boilerplate and build process to quickly get projects going.

[Demo][home-url]

## Requirements

- [node.js][nodejs-url] and [npm][npm-url]
- [editorconfig][editorconfig-url]

## Installation

```sh
# Install npm packages required globally
npm install -g gulp bower

# Get the repository using Git
git clone https://bymathias@github.com/bymathias/kawa.git project
cd project

# Install local dependencies
npm install
bower install
```

## Usage

```sh
# See available gulp tasks
gulp help
```

## Test

```sh
# Lint config and Mocha tests
npm test
```

## Favicon

```sh
# Create a `logo-square.svg` file inside the `design` directory and run
./design/favicon.sh

# then copy the favicons you need to `src/files`
```

## Release

```sh
# Bump version, update changelog
npm run release

# Deployment
npm run deploy
```

## License

- Third-party libraries, licensed under their respective licenses.
- Custom bits, licensed under the [MIT License][license-url].


<!-- Link labels -->

[home-url]:    https://bymathias.github.io/kawa
[repo-url]:    https://github.com/bymathias/kawa
[license-url]: https://raw.githubusercontent.com/bymathias/kawa/master/LICENSE

[nodejs-url]:       https://nodejs.org
[npm-url]:          https://www.npmjs.com
[editorconfig-url]: http://editorconfig.org "Help make the world a better place"
