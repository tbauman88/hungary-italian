# Hungary-Italian Recipe App

A modern recipe application built with React 19, TypeScript, and Hasura GraphQL.

## 🏗️ Architecture

| Category | Technology | Description |
|----------|------------|-------------|
| **Frontend** | ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)  | React 19 with TypeScript |
| **Build Tool** | ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) | Fast build tool and dev server |
| **Language** | ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) | Type-safe JavaScript |
| **Styling** | ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) | Utility-first CSS framework |
| **GraphQL** | ![Apollo-GraphQL](https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql) | GraphQL client with caching |
| **Backend** | ![Hasura](https://img.shields.io/badge/Hasura-1EB4D4?style=for-the-badge&logo=hasura&logoColor=white) | GraphQL API over PostgreSQL |
| **Database** | ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) | Relational database |
| **Deployment** | ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white) | Serverless hosting platform |
| **Runtime** | ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) | JavaScript runtime environment |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Hasura Cloud account
- Vercel account (for deployment)

### Installation

**Set up environment variables**
```bash
cp .env.example .env
```

**Set up Hasura Database Schema**
   
Create the following tables in your Hasura console:

```sql
-- Users table
CREATE TABLE users (
   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
   name VARCHAR NOT NULL,
   email VARCHAR UNIQUE NOT NULL,
   password_hash VARCHAR,
   created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ingredients table
CREATE TABLE ingredients (
   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
   name VARCHAR UNIQUE NOT NULL
);

-- Recipes table with enums
CREATE TYPE recipe_complexity AS ENUM ('Simple', 'Complex');
CREATE TYPE recipe_type AS ENUM ('Appetizers', 'Mains', 'Drinks');
CREATE TYPE recipe_tag AS ENUM ('Vegetarian', 'Vegan', 'Gluten Free', 'Dairy Free', 'Quick', 'Comfort', 'Healthy');

CREATE TABLE recipes (
   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
   title VARCHAR UNIQUE NOT NULL,
   type recipe_type NOT NULL,
   complexity recipe_complexity NOT NULL,
   cooking_time VARCHAR,
   portion_size VARCHAR,
   image_url VARCHAR,
   video_url VARCHAR,
   notes TEXT,
   steps TEXT[] NOT NULL,
   tags recipe_tag[],
   owner_id UUID REFERENCES users(id),
   created_at TIMESTAMPTZ DEFAULT NOW(),
   updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recipe ingredients junction table
CREATE TABLE recipe_ingredients (
   recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
   ingredient_id UUID REFERENCES ingredients(id) ON DELETE CASCADE,
   amount VARCHAR,
   PRIMARY KEY (recipe_id, ingredient_id)
);
   ```

**Start development server**
```bash
npm run dev
```

Visit `http://localhost:3000`


## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint


## 🚀 Deployment

Vercel will automatically deploy on every push to main branch.

## 🎨 Design System

The app uses a custom Tailwind CSS configuration with:

- **Primary Colors**: Orange theme (`#f97316`)
- **Secondary Colors**: Green theme (`#22c55e`)
- **Typography**: Inter font family
- **Components**: Custom button and card styles

## 📄 License

This project is licensed under the MIT License.
