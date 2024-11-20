# TakaFlow

TakaFlow is a financial service application built with Next.js and TypeScript. It provides a secure and efficient platform for financial transactions with custom authentication and role-based access control.

## Features

### User Roles

1. **Admin**: Manages users, monitors the system, and oversees transactions.
2. **User**: Conducts transactions such as sending money, cash-out, and balance inquiries.
3. **Agent**: Handles cash-in and cash-out requests for users.

### Key Functionalities

- **Authentication**: Secure login and registration with JWT and bcrypt for encryption.
- **Role-Based Access**: Admin, User, and Agent roles with specific capabilities.
- **State Management**: Powered by Redux Toolkit.
- **Data Validation**: Ensured with react-hook-form and Zod.
- **Transaction Management**: Send money, cash-in, cash-out, and view transaction history.

## Live Demo

Check out the live version of TakaFlow: [TakaFlow Live](https://takaflow.vercel.app)

## Default Credentials

### Admin

- **Email:** admin@admin.com
- **PIN:** 12345
- **Path:** /admin/login

### User

- **Email:** user@user.com
- **PIN:** 12345
- **Path:** /user/login

### Agent

- **Email:** agent@agent.com
- **PIN:** 12345
- **Path:** /agent/login

## Tech Stack

### Frontend

- **Framework**: [Next.js](https://nextjs.org/) (v15.0.3)
- **State Management**: [Redux-toolkit](https://redux-toolkit.js.org/)
- **Data Fetching and Caching**: [TanStack Query](https://tanstack.com/query/latest)
- **Form Data Manpulation**: [React-Hook-Form and Zod]("")
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.dev/), [Radix UI](https://www.radix-ui.com/)

### Backend

- **Database**: MongoDB (via Mongoose ORM)
- **Authentication**: Custom implementation with JWT and bcrypt
- **Validation**: Zod for secure data handling

## Installation

### Prerequisites

- Node.js (>= 18.x)
- MongoDB (local or cloud)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/shamim261/takaflow.git
   cd takaflow
   ```

   Install dependencies:

   ```bash
   npm install --force # force for react 19 peer-deps issue
   ```

2. Configure environment variables: Create a .env file in the root directory:

```bash
NODE_ENV=
MONGODB_CONNECTION_STRING=
JWT_SECRET=
COOKIE_NAME=
BASE_URL=
DEFAULT_LOGIN_PAGE=/user/login
```

3. Start the development server:

```bash
npm run dev
```

4. Visit the application: Open http://localhost:3000 in your browser.

## Usage

### Authentication

- Users, Agents, and Admins log in using their credentials.
  JWT is used for secure session management.

### Dashboard

- Role-specific dashboards provide tailored views and actions.
  Responsive design for desktop and mobile.

### Transactions

- Users can send money, cash-in, and cash-out securely.
- Admins can monitor all system activities.
- Agents manage user transactions effectively.

### Contact

For queries, feel free to reach out at **mdshamimreza5552@gmail.com**.
