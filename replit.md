# ToolSuite - Free Online Productivity Tools

## Overview

ToolSuite is a comprehensive web application offering free online tools for productivity, including PDF conversion, text analysis, QR code generation, image processing, currency conversion, and SEO utilities. The platform provides instant access to professional-grade tools without registration requirements, focusing on speed, security, and user experience.

## Recent Changes (January 2025)

### Scientific Calculator Tool (NEW)
- **Advanced Mathematical Calculator**: Comprehensive tool supporting derivatives, integrals, limits, and algebraic operations
- **Python SymPy Integration**: Backend Python microservice using SymPy library for 100% accurate symbolic mathematics
- **Step-by-Step Solutions**: Detailed explanations for every calculation with proper mathematical notation
- **Interactive UI**: Modern interface with function buttons, history panel, and real-time calculation results
- **Multiple Operations**: Supports evaluation, differentiation, integration, limits, solving, simplification, expansion, and factoring
- **Calculus Features**: First, second derivatives, definite/indefinite integrals, limit calculations with proper mathematical rigor

### File Download System Enhancement
- **Fixed Download Routes**: Added proper `/downloads/:filename` endpoint for processed PDF and Word files
- **File Streaming**: Implemented secure file streaming with appropriate MIME types and download headers
- **Error Handling**: Comprehensive error handling for missing files and network issues

### Currency Converter Enhancements
- **Expanded Currency Support**: Added support for 8 major currencies including PKR (Pakistani Rupee), INR (Indian Rupie), AED (UAE Dirham)
- **Real-time Exchange Rates**: Integrated with multiple free APIs for live exchange rate data with fallback system
- **Improved UX**: Set USD→PKR as default conversion pair, updated popular currency pairs
- **Enhanced Dropdowns**: Better currency selection with symbols and full names

### Navigation Improvements
- **Scroll-to-Top Fix**: Added ScrollToTop component to automatically scroll to page top on route changes
- **Better UX**: Resolves issue where users remained at bottom of page when clicking footer links

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing between tool pages
- **Styling**: TailwindCSS with custom design system featuring gradient themes and dark/light mode support
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible interface
- **State Management**: React hooks for local state, TanStack Query for server state and caching
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API endpoints
- **Language**: TypeScript for full-stack type safety
- **File Upload**: Multer middleware for handling file uploads with size and type validation
- **Service Layer**: Modular service architecture for PDF processing, QR generation, currency conversion, and SEO tools
- **Storage**: In-memory storage implementation with interface for easy database migration

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM configured for production deployment
- **Schema**: Structured tables for users, tools, usage analytics, and site settings
- **File Storage**: Local file system for temporary uploads with automatic cleanup
- **Session Management**: Connect-pg-simple for PostgreSQL-backed session storage

### Authentication and Authorization
- **Current**: No authentication required for tool usage (public access)
- **Infrastructure**: Basic user schema prepared for future authentication features
- **Security**: File type validation, size limits, and secure file handling

### External Service Integrations
- **Database**: Neon serverless PostgreSQL for scalable data storage
- **Analytics**: Google Analytics 4 integration for user behavior tracking
- **Currency API**: Configurable currency exchange rate provider with fallback mock data
- **QR Generation**: QR Server API for reliable QR code generation
- **SEO Tools**: Placeholder structure for plagiarism checking and meta tag optimization APIs

### Key Design Patterns
- **Monorepo Structure**: Shared schema and types between client and server
- **Service-Oriented**: Dedicated services for each tool category (PDF, QR, currency, SEO)
- **Progressive Enhancement**: Tools work without JavaScript for basic functionality
- **Mobile-First**: Responsive design with touch-friendly interfaces
- **SEO Optimized**: Server-side rendering preparation, meta tags, sitemap generation, and structured data

### Performance Optimizations
- **Code Splitting**: Lazy loading of tool pages to reduce initial bundle size
- **Asset Optimization**: Image optimization and font loading strategies
- **Caching**: Query caching with TanStack Query for repeated API calls
- **Bundle Optimization**: Vite build optimization with tree shaking

### Development Experience
- **Hot Reload**: Vite HMR for instant development feedback
- **Type Safety**: Full TypeScript coverage across frontend and backend
- **Error Handling**: Comprehensive error boundaries and API error handling
- **Development Tools**: ESLint, Prettier, and development server with error overlay

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon database
- **drizzle-orm**: Type-safe SQL ORM with PostgreSQL dialect
- **express**: Web application framework for Node.js backend
- **react**: Frontend library with hooks and modern patterns
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React router

### UI and Styling
- **@radix-ui/***: Accessible UI primitives for complex components
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe CSS class variants
- **lucide-react**: Consistent icon library

### Development and Build Tools
- **vite**: Fast build tool and development server
- **typescript**: Type system for JavaScript
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production

### File Processing and Utilities
- **multer**: File upload middleware for Express
- **qrcode**: QR code generation library
- **date-fns**: Date manipulation utilities

### Optional Integrations
- **Google Analytics**: Web analytics and user tracking
- **Currency Exchange APIs**: Real-time exchange rate data
- **Remove.bg API**: AI-powered background removal
- **Plagiarism Detection APIs**: Content originality checking