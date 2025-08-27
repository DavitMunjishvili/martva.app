# martva.app

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://martva.app)

Martva.app is a user-friendly web application designed to simplify the process of booking the city driving portion of the Georgian driver's license exam. It provides an intuitive interface to browse available dates and time slots, offering a seamless alternative to the official government website.

## Key Features

- **Browse Test Centers**: View a list of all available driving test centers.
- **Interactive Calendar**: Select dates to instantly see available appointment slots.
- **Time Slot Booking**: Check available hours for a specific date and center.
- **Responsive Design**: Fully usable on both desktop and mobile devices.
- **Dark/Light Mode**: Switch between themes for your viewing comfort.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Date & Time**: [date-fns](https://date-fns.org/) & [React Day Picker](http://react-day-picker.js.org/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en) and [Bun](https://bun.sh/) installed on your machine.

### Installation

1.  Clone the repository.
2.  Navigate to the project directory:
    ```bash
    cd martva.app
    ```
3.  Install the dependencies:
    ```bash
    bun install
    ```

### Running the Development Server

To start the development server, run the following command:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

In the project directory, you can run:

- `bun dev`: Runs the app in development mode.
- `bun build`: Builds the app for production.
- `bun start`: Starts a production server.
- `bun lint`: Runs the linter to check for code quality.
- `bun format`: Formats the code using Prettier.
