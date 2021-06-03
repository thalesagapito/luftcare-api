# Luftcare API

Steps to run this project:

1. Run `yarn` command
2. Run `docker-compose up` command
3. Run `yarn start` command

# Design decisions and reasoning

1. Postgres docker image: Works well with TypeORM, performance comparable to MySQL.
2. TypeORM: Works well with Typescript and reduces our workload on the database layer.
3. Graphql and type-graphql: We benefit from a Graphql API since we have different clients in typed languages using graphql-codegen. And since
   we're also using TypeORM, type-graphql is a great choice.

# Guidelines for consuming

1. Use as little requests as possible. Graphql can execute multiple queries and mutations in the same request, this is to be taken advantage of. Every
   request requires a DB read to retrieve the user from the token.

# Known errors

When trying to order by in a query, if you try to order by a field that doesn't exist you might get a
`Cannot read property 'databaseName' of undefined` error. This is a TypeORM error and it should be dealt with in the next release. Alternatively, I'll
deal with it later in userland if the TypeORM devs don't fix it.
