# Shopping Cart Project

> A responsive React & Tailwind CSS frontend consuming a .NET API backend. This project is a work in progress; core features are implemented and more improvements are planned.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Clone the Repositories](#clone-the-repositories)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Branching & Workflow](#branching--workflow)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This Shopping Cart project provides a UI to browse and purchase concert events. It demonstrates:

- **Event listing** with descriptions, dates, times, prices, and discounts.
- **Incremental loading** of events ("Show More").
- **Interactive cart**: add/remove items, adjust quantities, view subtotal and total savings.
- **Reusable components**: Header, Footer, EventCard, CartItem, OrderList, Summary.
- **Responsive design** with Tailwind CSS.
- **Client-side routing** with React Router.

The frontend is built in React + TypeScript; the backend is a .NET Web API living in a separate repository.

---

## Features

1. **Home Page**

   - Display 10 sample events with alternating images.
   - "Show More" button to load additional events.
   - Progress bar indicating number of events shown.

2. **Event Details**

   - Shows date, time, place, price, and discount badge.

3. **Shopping Cart Page**

   - Adds items to cart via "Add to Cart" button.
   - Modify quantity on the cart page with up/down controls.
   - Shows original price, discounted price, and percentage saved.
   - "Back to Shop" link in header to return to the home page.

4. **Reusable Layout**

   - Shared Header and Footer components across pages.
   - Consistent styling and spacing via Tailwind CSS.

5. **Summary Sidebar**

   - Lists total items and total price.
   - Checkout button aligned under the summary box.

6. **Scaffolding** (in progress)

   - Automated generation of new components/pages via code templates.

---

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, React Router
- **Backend:** .NET 6 Web API (separate repository)
- **Tooling:** Vite, Git, GitHub, VS Code

---

## Prerequisites

- Node.js (v14+)
- npm or yarn
- .NET 6 SDK (for backend)

---

## Getting Started

### Clone the Repositories

```bash
# Frontend
git clone https://github.com/Sconde04/Shopping-Cart-Project.git shopping-cart-frontend

# Backend
cd ..
git clone https://github.com/API_CONCERT(PRIVATE)/shopping-cart-backend.git shopping-cart-backend
```

### Backend Setup

```bash
cd shopping-cart-backend
# Restore NuGet packages
dotnet restore
# (Optional) Configure ports in Properties/launchSettings.json
# Run the API
dotnet run
```

The backend will be available at `http://localhost:5000/api` (or port you configured).

### Frontend Setup

```bash
cd ../shopping-cart-frontend
# Install dependencies
npm install
# Create .env file
cat <<EOF > .env
VITE_API_URL=http://localhost:5000/api
EOF
# Start dev server
npm run dev
```

Your React app will run at `http://localhost:3000`. It consumes the .NET Web API for data.

---

## Usage

- Browse events on the home page.
- Click **Show More** to load additional events.
- Click **Add to Cart** to add an event.
- Visit the **Cart** page to adjust quantities or remove items.
- View summary and proceed to checkout (placeholder).

---

## Project Structure

```
shopping-cart-frontend/
├─ public/              # Static assets, index.html, favicon
├─ src/
│  ├─ assets/           # Images, fonts
│  ├─ components/       # Reusable UI components (EventCard, CartItem, etc.)
│  ├─ pages/            # Route pages (Events, ShoppingCartPage)
│  ├─ services/         # API client functions
│  ├─ App.tsx           # Main router and layout
│  ├─ main.tsx          # Entry point
│  └─ index.css         # Tailwind imports & global styles
└─ tailwind.config.js   # Tailwind configuration
```

---

## Branching & Workflow

- **dev**: Integration branch. Merge feature branches here first.
- **master**: Production-ready releases. Merge `dev` once tested.
- **feature-X/**/FE-BE: Create new branches (e.g., `feature/homepage-ui/FE`) from `dev` for each task.
- **fix/**: For bug fixes (e.g., `fix/cart-layout`).

Use **Conventional Commits**:

```
<short description>
```

---

## Roadmap

- Persist cart contents (LocalStorage or backend).
- Checkout interface.
- Purchase confirmation page.
- Improved scaffolding for faster component generation.

---

## Contributing

1. Fork the repo and clone your fork.
2. Create a branch: `git checkout dev && git checkout -b feature/your-feature`.
3. Commit your changes with clear messages.
4. Push and open a Pull Request against `dev`.
5. Ensure all tests pass and review feedback.

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---
