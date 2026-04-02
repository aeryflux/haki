# Haki

![Tests](https://github.com/aeryflux/haki/actions/workflows/tests.yml/badge.svg)
![Deploy](https://github.com/aeryflux/haki/actions/workflows/deploy.yml/badge.svg)
![License](https://img.shields.io/github/license/aeryflux/haki)

> Learn to code with interactive lessons and a built-in CLI simulator.

**[haki.aeryflux.com](https://haki.aeryflux.com)**

## What is Haki?

Haki is a free, interactive learning platform where you practice CLI commands, Git workflows, and programming fundamentals directly in the browser. No setup required.

### Current paths

| Path | Topics | Status |
|------|--------|--------|
| **CLI / Bash** | Navigation, files, permissions, pipes | Available |
| **Git** | Init, commit, push, branches, merge | Available (unlocks after CLI) |

### Features

- Interactive Q/A lessons with hints
- Built-in terminal simulator with real filesystem
- Practical exercises (TP) with task validation
- Progress tracking (localStorage)
- Bilingual: French & English
- Monaco code editor for C visualization (compiler MVP)

## Quick Start

```bash
git clone https://github.com/aeryflux/haki.git
cd haki
npm install
npm run dev
```

Open [localhost:3004](http://localhost:3004).

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Vite + React + TypeScript |
| Editor | Monaco Editor |
| Visualization | D3.js |
| State | Zustand |
| Design | @aeryflux/design tokens |
| Deploy | GitHub Pages |

## Project Structure

```
haki/
├── src/
│   ├── components/
│   │   ├── Editor/          # Monaco code editor
│   │   ├── Visualizer/      # Compilation phase viewer
│   │   ├── Terminal.tsx      # CLI simulator (11 commands)
│   │   └── TPView.tsx       # Practical exercise view
│   ├── data/paths/
│   │   ├── cli.ts           # CLI/Bash learning path
│   │   └── git.ts           # Git learning path
│   ├── stores/
│   │   └── compiler.ts      # Zustand store
│   ├── types/               # TypeScript definitions
│   ├── i18n.tsx             # Internationalization
│   └── App.tsx              # Main app
├── .github/workflows/
│   ├── deploy.yml           # GitHub Pages deploy
│   └── tests.yml            # CI tests + lint
└── public/
```

## Testing

```bash
npm test              # Run vitest
npm run lint          # ESLint
```

## Roadmap

The free courses (CLI, Git) will continue to evolve. Future paths may include:

- C/C++ compilation visualization (compiler MVP already in codebase)
- Docker basics
- SQL fundamentals

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup.

See [CHANGELOG.md](CHANGELOG.md) for version history.

## Related

- [godbolt.org](https://godbolt.org) - Compiler Explorer
- [pythontutor.com](https://pythontutor.com) - Visual debugger

## License

[MIT](LICENSE)
