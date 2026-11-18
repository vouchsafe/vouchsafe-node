# Contributing

Thanks for your interest in contributing to this SDK! This document provides guidelines for contributing to the project.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- pnpm package manager

### Installation

Install the project dependencies:

```bash
pnpm install
```

### Building

Build the project:

```bash
pnpm build
```

### Testing

Type-check the project:

```bash
pnpm test
```

### Linting and Formatting

Check code style:

```bash
pnpm lint
pnpm format:check
```

Fix code style issues:

```bash
pnpm lint:fix
pnpm format
```

Or use the combined check command:

```bash
pnpm check:fix
```

## About Generated Code

**Important**: This SDK is automatically generated from the API definition. Direct modifications to generated files will be overwritten the next time the SDK is regenerated.

While we value open-source contributions to this SDK, this library is generated programmatically.
Additions made directly to this library would have to be moved over to our generation code,
otherwise they would be overwritten upon the next generated release. Feel free to open a PR as
a proof of concept, but know that we will not be able to merge it as-is. We suggest opening
an issue first to discuss with us!

On the other hand, contributions to the README are always very welcome!

## Making Changes

### Workflow

1. Create a new branch for your changes
2. Make your modifications
3. Type-check to ensure nothing breaks: `pnpm test`
4. Run linting and formatting: `pnpm check:fix`
5. Build the project: `pnpm build`
6. Commit your changes with a clear commit message
7. Push your branch and open an issue to discuss before opening a pull request

### Commit Messages

Write clear, descriptive commit messages that explain what changed and why.

### Code Style

This project uses automated code formatting and linting. Run `pnpm check:fix` before committing to ensure your code meets the project's style guidelines.

## Questions or Issues?

If you have questions or run into issues, please open an issue to discuss.
