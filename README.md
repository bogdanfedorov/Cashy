## 👋 Project Structure Overview

Welcome, and thank you for checking out this project!

I’ve organized the codebase with scalability and readability in mind. Here’s a quick overview of how the structure works:

- **`/public`** – Contains all static assets (images, icons, etc.).
- **`/app`** – Includes assembled pages and routing logic.
- **`/components`** – Contains reusable UI components that are used across multiple features.
- **`/features`** – Each folder here represents a full feature. It contains the main component for that feature, as well as related GraphQL queries/mutations and custom hooks.  
  My goal was to separate logic as much as possible into hooks for clarity and reusability.

### 🔍 Where to Start

I recommend beginning your review with:

```
/src/features/UserPreferences/UserPreferences.tsx
```

From there, you can explore how features are structured and connected throughout the app.

Feel free to reach out if you have any questions. Hope you enjoy the project! 🙌

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
