# Herb Garden Server

This is a simple Express.js server that provides the backend API for the Herb Garden application, replacing the previous Supabase Edge Functions setup.

## Features

- Plant information endpoint using Google Gemini API
- CORS enabled for frontend integration
- Error handling and structured responses

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## API Endpoints

### POST /functions/v1/get-plant-info
Get detailed information about a medicinal plant using AI.

**Request Body:**
```json
{
  "plantName": "Tulsi"
}
```

**Response:**
```json
{
  "botanicalName": "Ocimum tenuiflorum",
  "family": "Lamiaceae",
  "description": "...",
  "uses": ["..."],
  "cultivation": "...",
  "properties": ["..."],
  "precautions": "..."
}
```

### GET /health
Health check endpoint that returns server status.

## Environment Variables

- `PORT`: Server port (default: 3002)

## Running with Frontend

From the project root:
```bash
# Terminal 1 - Start backend server
node server/index.js

# Terminal 2 - Start frontend
npm run dev
```

Or use the combined command:
```bash
npm run start:all
```
