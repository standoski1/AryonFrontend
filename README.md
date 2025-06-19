# Aryon snr Frontend Take-home Assignment

This is a Next.js frontend take-home assessment for the Security Rules Management Dashboard.

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

## Setup Instructions

### 1. Install Dependencies
```shell
npm install
```

### 2. Environment Configuration
Create a `.env.local` file in the client directory with the following variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_USE_AUTH=true
```

### 3. Cypress Configuration
**Important**: Before running tests, update the `baseUrl` in `cypress.config.ts`:
```typescript
// Change from:
baseUrl: 'http://localhost:3003',
// To:
baseUrl: 'http://localhost:3000',
```

### 4. Start the Development Server
```shell
npm run dev
```
The app will start on [http://localhost:3000](http://localhost:3000)

### 5. Start the Backend Server
In a separate terminal, navigate to the server directory and run:
```shell
cd ../server
npm install
npm run dev
```
The server will run on http://localhost:3001

## Testing Strategy

### Unit Tests
```shell
npm run test
```

### E2E Tests with Cypress
```shell
# Open Cypress Test Runner
npm run cypress:open

# Run tests headlessly
npm run cypress:run
```

### Test Coverage
```shell
npm run test:coverage
```

### Testing Approach
- **Unit Tests**: Component-level testing with Jest and React Testing Library
- **Integration Tests**: API integration and state management testing
- **E2E Tests**: Full user journey testing with Cypress
- **Accessibility Tests**: Automated a11y testing with axe-core

## Security Considerations

### Authentication
- JWT tokens stored in HttpOnly cookies (implemented)
- Session timeout and auto-logout on token expiry
- Protected routes with authentication middleware

### Input Validation & Sanitization
- Client-side form validation
- Server-side input sanitization
- XSS protection through proper escaping

### API Security
- CSRF protection headers
- Content Security Policy (CSP) headers
- Rate limiting on API endpoints

## Accessibility Features

- ARIA roles and labels for screen readers
- Keyboard navigation support
- Focus management for modals and panels
- High contrast mode support
- Reduced motion preferences
- Screen reader friendly components

## Performance Optimizations

- Code splitting and lazy loading
- Memoization for expensive operations
- Optimized bundle size
- Image optimization with Next.js
- Efficient state management

## Mobile Experience

- Responsive design for all screen sizes
- Touch-friendly interface elements
- Optimized for various mobile devices
- Progressive Web App capabilities

## Developer

This project was developed by Ezihe Stanley, a senior frontend developer with extensive experience in designing and implementing innovative solutions across various industries.

### Contact
- Email: ezihestanley@gmail.com
- GitHub: Ezihe Stanley
- LinkedIn: Ezihe Stanley

## About the Project

The Security Rules Management Dashboard is a React-powered web application that provides security teams with an efficient and user-friendly interface to manage, review, and enforce policy rules. Its purpose is to simplify the tracking and implementation of security measures, offering enhanced visibility into potential vulnerabilities while supporting compliance efforts.

### Core Features
- **Search and Filter Tools**: Locate specific rules easily with comprehensive search and filtering capabilities
- **Rule Insights**: Gain detailed insights into security recommendations, including impacts, affected resources, and compliance frameworks
- **High Performance**: Handles large datasets seamlessly without compromising performance
- **Modern UI**: An intuitive and responsive interface that ensures ease of use for security teams

### Key Features

#### 1. Dashboard Overview
- Infinite scrolling for recommendations
- Each recommendation displays:
  - Title and description
  - Risk scores
  - Quick archiving option
- Responsive design with error/loading states

#### 2. Search and Filter System
- Debounced search functionality (300ms delay)
- Real-time updates and "no results" feedback

#### 3. Detailed Recommendation View
- Comprehensive recommendation details
- Impact assessment visualization
- Framework compliance information

#### 4. Archive Management
- Archive/unarchive recommendations
- Separate archived items view
- Bulk operations support

#### 5. Authentication
- Login with form validation
- Protected routes for secure access
- Persistent authentication state
- Logout functionality

### Technical Requirements

#### 1. TypeScript
- Fully typed components with strict mode enabled
- Interface and type definitions
- Type-safe API calls

#### 2. State Management
- Redux Toolkit for global state
- React Context for theme and auth
- Optimistic updates

#### 3. Session Management
- Token-based authentication (JWT)
- Automatic session timeout handling
- Secure token storage

#### 4. Styling
- Designed using TailwindCSS
- Fully responsive and thematically consistent
- Dark/light mode support

#### 5. Performance Optimization
- Code splitting and lazy loading
- Effective memoization techniques
- Proper management of loading states

#### 6. Testing
- Comprehensive unit tests for components
- Integration tests for API calls
- E2E tests for user workflows
- Accessibility testing

## Troubleshooting

### Common Issues

1. **Cypress tests failing**: Ensure the baseUrl in cypress.config.ts matches your development server port
2. **Authentication not working**: Check that the backend server is running and USE_AUTH is set correctly
3. **Styling issues**: Clear browser cache and restart the development server
4. **API errors**: Verify the API_URL environment variable is correct

### Development Tips

- Use the React Developer Tools for debugging
- Check the Network tab for API call issues
- Use the Console for error logging
- Test on multiple devices for responsive design validation