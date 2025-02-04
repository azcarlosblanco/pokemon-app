# Pokemon App

A React application built with Vite that displays Pokemon data from the PokeAPI. The app features authentication, Pokemon listing, searching, and detailed Pokemon information.

## Features

- User authentication
- Pokemon listing with pagination
- Pokemon search functionality
- Detailed Pokemon information modal
- Responsive Material-UI design

## Prerequisites

- Node.js (version 20 or higher)
- npm or yarn

## Installation

1. Clone the repository

```bash
git clone https://github.com/azcarlosblanco/pokemon-app
cd pokemon-app
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Access the app

Open your browser and navigate to `http://localhost:5173` to see the app in action.

## Testing

To run tests, use the following command:

```bash
npm test
```

This will execute the test suite and provide a report of the results.

## Project Structure

The project uses Vite as a build tool, which provides:
- Fast development server with Hot Module Replacement (HMR)
- Optimized production builds
- TypeScript support out of the box
- Built-in support for React

## Pages

### Login Page
- URL: `/login`
- Credentials:
  - Username: `admin`
  - Password: `admin`

### Home Page
- URL: `/`
- Features:
  - Displays a grid of Pokemon
  - Search functionality
  - Pagination
  - Click on a Pokemon to view detailed information
- Protected route (requires authentication)

## Technologies Used

- React 18
- TypeScript
- Redux Toolkit for state management
- Material-UI for components
- Axios for API calls
- React Router for routing
- Jest and React Testing Library for testing
- Formik and Yup for form handling and validation