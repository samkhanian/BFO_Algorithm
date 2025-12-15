---
description: Repository Information Overview
alwaysApply: true
---

# BFO Educational Platform Information

## Summary

Interactive educational platform for the Bacterial Foraging Optimization (BFO) algorithm, an AI course project at an Iranian university. The platform is bilingual (Farsi/English) and responsive, featuring two main sections: Education (algorithm learning with 6 interactive lessons) and Laboratory (simulation and optimization with warehouse scenarios).

## Structure

- **Root HTML Pages**: `index.html` (home), `education.html` (lessons), `laboratory.html` (simulation), `about.html` (project info)
- **src/config/**: `app-config.js` - main initialization, language toggle, navigation, hero animation, education/lab page logic
- **src/ui/styles/**: 9 CSS files covering variables, base styles, components, responsive design, animations, and page-specific styling
- **src/ui/components/**, `src/ui/managers/`, `src/models/`, `src/services/`, `src/core/`: Pre-structured for Phase 2 implementation
- **assets/**, **content/**, **docs/**, **tests/**: Supporting directories for resources, educational content, documentation, and unit tests

## Language & Runtime

**Language**: HTML5, CSS3, JavaScript (ES6 Modules)  
**Runtime**: Browser-based (modern browsers with ES6+ support)  
**Build System**: Vite 5.0.8  
**Package Manager**: npm

## Dependencies

**Main Dependencies**:
- d3 (^7.8.5) - Data visualization library
- @fortawesome/fontawesome-free (^6.5.1) - Icon library

**Development Dependencies**:
- vite (^5.0.8) - Build tool and dev server
- eslint (^8.55.0) - Code quality
- prettier (^3.1.0) - Code formatting
- jest (^29.7.0) - Testing framework
- @vitejs/plugin-basic-ssl (^1.0.0) - HTTPS support for dev server

## Build & Installation

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm run format
npm run test
```

## Main Files & Resources

**Application Entry Points**:
- `index.html` - Home page with hero, features, stats, and CTA sections
- `education.html` - Interactive lesson viewer (6 lessons on BFO algorithm)
- `laboratory.html` - Simulation interface with warehouse canvas and parameter controls
- `about.html` - Project information, team, resources, and acknowledgments

**Configuration Files**:
- `src/config/app-config.js` - App initialization, language toggle (fa/en), theme management (light/dark), hero particle animation, page-specific initializers
- `vite.config.js` - Vite configuration with dev server port 3000
- `package.json` - Project metadata and npm scripts
- `.eslintrc.json` - ESLint rules (camelCase, prefer-const, semicolons)
- `.prettierrc.json` - Prettier formatting (2-space indent, single quotes)

**CSS Architecture**:
- `src/ui/styles/variables.css` - 70+ CSS custom properties (colors, typography, spacing, shadows, transitions, z-index)
- `src/ui/styles/base.css` - HTML element resets and semantic styling
- `src/ui/styles/components.css` - Reusable button, card, input, badge, alert, pagination components
- `src/ui/styles/responsive.css` - Mobile-first design (breakpoints: 640px, 768px, 1024px, 1280px, 1536px)
- `src/ui/styles/animations.css` - 20+ animations (fade, slide, scale, pulse, bounce, spin, shimmer, etc.)
- Page-specific: `index.css`, `education.css`, `laboratory.css`, `about.css`

## Testing

**Framework**: Jest (^29.7.0)  
**Configuration File**: `jest.config.js`  
**Coverage Thresholds**: 70% required for statements, branches, functions, lines  

**Run Tests**:
```bash
npm test
npm run test:watch
npm run test:coverage
```

## Current Features

- Bilingual UI (Farsi/English) with RTL/LTR support
- Responsive design (mobile-first, 5 breakpoints)
- Hero section with E. coli bacteria particle animation
- Statistics counter with intersection observer
- Education page with sidebar lesson navigation and progress tracking
- Laboratory page with scenario selection and tab interface (Comparison, State Tree, Metrics, Export)
- Modern animation library
- Dark/light theme support in CSS (via CSS variables and prefers-color-scheme)

## Known Outstanding Items

- **Header/Footer Extraction**: Currently duplicated across pages; needs extraction to reusable components
- **Dark Theme Toggle**: Theme variable setup exists but no UI button/switcher implemented
- **Full i18n System**: Only documentation is bilingual; UI needs comprehensive translation system
- **Component Registry**: No centralized management for reusable components
