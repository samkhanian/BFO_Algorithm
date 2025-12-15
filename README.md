# BFO Educational Platform
## آزمایشگاه تعاملی الگوریتم جستجوی باکتریایی

An interactive educational platform for learning the **Bacterial Foraging Optimization (BFO)** algorithm with practical applications in warehouse robot path optimization.

پلتفرم آموزشی تعاملی برای یادگیری الگوریتم جستجوی باکتریایی (BFO) با کاربرد عملی در بهینه‌سازی مسیر ربات‌های انبار.

---

## Project Information

- **Course**: Artificial Intelligence
- **Instructor**: Dr. Roya Namiranian
- **Developer**: Jamal Samkhanian
- **Academic Year**: 1402-1403 (2023-2024)
- **Version**: 1.0 (Beta)
- **License**: MIT

---

## Features

### 📚 Education Section
- Interactive animations of bacterial behavior
- Step-by-step visualization of BFO algorithm
- Canvas-based chemotaxis simulation
- Live code display synchronized with animations
- 6 comprehensive lessons with visual explanations
- AI concepts explainer (Optimization, State Space Search, TSP)

### 🔬 Laboratory Section
- 2D warehouse map simulator
- Path optimization using BFO algorithm
- Multiple difficulty scenarios (Beginner, Intermediate, Advanced, Custom)
- State tree visualization using D3.js
- Performance metrics and analysis
- Real-time comparison with other algorithms (GA, PSO, Greedy)
- Export functionality (JSON, CSV, PNG, PDF)

### 📊 Analysis & Visualization
- D3.js-based state tree visualization
- Algorithm performance comparison charts
- Metrics dashboard (Completeness, Optimality, Time Complexity, etc.)
- Interactive data exploration

---

## Technology Stack

### Frontend
- **HTML5**: Semantic markup with full accessibility support
- **CSS3**: Modern styling with Flexbox/Grid, CSS Variables, animations
- **JavaScript ES6+**: Modular, clean code architecture
- **Canvas API**: Real-time animation rendering
- **D3.js v7**: Data visualization and interactive graphs

### Development Tools
- **Vite**: Ultra-fast build tool and dev server
- **ESLint**: Code quality and style enforcement
- **Prettier**: Automatic code formatting
- **Jest**: Unit testing framework

### Libraries & Resources
- **FontAwesome 6**: Icon library
- **Vazirmatn Font**: Persian typography
- **Fetch API**: Data loading
- **LocalStorage API**: Client-side persistence

---

## Project Structure

```
bfo-educational-platform/
├── index.html                    # Home page
├── education.html                # Education section
├── laboratory.html               # Laboratory section
├── about.html                    # About & references
│
├── src/
│   ├── core/                     # Pure algorithm implementations
│   │   ├── bfo-algorithm.js
│   │   ├── bfo-parameters.js
│   │   ├── tsp-solver.js
│   │   └── distance-calculator.js
│   │
│   ├── models/                   # Data models
│   │   ├── bacteria.model.js
│   │   ├── warehouse.model.js
│   │   ├── path.model.js
│   │   └── scenario.model.js
│   │
│   ├── services/                 # Business logic
│   │   ├── simulation.service.js
│   │   ├── storage.service.js
│   │   ├── algorithm.service.js
│   │   └── ai-metrics.service.js
│   │
│   ├── ui/
│   │   ├── components/           # Reusable UI components
│   │   ├── managers/             # UI management
│   │   └── styles/               # CSS files
│   │
│   ├── utils/                    # Utility functions
│   └── config/                   # Configuration files
│
├── content/                      # Educational content
│   ├── education/
│   │   └── lessons/              # Lesson content files
│   └── lab/
│       ├── scenarios/            # Predefined scenarios
│       └── benchmarks/           # Performance data
│
├── assets/                       # Media and resources
│   ├── images/
│   ├── fonts/
│   ├── icons/
│   └── data/
│
├── tests/                        # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
└── docs/                         # Project documentation
```

---

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd bfo-educational-platform

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Format code
npm run format

# Lint code
npm run lint
```

The application will be available at `http://localhost:3000`

---

## Development Guidelines

### Code Style
- **JavaScript**: camelCase for variables/functions, PascalCase for classes
- **CSS**: BEM naming convention, mobile-first approach
- **Comments**: Farsi comments for logic explanation, JSDoc for functions

### Performance Targets
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.5s
- Animation FPS: 60 FPS

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Learning Outcomes

After completing this educational platform, users will be able to:

1. **Understand BFO Concepts**: Grasp bacterial behavior and chemotaxis mechanisms
2. **Master the Algorithm**: Learn the four phases of BFO (Chemotaxis, Swarming, Reproduction, Elimination/Dispersal)
3. **Apply to Real Problems**: Implement BFO for optimization and path planning
4. **Analyze Performance**: Compare algorithms and understand computational complexity
5. **AI Fundamentals**: Understand optimization, state space search, and heuristic algorithms

