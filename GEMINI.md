# Project Overview

Martva.app is a user-friendly web application designed to simplify the process of booking the city driving portion of the Georgian driver's license exam. It provides an intuitive interface to browse available dates and time slots, offering a seamless alternative to the official government website.

**Key Features:**

- Browse Test Centers
- Interactive Calendar
- Time Slot Booking
- Responsive Design
- Dark/Light Mode

**Main Technologies:**

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Date & Time**: date-fns & React Day Picker

# Building and Running

## Prerequisites

- Node.js
- Bun

## Installation

1.  Clone the repository.
2.  Navigate to the project directory:
    ```bash
    cd martva.app
    ```
3.  Install the dependencies:
    ```bash
    bun install
    ```

## Available Scripts

- `bun dev`: Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- `bun build`: Builds the app for production.
- `bun start`: Starts a production server.
- `bun lint`: Runs the linter to check for code quality.
- `bun format`: Formats the code using Prettier.

# Development Conventions

- **Language**: TypeScript is used for all application logic.
- **Styling**: Tailwind CSS is used for styling, with `shadcn/ui` components.
- **Code Formatting**: Prettier is used for code formatting. Run `bun format` to format the code.
- **Linting**: ESLint is used for code quality checks. Run `bun lint` to check for issues.
