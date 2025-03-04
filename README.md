# Exercise Tracker

[Check it out](https://lliams-exercise-tracker.vercel.app)

## Overview

This project is a full-stack exercise tracker website where users can log their exercises. I made this website has a no-frills alternatives to other apps that have ads/bloated features. The website's frontend is built using React, and the backend is powered by Flask. The application is hosted using Docker on Google Cloud Run, ensuring scalability and reliability. The backend communicates with a PostgreSQL database using Flask SQLAlchemy, and Neon PostgreSQL is used as the database provider.

### Features

    User authentication (sign-up, login, and logout)
    Exercise logging with detailed descriptions
    View past workouts and progress
    RESTful API for interacting with the backend
    Data stored in a PostgreSQL database

### Screenshot
![Example](/public/example.png)
### Tech Stack

    Frontend: React
    Backend: Flask
    Database: Neon PostgreSQL (via Flask SQLAlchemy)
    Containerization: Docker
    Deployment: Google Cloud Run