---

## Features in Detail

### Lesson Topics (Education Section)

1. **Introduction & History** - BFO origin and nature-inspired computing
2. **Bacterial Behavior** - E. coli movement and chemotaxis mechanics
3. **Algorithm Phases** - Deep dive into each BFO phase
4. **Live Code** - Executable pseudocode with variable tracking
5. **AI Concepts** - Optimization problems and TSP explanation
6. **Algorithm Comparison** - BFO vs GA vs PSO vs Greedy

### Simulation Scenarios (Laboratory Section)

- **Beginner**: 5 delivery points, 50×50m warehouse
- **Intermediate**: 10 delivery points, 80×80m warehouse
- **Advanced**: 20 delivery points, 100×100m warehouse
- **Custom**: User-defined configuration

### Performance Metrics

- **Completeness**: Does the algorithm find a solution?
- **Optimality**: Quality of the solution found (%)
- **Time Complexity**: Runtime analysis (worst case: O(n²))
- **Space Complexity**: Memory usage (O(n) for n bacteria)
- **Branching Factor**: Average options per state
- **Convergence Rate**: Speed of algorithm convergence

---

## Roadmap

### Phase 1: ✅ Project Structure & Static Pages
- [x] Folder structure
- [x] HTML pages (index, education, laboratory, about)
- [x] CSS framework with variables and responsive design
- [x] Navigation and basic styling
- [x] Configuration files (ESLint, Prettier, Vite)

### Phase 2: Core Algorithm Implementation
- [ ] BFO algorithm implementation
- [ ] TSP solver
- [ ] Distance calculator utilities
- [ ] Data models (Bacteria, Warehouse, Path, Scenario)

### Phase 3: Education Section
- [ ] Bacteria animation
- [ ] Chemotaxis visualization
- [ ] Live code display
- [ ] Interactive lessons
- [ ] Lesson content creation

### Phase 4: Laboratory Section
- [ ] Warehouse map canvas
- [ ] Path optimization visualization
- [ ] D3.js state tree
- [ ] Performance metrics dashboard
- [ ] Scenario management

### Phase 5: Integration & Polish
- [ ] Tab system implementation
- [ ] Export functionality
- [ ] Data persistence
- [ ] Performance optimization
- [ ] Cross-browser testing

### Phase 6: Testing & Documentation
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] API documentation
- [ ] User guide

---

## File Structure Documentation

### Current Phase 1 Files

**HTML Files:**
- `index.html` - Home page with hero, features, stats, CTA sections
- `education.html` - Education section with lesson sidebar
- `laboratory.html` - Laboratory section with simulation controls
- `about.html` - Project information and references

**CSS Files:**
- `src/ui/styles/variables.css` - CSS variables and design tokens
- `src/ui/styles/base.css` - Reset and base element styles
- `src/ui/styles/components.css` - Reusable component styles
- `src/ui/styles/responsive.css` - Responsive design patterns
- `src/ui/styles/animations.css` - CSS animations and transitions
- `src/ui/styles/index.css` - Home page specific styles
- `src/ui/styles/education.css` - Education page specific styles
- `src/ui/styles/laboratory.css` - Laboratory page specific styles
- `src/ui/styles/about.css` - About page specific styles

**Configuration Files:**
- `package.json` - Dependencies and scripts
- `vite.config.js` - Vite configuration
- `jest.config.js` - Jest testing configuration
- `.eslintrc.json` - ESLint rules
- `.prettierrc.json` - Prettier configuration
- `.gitignore` - Git ignore rules

**JavaScript:**
- `src/config/app-config.js` - Main application configuration and initialization

---

## Contribution Guidelines

1. Follow the code style guidelines
2. Write comments in Farsi for logic explanation
3. Use meaningful commit messages
4. Test your changes before committing
5. Update documentation as needed

---

## Resources & References

### Academic Papers
- Passino, K. M. (2002). "Biomimicry of Bacterial Foraging for Distributed Optimization and Control". IEEE Control Systems Magazine, 22(3), 52-67.

### Books
- Russell, S. J., & Norvig, P. (2020). "Artificial Intelligence: A Modern Approach" (4th ed.). Pearson.

### Web Resources
- [D3.js Documentation](https://d3js.org/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Copyright © 2025 Jamal Samkhanian**

---

## Contact & Support

For questions or suggestions about this educational platform, please reach out to:

- **Developer**: Jamal Samkhanian
- **Instructor**: Dr. Roya Namiranian
- **Institution**: [University Name]

---

## Acknowledgments

Special thanks to:
- Dr. Roya Namiranian for guidance and supervision
- The Open Source community for amazing tools and libraries
- All contributors and testers

---

**Version**: 1.0.0 (Beta)  
**Last Updated**: December 2024  
**Status**: Development
