# Haki

> Learn to code with visual step-by-step compilation

## Overview

Haki is an interactive learn-to-code application that visualizes the compilation process of C/C++ programs. Students can see exactly how their code transforms from source to executable, making memory management and low-level concepts intuitive.

## Features

### MVP (v0.1)

- [ ] **Visual Compiler**: Step-through compilation phases
  - Preprocessing
  - Lexical analysis (tokenization)
  - Syntax analysis (AST)
  - Code generation (assembly preview)
- [ ] **Memory Visualizer**: Real-time memory layout
  - Stack visualization
  - Heap visualization
  - Pointer relationships
- [ ] **Interactive Debugger**: Variable inspection with visual cues
- [ ] **Progressive Lessons**: Curated learning path

### Future (v0.2+)

- [ ] Challenge mode with gamification
- [ ] Multi-language support (Rust, Go)
- [ ] Collaborative coding
- [ ] Mobile companion app

## Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | Vite + React + TypeScript |
| Visualization | D3.js / React Flow |
| Compiler Backend | WebAssembly (LLVM/Clang) |
| Code Editor | Monaco Editor |
| Styling | Tailwind CSS |

## Architecture

```
haki/
├── src/
│   ├── components/
│   │   ├── Editor/           # Monaco-based code editor
│   │   ├── Visualizer/       # Compilation visualization
│   │   │   ├── AST/          # Abstract Syntax Tree view
│   │   │   ├── Memory/       # Memory layout view
│   │   │   └── Assembly/     # Generated assembly view
│   │   └── Lessons/          # Learning content
│   ├── compiler/
│   │   ├── wasm/             # WASM compiler bindings
│   │   └── parser/           # Custom parser utilities
│   ├── hooks/                # React hooks
│   ├── stores/               # State management
│   └── types/                # TypeScript definitions
├── lessons/                  # Lesson content (MDX)
├── public/
└── tests/
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## Design Philosophy

1. **Visual First**: Every concept should be visualizable
2. **Progressive Disclosure**: Complexity revealed gradually
3. **Immediate Feedback**: Real-time compilation feedback
4. **Approachable**: Friendly UI, no intimidating interfaces

## Color Palette

| Element | Color | Usage |
|---------|-------|-------|
| Primary | `#6366f1` | Actions, highlights |
| Success | `#22c55e` | Correct code, passing tests |
| Error | `#ef4444` | Compilation errors |
| Warning | `#f59e0b` | Warnings, suggestions |
| Background | `#0f172a` | Dark theme base |

## Target Audience

- CS students learning C/C++
- Self-taught programmers wanting to understand compilation
- Educators teaching systems programming
- Anyone curious about "what happens when you compile"

## Related Projects

- [godbolt.org](https://godbolt.org) - Compiler Explorer
- [pythontutor.com](https://pythontutor.com) - Visual debugger
- [visualgo.net](https://visualgo.net) - Algorithm visualization

## License

MIT
