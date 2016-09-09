# webpack-apollo-server

[![Build Status](https://travis-ci.org/DxCx/webpack-apollo-server.svg?branch=master)](https://travis-ci.org/DxCx/webpack-apollo-server) [![Coverage Status](https://coveralls.io/repos/github/DxCx/webpack-apollo-server/badge.svg?branch=master)](https://coveralls.io/github/DxCx/webpack-apollo-server?branch=master)

Starter kit for apollo server using webpack and typescript

What does it include:
----
    1. exported schema as example for GraphQL Schema
    2. Working Apollo Server (webpack + tslint + tsloader)
    3. Typescript 2.0.0 => ES6
    4. Dockerfile to make the apollo-server a container.
    5. unit testing (mocha-webpack+chai) + coverage report (mocha-istanbul-spec+istanbul).

Notes
----
Please note that you will need to rename the library name in some files:

    1. package.json (ofcourse ;))

Useful commands:
----
    npm run prebuild   - install NPM dependancies
    npm run build      - build the library files
    npm start          - Start the server
    npm test           - run tests once
    npm run test:watch - run tests in watchmode (Useful for development)
    npm run test:growl - run tests in watchmode with growl notification (even more useful for development)

How to run it:
----
```bash
    npm start
```

Files explained:
----
    1. src                         - directory is used for typescript code that is part of the project
        1a. modules/main.ts        - Main server file. (Starting Apollo server)
        1b. modules/schema.ts      - Basic Schema to test Apollo server is functional
        1c. modules/schema.spec.ts - Basic test for schema.
        1c. modules/main.test.ts   - Main for tests runner.
    3. package.json                - file is used to describe the library
    4. tsconfig.json               - configuration file for the library compilation
    6. tslint.json                 - configuration file for the linter
    7. typings.json                - typings needed for the server
    8. webpack.config.js           - configuration file of the compilation automation process for the library
    9. webpack.config.test.js      - configuration file of the compilation when testing
    10. Dockerfile                 - Dockerfile used to describe how to make a container out of apollo server
    11. mocha-webpack.opts         - Options file for mocha-webpack

Output files explained:
----
    1. node_modules - directory npm creates with all the dependencies of the module (result of npm install)
    2. dist         - directory contains the compiled server (javascript)
    3. html-report  - output of npm test, code coverage html report.
