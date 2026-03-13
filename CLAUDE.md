# Haki

Learn to code platform with visual step-by-step compilation.

## Quick Start

```bash
npm install        # Install deps
npm run dev        # Dev server (port 3004)
npm run build      # Production build
npm test           # Run Vitest tests
```

## Port

**3004** (configured in vite.config.ts)

## Structure

```
haki/
├── src/
│   ├── components/
│   │   ├── Editor/        # Monaco code editor
│   │   ├── Visualizer/    # AST, memory views
│   │   └── Debugger/      # Step-through debugger
│   ├── compiler/          # WASM compilation engine
│   ├── lessons/           # Progressive curriculum
│   └── App.tsx
└── vite.config.ts
```

## Tech Stack

- React 19 + Vite 5
- D3.js (visualizations)
- Three.js (3D memory view)
- Monaco Editor
- Tailwind CSS

## Concept

Visual compilation teaching:
1. Tokenization (lexer)
2. AST generation (parser)
3. Semantic analysis
4. Code generation
5. Execution with memory visualization

## Features

- Step-through compilation
- Memory visualizer (stack, heap, pointers)
- Interactive debugger
- Progressive lessons

## Status

MVP in development (Q2 2026)

## Related

- Uses: `@aeryflux/globe`
- Docs: `~/aery-doc/aeryflux/haki.md`
