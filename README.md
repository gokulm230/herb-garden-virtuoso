# Herb Garden Virtuoso

A modern web application for exploring medicinal plants with AI-powered information and 3D visualization.

## Features

- 🌿 Search for medicinal plants
- 🤖 AI-powered plant information using Google Gemini
- 🎨 Modern UI with Tailwind CSS and shadcn/ui
- 📱 Responsive design
- ⚡ Fast development with Vite

## Quick Start

### Option 1: Run with batch file (Windows)
```bash
start-servers.bat
```

### Option 2: Run with script (Linux/Mac)
```bash
chmod +x start-servers.sh
./start-servers.sh
```

### Option 3: Manual setup

1. **Start the backend server:**
```bash
cd server
npm install
node index.js
```

2. **Start the frontend (in another terminal):**
```bash
npm install
npm run dev
```

The application will be available at:
- Frontend: http://localhost:8080 (or available port)
- Backend API: http://localhost:3002

## Project Structure

```
herb-garden-virtuoso/
├── src/                 # Frontend React application
├── server/              # Express.js backend server
├── public/              # Static assets
└── components.json      # UI components configuration
```

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

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a1310af0-d655-4acf-ab08-42aa95f90747) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
