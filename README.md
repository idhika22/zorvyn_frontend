A modern, responsive finance dashboard built with React, TypeScript, and Tailwind CSS. This application provides comprehensive financial tracking with role-based access control, interactive visualizations, and a clean dark theme interface.

 Live Demo

Deployed on Vercel: [https://zorvyn-frontend-two.vercel.app/]

 Demo Credentials

Note: Authentication is not implemented for this demo. Use these credentials to access the dashboard:

- **Username:** User
- **Password:** 1234

Architecture & Code Structure

Project Overview

This finance dashboard follows a modern React architecture with feature-based component organization, custom hooks for state management, and comprehensive TypeScript integration.

 Technology Stack

 1.Frontend Framework: React 19 with TypeScript
 2.Styling: Tailwind CSS with custom dark theme
 3.Build Tool:Vite
 4.Routing:React Router DOM
 5.State Management: Custom React Hooks
 6.Data Persistence: Local Storage
 7.Icons & Animations: CSS transitions and native emojis


 Core Features

 1. Dashboard Overview
    Summary Cards: Total Balance, Income, Expenses, and Transaction count
    Balance Trend Chart: 6-month historical balance visualization with gradient fill
    Spending Breakdown: Interactive donut chart showing expenses by category
    Monthly Overview: Income vs expenses comparison chart

 2. Transaction Management
    Complete Transaction List: Date, description, category, amount, status, and payment method
    Advanced Filtering: Filter by transaction type (income/expense) and status
    Smart Search: Search across description, category, and payment method
    Flexible Sorting: Sort by date (newest/oldest) or amount (highest/lowest)
    Role-Based Actions: Admin can add/delete transactions, viewers can only view

 3. Role-Based Access Control (RBAC)
    Admin Role: Full access to add, edit, and delete transactions
    Viewer Role: Read-only access to all data
    Role Switcher: Dropdown in header to switch between roles for demonstration
    UI Adaptation: Interface elements show/hide based on current role

 4. Financial Insights
    Highest Spending Category: Identifies top expense category with amount
    Monthly Comparison: Current vs previous month expense comparison with percentage change
    Savings Ratio: Income vs expenses ratio calculation
    Pending Transactions: Count of transactions awaiting processing

 5. Data Persistence
    Local Storage: All transaction data persists between sessions
    User Preferences: Role selection and user name stored locally
    Export Functionality: CSV export of all transactions

Technical Approach

State Management Strategy

Custom Hook Pattern - Instead of using global state libraries like Redux or Zustand, I implemented a custom useTransactions hook that:

Centralizes Business Logic: All transaction operations in one place
Optimizes Performance: Uses useMemo for expensive calculations
Handles Persistence: Automatic localStorage sync
Provides Clean API: Simple interface for components to consume



Component Architecture

Feature-Based Organization - Components are grouped by feature rather than type:


components/
├── dashboard/     # Dashboard-specific components
├── transactions/  # Transaction management
├── layout/        # App layout and navigation
└── common/        # Shared utilities

Benefits:
  Scalability: Easy to add new features
  Maintainability: Related code stays together

Responsive Design Approach

Mobile-First with Tailwind CSS:
  Breakpoint Strategy: `sm:` (640px), `md:` (768px), `xl:` (1280px)
  Adaptive Sidebar: Collapses to overlay on mobile devices
  Touch-Friendly: Appropriate spacing and button sizes for mobile

TypeScript Integration
 Comprehensive Type Safety:
   Interface Definitions: All data structures properly typed
   Union Types: Role, transaction type, and status enums
   Generic Components: Reusable components with proper prop typing
   Type Guards: Runtime type checking where needed

Design System
Color Palette
 Primary Green: `#1fa67a` - Success, income, primary actions
 Accent Orange: `#e07b39` - Warnings, expenses, highlights
 Background: `#0f1219` - Dark theme base
 Cards: `#1a1f2e` - Elevated surfaces
 Text: `#ffffff` - Primary text with opacity variants

Getting Started
Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd finance-dashboard
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start development server
   ```bash
   npm run dev
   ```

4. Build for production
   ```bash
   npm run build
   ```




Security Considerations
 No Real Authentication: Demo-only login (as noted)
 Local Storage: Sensitive data should use secure storage in production
 Input Validation: Basic validation implemented

Future Enhancements
 Backend Integration: REST API or GraphQL integration
 Real Authentication: JWT or OAuth implementation
 Advanced Charts: Integration with charting libraries
 Offline Support: Service workers for offline functionality
 Testing: Unit and integration tests
 Internationalization: Multi-language support

