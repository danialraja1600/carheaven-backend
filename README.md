Car Heaven REST API

- Description
  - An SPA application called Car Heaven created with the MERN stack.
  - The app provides the user a way to view cars on sale and also upcoming events.
  - An account is needed to sell a car and to publish upcoming events.
  - This app consists of two sides, client(frontend) and server(backend).

This repo implements the backend REST API (built in Express + MongoDB).
A repository for with the frontend (React App) can be found here: https://github.com/danialraja1600/carheaven-frontend

Instructions to run this app in your computer
 - clone the repository
 - install dependencies using 'npm install'
 - create a .env file with the following environment variables: 
ORIGIN, with the location of your frontend app 
TOKEN_SECRET: used to sign auth tokens 
 - run the application using npm run dev or npm start


API Endpoints:

- Auth
POST - /auth/signup - (Create an account)
POST - /auth/login - (Login)
GET - /auth/verify - Authorization: Bearer <jwt> - (Verify jwt)


- Cars
GET - /api/cars/getCars - (Get all cars)
POST - /api/cars/createCar - Authorization: Bearer <jwt> - (Create a car)
GET - /api/cars/:carId - Authorization: Bearer <jwt> - (Get car details)
PUT - /api/cars/:carId - Authorization: Bearer <jwt> - (Update car)
DELETE - /api/cars/:carId - Authorization: Bearer <jwt> - (Delete car)


- Events
GET - /api/events/getEvents - (Get all events)
POST - /api/events/events - Authorization: Bearer <jwt> - (Create a event)
GET - /api/events/:eventId - Authorization: Bearer <jwt> - (Get event details)
PUT - /api/events/:eventId - Authorization: Bearer <jwt> - (Update event)
DELETE - /api/events/:eventId - Authorization: Bearer <jwt> - (Delete event)




Demo:
https://iridescent-douhua-e2b5ec.netlify.app/
https://car-heaven.adaptable.app/
# carheaven-backend
