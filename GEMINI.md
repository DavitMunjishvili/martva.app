# GEMINI.md

## Project Overview

This is a Next.js application written in TypeScript that allows users to book the city driving portion of the Georgian driver's license exam. It provides a user-friendly interface to browse available dates and time slots, offering a seamless alternative to the official government website. The application is styled with Tailwind CSS and uses `shadcn/ui` for UI components. It fetches data from a backend API to provide the most up-to-date information.

## Building and Running

-   **Installation:** `bun install`
-   **Running (development):** `bun dev`
-   **Building (production):** `bun build`
-   **Starting (production):** `bun start`
-   **Linting:** `bun lint`
-   **Formatting:** `bun format`

## Development Conventions

-   The project uses TypeScript for static typing.
-   Styling is done with Tailwind CSS and `clsx` for conditional classes.
-   UI components are built with `shadcn/ui`.
-   Custom hooks are used for data fetching and state management.
-   API routes in Next.js are used as a proxy to a backend API.
-   The project uses `date-fns` for date manipulation.
-   The project uses `prettier` for code formatting and `eslint` for linting.
-   The project uses `react-day-picker` for the calendar component.
-   The project uses `next-themes` for theme management.
-   The project uses `@vercel/analytics` for analytics.
-   The project uses `lucide-react` for icons.
-   The project uses `use-toast` for notifications.
-   The project uses `use-notification` for browser notifications.
