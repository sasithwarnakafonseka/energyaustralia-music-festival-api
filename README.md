##How could we dockerize this application?
    *** project setup with docker ***
        * 1) docker build -t music-festival-api .
        * 2) docker run -p 3000:3000 music-festival-api

##Logging is important. Does your solution includes structured information?
    project setup with console logging and txt logging
    txt log path : root/logs (customize path using src/logging.config.ts)

##How do we configure the app to run on multiple environments?
    Create configuration files for each environment : 
          development.env
          staging.env 
          production.env

    run project as development : NODE_ENV=development npm run start
    run project as staging     : NODE_ENV=staging npm run start
    run project as production  : NODE_ENV=production npm run start
    
##Building and running the application should be easy. Have you provided instructions?
    setup and run the application manually
      * 1) npm install #download all dependencies
      * 2) npm start:dev #start for development
      * 3) npm start #run project as production

        * run project based on environment
            run project as development : NODE_ENV=development npm run start
            run project as staging     : NODE_ENV=staging npm run start
            run project as production  : NODE_ENV=production npm run start


    setup and run the application with docker
      * 1) docker build -t music-festival-api .
      * 2) docker run -p 3000:3000 music-festival-api
