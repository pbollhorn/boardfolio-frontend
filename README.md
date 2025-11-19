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

1. Run this command to make sure dependencies are installed: `npm install`
2. Run the mock server using this command: `npm run backend`
3. The mock server should now be running on http://localhost:4000/

The mock server serves the content of the file `mock-db.json` as a REST API.
You can look in `mock-db.json` to see its data.

Link to JSON mock server from our 3rd semester:
https://dat3cph.github.io/spring2025/toolbox/react/json-server#json-mock-server


## Technologies Used

- React 19
- Bootstrap 5.3.8
- Vite
