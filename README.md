# webpack-apollo-server

[![npm version](https://badge.fury.io/js/webpack-apollo-server.svg)](https://badge.fury.io/js/webpack-apollo-server) [![Build Status](https://travis-ci.org/DxCx/webpack-apollo-server.svg?branch=master)](https://travis-ci.org/DxCx/webpack-apollo-server) [![Coverage Status](https://coveralls.io/repos/github/DxCx/webpack-apollo-server/badge.svg?branch=master)](https://coveralls.io/github/DxCx/webpack-apollo-server?branch=master)

Starter kit for apollo server using webpack and typescript

What does it include:
----
    1. exported schema as example for GraphQL Schema
    2. Working Apollo Server (webpack + tslint + tsloader)
    3. Typescript 2.0.0 => ES6
    4. Dockerfile to make the apollo-server a container.
    5. unit testing (mocha-webpack+chai) + coverage report (mocha-istanbul-spec+istanbul).
    6. working with graphql-tools
    7. standard-version for auto SemVer.

Notes
----
Please note that you will need to rename the library name in some files:

    1. package.json (ofcourse ;))

Useful commands:
----
    npm run prebuild    - install NPM dependancies
    npm run build       - build the library files (Required for start:watch)
    npm run build:watch - build the library files in watchmode (Useful for development)
    npm start           - Start the server
    npm start:watch     - Start the server in watchmode (Useful for development)
    npm test            - run tests once
    npm run test:watch  - run tests in watchmode (Useful for development)
    npm run test:growl  - run tests in watchmode with growl notification (even more useful for development)
    npm run upver       - runs standard-version to update the server version.

How to run it:
----
```bash
    npm start
```

Files explained:
----
    1. src                         - directory is used for typescript code that is part of the project
        1a. main.ts                - Main server file. (Starting Apollo server)
        1b. main.spec.ts           - Tests file for main
        1c. schema                 - Module used to build schema
            - index.ts             - simple logic to merge all modules into a schema using graphql-tools
            - modules/             - directory for modules to be used with graphql-tools
        1c. schema.spec.ts         - Basic test for schema.
        1c. main.test.ts           - Main for tests runner.
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

The Person type - dynamic/parametrized query and drill down:
----
The person type was added to demonstrate a database like access, parametrized queries, resolvers and drill down.
The data is currently hard coded but simulates a storage. Each person has an id, name and sex. It also has a dynamic
field called matches. For demonstration purposes, this field will retrieve all members of the other sex by using a
resolver.

Since this is a computed field the query can be infinitely nested, for example, try in the graphiql editor this query:

    {
       getPerson(id: "1") {
         id,
         name
         sex
         matches {
           id
           name
           sex
           matches {
             id
             name
             sex
             matches {
               id
               name
               sex
             }
           }
         }
       }
     }

It will return a nested, alternating male/femal results.

To list all persons, use the `persons` query:

    {
      persons {
        id
        name
      }
    }

There is also an example of a mutation - `addPerson(name: String, sex: String)`, to use it:

    mutation {
        addPerson(name: "kuku", sex: "male"){
            id
            name
        }
    }

Note that the query generates a random id and that the added persons are transient,
i.e. not persisted and will be gone once you shut down the server.