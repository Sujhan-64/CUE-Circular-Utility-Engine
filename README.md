# Welcome to My project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.


Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

### Tech Stack

#### Frontend

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 18.3.1 | UI component library |
| [TypeScript](https://www.typescriptlang.org/) | 5.8.3 | Type-safe JavaScript |
| [Vite](https://vitejs.dev/) | 5.4.19 | Build tool & dev server (port 8080, SWC plugin) |
| [React Router DOM](https://reactrouter.com/) | 6.30.1 | Client-side routing |
| [TanStack React Query](https://tanstack.com/query) | 5.83.0 | Server-state management & data fetching |
| [React Context API](https://react.dev/reference/react/createContext) | — | Client-state management (Cart, User, Wishlist) |
| [shadcn/ui](https://ui.shadcn.com/) | — | Accessible component library built on Radix UI |
| [Radix UI](https://www.radix-ui.com/) | — | Headless, accessible UI primitives |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4.17 | Utility-first CSS framework |
| [React Hook Form](https://react-hook-form.com/) | 7.61.1 | Performant forms |
| [Zod](https://zod.dev/) | — | Schema validation for forms |
| [Recharts](https://recharts.org/) | 2.15.4 | Data visualisation / charts |
| [Lucide React](https://lucide.dev/) | 0.462.0 | SVG icon library |
| [Sonner](https://sonner.emilkowal.ski/) | 1.7.4 | Toast notifications |
| [date-fns](https://date-fns.org/) | 3.6.0 | Date utility functions |
| [Embla Carousel](https://www.embla-carousel.com/) | — | Carousel / slider component |

#### Backend (Python)

| Technology | Purpose |
|---|---|
| [FastAPI](https://fastapi.tiangolo.com/) | REST API framework |
| [Uvicorn](https://www.uvicorn.org/) | ASGI server |
| [pandas](https://pandas.pydata.org/) | Tabular data manipulation |
| [NumPy](https://numpy.org/) | Numerical computing |
| [scikit-learn](https://scikit-learn.org/) | ML models: `RandomForestClassifier`, `TfidfVectorizer`, cosine similarity |
| [joblib](https://joblib.readthedocs.io/) | Model serialisation / persistence |

#### Machine Learning

| Component | Implementation |
|---|---|
| **Promotion Priority Model** | `RandomForestClassifier` trained on expiry urgency, stock level, and sales velocity |
| **Recommendation Engine** | Content-based filtering using TF-IDF vectorisation + cosine similarity |
| **Dynamic Pricing** | Rule-based discount tiers: ≤1 day → 50%, ≤3 days → 30%, ≤5 days → 15% |

#### Development & Tooling

| Tool | Version | Purpose |
|---|---|---|
| [Vitest](https://vitest.dev/) | — | Unit & integration testing (jsdom environment) |
| [Playwright](https://playwright.dev/) | 1.57.0 | End-to-end browser testing |
| [@testing-library/react](https://testing-library.com/) | — | Component testing utilities |
| [ESLint](https://eslint.org/) | 9.32.0 | Static analysis & code quality |
| [PostCSS](https://postcss.org/) | — | CSS transformation (Tailwind + Autoprefixer) |
| [Bun](https://bun.sh/) | — | Alternative package manager (lock file included) |

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Circular Utility Engine Python API

A production-style FastAPI backend is included to recommend near-expiry circular deals.

### Backend structure

- `api/` FastAPI application and endpoints
- `models/` RandomForest promotion-priority model (saved with `joblib`)
- `recommender/` content-based recommendation engine
- `utils/` data loading/mock generation + dynamic pricing utilities
- `data/` generated datasets (`products.csv`, `users.csv`, `users.ts`)

### Install dependencies

```bash
pip install pandas numpy scikit-learn fastapi uvicorn joblib
```

### Run the API

```bash
uvicorn api.main:app --reload
```

### Endpoints

- `GET /recommendations/{user_id}`: top 10 near-expiry recommendations for a user
- `GET /circular-deals`: all near-expiry discounted products

Datasets are auto-generated if missing. The service always checks if files already exist before generating new mock data.
