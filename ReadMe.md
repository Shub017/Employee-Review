# Employee Review System

## Overview
This is the README file for the Employee Review System project. It includes information about the folder structure, dependencies, and how to start the project.

### Project Structure
|-- employee-review-system
    |-- DataBase
        |-- mongoDB.js
    |-- assignReview
        |--assignReviewSchema
            |--assignReview.model.js
        |-- assignReview.controller.js
        |-- assignReview.repository.js
        |-- assignReview.router.js
    |-- performanceReview
        |--performanceRevie
            |--review.schema.js
        |-- review.controller.js
        |-- review.repository.js
        |-- review.router.js
    |-- user
        |--userSchema
            |--user.schema.js
        |-- user.controller.js
        |-- user.repository.js
        |-- user.router.js
    |-- views
        |-- index.ejs
        |-- Employees.ejs
    |-- public
        |-- (static files go here)
    |-- .env
    |-- index.js
    |-- package.json
    |-- README.md


### Getting Started
Follow the steps below to set up and run the Employee Review System project:

cd employee-review-system
Install dependencies:

npm install
    Create a .env file in the project root and add necessary environment variables:

env:
    PORT=3000
    MONGODB_URI=your-mongodb-uri
    Start the project:

npm start:
    Open a web browser and go to http://localhost:3000 to access the Employee Review System.

## Project Details
    ->The project uses Express.js for the server.
    
    ->MongoDB is used as the database, and the connection details are specified in the .env file.
    
    ->The project has three main modules: user, performanceReview, and assignReview, each with its own repository, controller, and router.
    
    ->Static files (CSS, JS, etc.) are served from the public directory.
    
    ->EJS is used as the view engine, and layout files are located in the views directory.
    
    Notes:
        
        ->Make sure to replace your-mongodb-uri with your actual MongoDB connection URI.
        
        ->Customize the project as needed for your specific requirements.
        
        ->Feel free to explore the code in the respective directories and modify it based on your needs. If you have any questions or issues, please refer to the documentations.
