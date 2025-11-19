# BoardFolio Frontend

This repo contains the frontend for our BoardFolio web app.

Link to deployed frontend: https://boardfolio.jcoder.dk

Link to repo for backend: https://github.com/AndyTheDragon/BoardFolio

## Branches and Merge Rules

Each team works in their own dev branch:

- `TEAM-AHORN/Dev` (requires pull request)
- `TEAM-ASK/Dev` (requires pull request)
- `TEAM-BIRK/Dev` (requires pull request)

From these branches can be merged into:

- `dev` (requires pull request)

From `dev` can be merged into:

- `main` (requires pull request)

## Getting Started

Setup instructions on your local computer:

1. Clone down this repo: `git clone https://github.com/pbollhorn/boardfolio-frontend`
2. Go into directory: `cd boardfolio-frontend`
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`
5. View the React app in your browser (should be at http://localhost:5173/)

## Running JSON mock server

If you are developing a frontend feature that makes requests to a backend endpoint
which is not up and running yet, you can use the JSON mock server.

- Run the mock server using this command: `npm run backend`
- The mock server should be running now on http://localhost:4000/
- If not, try this command: `npm install`

## Technologies Used

- React 19
- Bootstrap 5.3.8
- Vite
