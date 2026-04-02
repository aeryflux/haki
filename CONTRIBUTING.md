# Contributing to Haki

Thanks for your interest in contributing!

## Getting Started

1. Fork the repository
2. Clone: `git clone https://github.com/<you>/haki.git`
3. Install: `npm install`
4. Dev server: `npm run dev` (port 3004)

## Development

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm test          # Run tests (vitest)
npm run lint      # ESLint
```

## Adding a Learning Path

Paths are defined in `src/data/paths/`. Each path file exports a `Path` object with:

- `id`: Unique identifier (e.g. `'cli'`, `'git'`)
- `title`: Localized title (fr/en)
- `lessons`: Array of lessons, each with questions
- `requiredPaths`: Optional array of path IDs that must be completed first

See `src/data/paths/cli.ts` for a complete example.

## Pull Requests

- One feature per PR
- Include tests for new functionality
- Make sure CI is green
- Use clear commit messages: `feat:`, `fix:`, `docs:`, `test:`, `chore:`

## Reporting Bugs

Open an issue with:
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS
