# webpack-apollo-server

Starter kit for apollo server using webpack and typescript

What does it include:
----
    1. exported schema as example for GraphQL Schema
    2. Working Apollo Server (webpack + tslint + tsloader)
    3. Typescript 2.0.0 => ES6

Notes
----
Please note that you will need to rename the library name in some files:

    1. package.json (ofcourse ;))

Useful commands:
----
    npm run prebuild   - install NPM dependancies
    npm run build      - build the library files
    npm start          - Start the server

How to run it:
----
```bash
	npm start
```

Files explained:
----
    1. src                     - directory is used for typescript code that is part of the project
        1a. modules/main.ts    - Main server file. (Starting Apollo server)
        1b. modules/Schema.ts  - Basic Schema to test Apollo server is functional
    3. package.json            - file is used to describe the library
    4. tsconfig.json           - configuration file for the library compilation
    6. tslint.json             - configuration file for the linter
    7. typings.json            - typings needed for the server
    8. webpack.config.js       - configuration file of the compilation automation process for the library

Output files explained:
----
    1. node_modules - directory npm creates with all the dependencies of the module (result of npm install)
    2. dist         - directory contains the compiled server (javascript)
