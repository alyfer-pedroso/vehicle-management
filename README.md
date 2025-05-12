# Vehicle Management System

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-green.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.6-blue.svg)](https://tailwindcss.com/)
[![Google Maps API](https://img.shields.io/badge/Google_Maps_API-latest-red.svg)](https://developers.google.com/maps)
[![React Query](https://img.shields.io/badge/Tanstack_Query-5.75.7-purple.svg)](https://tanstack.com/query)
[![Jest](https://img.shields.io/badge/Jest-29.7.0-red.svg)](https://jestjs.io/)

A modern vehicle tracking and management application built with React, TypeScript, and Google Maps API.

![Vehicle Management System](https://github.com/alyfer-pedroso/vehicle-management/blob/main/src/assets/vehicle-management.png)

## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Design Patterns](#design-patterns)
- [Code Patterns](#code-patterns)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Testing](#testing)
- [Project Architecture](#project-architecture)

## Features

- **Real-time Map Display**: 
  - Interactive Google Maps integration showing all tracked vehicles simultaneously
  - Automatic data refresh every 2 minutes
  - Color-coded vehicle markers based on ignition status (ON/OFF)

- **Vehicle Information**:
  - Click on map markers to view detailed vehicle information
  - Direct Google Maps link to vehicle location coordinates
  - View vehicle status, plate number, fleet number, and timestamp

- **Efficient Data Management**:
  - Pagination with infinite scroll functionality
  - Initial load of 20 vehicles with smooth loading of additional vehicles
  - Optimized data fetching using React Query with caching

- **Filtering Capabilities**:
  - Filter vehicles by type (Tracked, Others)
  - Search vehicles by plate number or fleet number
  - Real-time filter updates with URL parameter tracking

- **Responsive Design**:
  - Fully responsive UI that works on all device sizes
  - Custom-styled components using TailwindCSS
  - Seamless experience across desktop and mobile

- **Modern UI**:
  - Clean, intuitive interface with consistent styling
  - Loading indicators for data fetching operations
  - Error feedback with toast notifications

## Technology Stack

- **Frontend Framework**: React 19.1.0
- **Language**: TypeScript 5.8.3
- **Build Tool**: Vite 6.3.5
- **Styling**: TailwindCSS 4.1.6
- **Maps Integration**: Google Maps API via @react-google-maps/api
- **State Management**: React Query (TanStack Query 5.75.7)
- **Form Handling**: React Hook Form 7.56.3 with Zod validation
- **HTTP Client**: Axios 1.9.0
- **Testing**: Jest 29.7.0 with React Testing Library
- **Routing**: React Router 7.6.0
- **UI Components**: Custom components with shadcn/ui pattern
- **Notifications**: Sonner 2.0.3

## Project Structure

```
vehicle-management/
├── src/
│   ├── components/       # UI components
│   │   ├── google/       # Google Maps related components
│   │   ├── icons/        # SVG icons components
│   │   ├── modals/       # Modal dialog components
│   │   ├── template/     # Layout and template components
│   │   └── ui/           # Reusable UI components
│   ├── constants/        # Application constants
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── models/           # TypeScript type definitions
│   ├── providers/        # React context providers
│   ├── routes/           # Routing configuration
│   ├── services/         # API services
│   └── tests/            # Test files
├── public/               # Static assets
└── ...config files
```

## Design Patterns

1. **Component Composition**:
   - Small, focused components composed together to build complex UI
   - Separation of concerns with components handling specific responsibilities

2. **Provider Pattern**:
   - Context providers (e.g., `VehiclesProvider`, `AppProvider`) for state sharing
   - Wrapping components with required context for data access

3. **Custom Hook Pattern**:
   - Abstraction of complex logic into reusable hooks
   - Examples: `useFilterForm`, `useMain`, `useScroll`

4. **Container/Presentational Pattern**:
   - Separation of data fetching logic from presentation components
   - Example: `Main` component handles data while child components focus on rendering

5. **Render Props Pattern**:
   - Used in components like `InfiniteScroll` passing render functions as props

6. **Higher-Order Components (HOC)**:
   - Used for component memoization to optimize performance (e.g., with `memo`)

7. **Proxy Pattern**:
   - API service layer abstracting the details of HTTP requests

## Code Patterns

1. **Memoization**:
   - Strategic use of `memo` on components that don't need frequent re-renders
   - Examples: `Maps`, `VehicleMarker`, `VehiclesTable`

2. **Controlled Forms**:
   - Form state managed by React Hook Form with Zod validation
   - Centralized form logic in custom hooks

3. **Data Normalization**:
   - Consistent data structures for vehicles and location data
   - Type safety with TypeScript interfaces and enums

4. **Error Handling**:
   - Centralized error handling in API services
   - User-friendly error messages with toast notifications

5. **Conditional Rendering**:
   - Smart component rendering based on data state (loading, empty, error)
   - Use of utility classes with Tailwind's `cn` helper

6. **URL State Synchronization**:
   - Form state synchronized with URL parameters
   - React Router integration for maintaining filter state

7. **Debounced Operations**:
   - Optimization of scroll events and other frequent operations

8. **Data Polling**:
   - Automatic data refresh every 2 minutes using React Query
   - Optimization with stale time configuration

## Getting Started

### Prerequisites

- Node.js (v18.x or later recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/vehicle-management.git
   cd vehicle-management
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory and add your Google Maps API key:
   ```
   VITE_GOOGLE_API_KEY=your_google_maps_api_key
   VITE_API_BASE_URL=your_backend_api_url
   VITE_API_TOKEN=your_api_token
   ```

### Available Scripts

- **Development server**:
  ```bash
  npm run dev
  ```
  This starts the development server at `http://localhost:5173/`

- **Build for production**:
  ```bash
  npm run build
  ```

- **Preview production build**:
  ```bash
  npm run preview
  ```

- **Run tests**:
  ```bash
  npm run test
  ```

- **Run tests in watch mode**:
  ```bash
  npm run test:watch
  ```

- **Lint code**:
  ```bash
  npm run lint
  ```

## Configuration

The project uses several configuration files:

- `package.json`: Dependencies and scripts
- `vite.config.js`: Vite bundler configuration
- `tsconfig.json`: TypeScript configuration
- `jest.config.js`: Testing configuration
- `tailwind.config.js`: TailwindCSS styling configuration
- `components.json`: shadcn/ui component configuration

## Testing

The project uses Jest and React Testing Library for testing. Tests are organized in the `src/tests` directory.

- **Unit tests**: Test individual components and hooks
- **Integration tests**: Test interaction between components
- **Test utilities**: Helper functions for testing in `src/tests/utils`

Run tests with:
```bash
npm run test
```

## Project Architecture

### Data Flow

1. User interactions trigger form submissions or URL parameter changes
2. Custom hooks process these interactions and update query parameters
3. React Query fetches data from the API based on these parameters
4. Data is cached and served to components
5. Components render based on the current data state
6. Automatic refetching occurs every 2 minutes to keep data fresh

### Key Files

- `src/App.tsx`: Main application entry point
- `src/components/template/app.tsx`: Application layout structure
- `src/hooks/useMain/index.ts`: Core data fetching and management logic
- `src/hooks/useFilterForm/index.ts`: Filter form state management
- `src/components/template/map.tsx`: Google Maps integration
- `src/components/template/vehicles-table.tsx`: Vehicle data display

### State Management

- **URL Parameters**: Filter state (type, search term)
- **React Query**: Vehicle data, loading states, pagination
- **Component State**: UI interactions (modals, details display)
