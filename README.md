# Hello World CI/CD Demo

A simple TypeScript "Hello World" application demonstrating a complete CI/CD pipeline with Jest testing, ESLint, and GitHub Actions.

## Features

- TypeScript for type safety
- Jest for testing with 80%+ coverage requirement
- ESLint for code quality
- GitHub Actions CI/CD pipeline
- Automated testing on push/PR

## Quick Start

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm test:watch

# Build
npm run build

# Run the app
npm start
# or with a name:
npm start Alice
```

## CI/CD Pipeline

The GitHub Actions workflow includes:

1. **Test Job**: Runs all tests with coverage
2. **Lint Job**: Checks code quality with ESLint
3. **Build Job**: Compiles TypeScript and tests artifacts

All jobs run on every push to main/master and on pull requests.

## Test Coverage

Current test suite includes:
- 20+ unit tests
- 100% code coverage
- Coverage threshold: 80% for branches, functions, lines, and statements

## Structure

```
hello-world-ci/
├── src/
│   ├── greeter.ts          # Main greeter functionality
│   ├── index.ts            # CLI entry point
│   └── __tests__/
│       └── greeter.test.ts # Test suite
├── .github/workflows/
│   └── ci.yml             # GitHub Actions configuration
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## Built By

RefactorTeam - Demonstrating execution culture with working code, not just planning documents.
