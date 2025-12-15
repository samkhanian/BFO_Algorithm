---
description: Repository Information Overview
alwaysApply: true
---

# BFO Educational Platform - Project Specification

## Summary

This is a university coursework assignment for the Artificial Intelligence course at an Iranian university (instructor: Dr. Roya Namiranian, student: Jamal Samkhanian). The project specifies a comprehensive interactive educational platform for learning the **Bacterial Foraging Optimization (BFO)** algorithm with practical application in warehouse robot path optimization. The repository currently contains project documentation and specifications in Farsi and English, with implementation planned as a web-based platform.

## Structure

- **README.md** / **README_FA.md**: Comprehensive documentation of BFO algorithm, core concepts, real-world applications, and industry impact (in English and Farsi)
- **prompt**: Detailed project specification for building the educational platform
- **LICENSE**: MIT License
- **.git**: Version control metadata

## Project Type

**Educational Web Platform** (Not Yet Implemented)

The platform is currently in specification phase. Implementation will be a two-section interactive web application:
1. **Education Section**: Concepts and algorithm visualization
2. **Laboratory Section**: Practical simulation and optimization tool

## Planned Technology Stack

### Frontend
- **HTML5, CSS3**: Markup and styling with RTL (Right-to-Left) support for Farsi
- **JavaScript (ES6+)**: Core application logic
- **Canvas API**: Animation rendering for bacteria behavior and warehouse visualization
- **D3.js (v7)**: Data visualization and state tree graphs
- **FontAwesome (v6)**: Icon library

### Styling & Layout
- **Flexbox/Grid**: Responsive layout system
- **CSS Variables**: Theme color management
- **CSS Animations**: Transitions and motion effects
- **Media Queries**: Mobile, tablet, desktop responsiveness

### Fonts & Internationalization
- **Vazirmatn**: Primary Farsi font
- **Tanha**: Display/heading font
- **Right-to-Left (RTL)**: Full RTL support throughout

### Build & Development Tools
- **Not yet specified** in the documentation

## Key Requirements

### Education Section Features
- **Bacteria Behavior Animation**: Interactive visualization of E. coli movement
- **Chemotaxis Simulation**: Visual representation of tumble/run movements
- **Nutrient Gradient Visualization**: Color-based gradient representation
- **Algorithm Steps**: Interactive walkthrough of chemotaxis, swarming, reproduction, and elimination/dispersal
- **Live Code Display**: Algorithm code synchronized with animation
- **AI Concepts Explainer**: Interactive tutorials on optimization, state space search, TSP problem, heuristic algorithms

### Laboratory Section Features
- **2D Warehouse Simulator**: Interactive warehouse map with adjustable shelf positions
- **Robot Path Optimization**: Real-time BFO algorithm application to TSP
- **State Tree Visualization**: D3.js-based graph showing algorithm decision tree
- **AI Metrics Analysis**: Completeness, optimality, time complexity, space complexity, branching factor, convergence rate
- **Multi-Scenario Support**: Beginner (5 points), intermediate (10 points), advanced (20 points), and custom scenarios
- **Data Export**: JSON, CSV, PNG output formats
- **Scenario Saving**: User ability to save and load warehouse configurations

## Warehouse Problem Parameters

**Scenario Levels:**
- Beginner: 5 points, 50×50m warehouse
- Intermediate: 10 points, 80×80m warehouse
- Advanced: 20 points, 100×100m warehouse
- Custom: Adjustable points and dimensions

**Example (Amazon Warehouse Robot):** 
Robot collects 6 packages from a 100×100m warehouse, visiting points S→A→D→B→C→E→F with distance/time/priority optimization.

**Fitness Function:** `0.5×(1/distance) + 0.3×(1/time) + 0.2×priorityScore`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## AI Metrics Included

- **Completeness**: Does the algorithm always find a solution?
- **Optimality**: Is the solution found optimal? (percentage-based measurement)
- **Time Complexity**: Algorithm runtime analysis (worst case: O(n²))
- **Space Complexity**: Memory consumption analysis (O(n) for n bacteria)
- **Branching Factor**: Average options per state node
- **Convergence Rate**: Algorithm convergence speed analysis

## Design Specifications

### Color Scheme
- **Primary**: Blue (#2563eb, #3b82f6)
- **Accent Bacteria**: Green (#10b981)
- **Accent Robot**: Orange (#f59e0b)
- **Background**: Dark (#1e293b), Light (#f8fafc)
- **Text**: Dark gray (#334155), Light gray (#64748b), White

### Responsive Breakpoints
- **Mobile**: Single column layout
- **Tablet**: Two-column layout
- **Desktop**: Full layout with all sections visible

## Implementation Phases

1. **Initial Setup**: Folder structure, base HTML files, Farsi fonts setup
2. **Education Section**: Canvas animations, interactive controls, educational content
3. **Laboratory Section**: Warehouse map, BFO algorithm implementation, D3.js integration
4. **Integration**: Section linking, interaction testing, performance optimization
5. **Testing & Launch**: Responsive testing, cross-browser testing, speed optimization, documentation

## Important Notes

- Full **RTL (Right-to-Left)** support required throughout all sections
- **Modular, clean code** with Farsi comments for logic explanation
- Performance and memory optimization critical for smooth animation rendering
- Focus on engaging visual learning experience
- AI concepts should be understandable for beginners and advanced users
- Export/save functionality for educational value and reproducibility

## Current Status

**Phase**: Specification and Documentation Complete  
**Implementation Status**: Not Started  
**Primary Language**: Specification written in Farsi and English  
**License**: MIT (Copyright 2025 Jamal Samkhanian)
