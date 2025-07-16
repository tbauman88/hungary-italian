# Hungary-Italian Recipe App

A modern recipe application featuring the fusion of Hungarian and Italian cuisine, built with React 19, TypeScript, and Hasura GraphQL.

## 🏗️ Architecture

- **Frontend**: React 19 with TypeScript, Vite for bundling
- **Backend**: Serverless API functions on Vercel with Hasura GraphQL
- **Database**: PostgreSQL with Hasura GraphQL Engine
- **Styling**: Tailwind CSS with custom design system

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Hasura Cloud account
- Vercel account (for deployment)

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <your-repo-url>
   cd hungary-italian-recipes
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Update `.env` with your actual Hasura endpoint and admin secret:
   ```bash
   VITE_HASURA_GRAPHQL_URL=https://your-project.hasura.app/v1/graphql
   VITE_HASURA_ADMIN_SECRET=your-admin-secret
   ```

3. **Set up Hasura Database Schema**
   
   Create the following table in your Hasura console:

   ```sql
   CREATE TABLE recipes (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     title VARCHAR NOT NULL,
     description TEXT,
     prep_time INTEGER,
     cook_time INTEGER,
     servings INTEGER,
     image_url TEXT,
     cuisine_type VARCHAR DEFAULT 'Hungarian-Italian',
     difficulty_level VARCHAR DEFAULT 'medium',
     ingredients JSONB,
     instructions JSONB,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx
│   ├── RecipeCard.tsx
│   └── LoadingSpinner.tsx
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── RecipePage.tsx
│   └── AddRecipePage.tsx
├── graphql/            # GraphQL queries and mutations
│   └── queries.ts
├── lib/               # Utility functions and configurations
│   └── apollo-client.ts
└── main.tsx           # App entry point

api/                   # Vercel serverless functions
└── graphql.ts        # GraphQL proxy endpoint
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### GraphQL Schema

The app expects a `recipes` table with the following structure:

- `id` (UUID) - Primary key
- `title` (String) - Recipe name
- `description` (Text) - Recipe description
- `prep_time` (Integer) - Preparation time in minutes
- `cook_time` (Integer) - Cooking time in minutes
- `servings` (Integer) - Number of servings
- `image_url` (String) - Recipe image URL
- `cuisine_type` (String) - Type of cuisine
- `difficulty_level` (String) - Difficulty level
- `ingredients` (JSONB) - Array of ingredients
- `instructions` (JSONB) - Array of cooking instructions
- `created_at` (Timestamp) - Creation date
- `updated_at` (Timestamp) - Last update date

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard:
     - `VITE_HASURA_GRAPHQL_URL`
     - `VITE_HASURA_ADMIN_SECRET`

3. **Deploy**
   Vercel will automatically deploy on every push to main branch.

## 🎨 Design System

The app uses a custom Tailwind CSS configuration with:

- **Primary Colors**: Orange theme (`#f97316`)
- **Secondary Colors**: Green theme (`#22c55e`)
- **Typography**: Inter font family
- **Components**: Custom button and card styles

## 📝 Features

- ✅ Browse recipes with beautiful card layout
- ✅ View detailed recipe information
- ✅ Add new recipes with dynamic form
- ✅ Responsive design for all devices
- ✅ GraphQL integration with Hasura
- ✅ Serverless backend functions
- ✅ Modern React 19 with TypeScript

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
