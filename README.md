
# Music Festival API - README

task: entries sorted alphabetically.

##### [API Document with Swagger ](http://localhost:3000/api/document#/default/FestivalsController_getMusicFestivalsData) 
###### **** please setup project and run for API documentation ****


## Docker Setup
##### Build the Docker image :
        docker build -t music-festival-api .
##### Run the Docker container :
        docker run -p 3000:3000 music-festival-api

## Logging

#### Console Logging

Console logging is enabled by default during development. It will display log messages on the console with different log levels (e.g., info, debug, warn, error) in different colors for better visibility.

#### Text File Logging

Text file logging is also configured to store log messages in a .txt file. The log file is created in the logs directory at the root of the project. Log files are rotated when the file size reaches 10MB, and up to 5 log files are retained.

## Multiple Environments

The application can be configured to run in different environments (development, staging, production) using environment variables.

#### Configuration Files
Create configuration files for each environment with the required settings. The configuration files should be named as follows:

    development.env for development environment
    staging.env for staging environment
    production.env for production environment

Each configuration file should contain environment-specific variables. For example, in development.env:

    PORT=3000
    LOG_LEVEL=debug

### Run as Different Environments

To run the application in a specific environment, set the NODE_ENV environment variable accordingly when starting the application.

For example, to run as development:

    NODE_ENV=development npm run start

For staging:

    NODE_ENV=staging npm run start

And for production:

    NODE_ENV=production npm run start


## Manual Setup and Running

#### Install dependencies:
    npm install
#### Start the application in development mode:
    npm start:dev
#### To run the application as production, use:
    npm start

##### To run as other environments, set the NODE_ENV environment variable as shown in the "Run as Different Environments" section.

## Unit Tests

#### Test results are formatted as expected, using jestjs
###### for testing run
    npm test
###### Test Cases
    festivals.controller.spec.ts
        Test Case 1 : Check controller status
        Test Case 2 : Check controller getMusicFestivalsData function is returning data
        Test Case 3 : Check controller getMusicFestivalsData function return data is formatted (sorted alphabetically) or not
        Test Case 4 : Check controller formatData function , data formatting function (sorted alphabetically) is working properly

    festivals.service.spec.ts
        Test Case 1 : check service getFestivalsData function is returning data

