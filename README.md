# Luftcare API

Steps to run this project:

1. Run `yarn` command
2. Run `docker-compose up` command
3. Run `yarn start` command

# Design decisions and reasoning

1. ~~MariaDB~~ Postgres docker image: Works well with TypeORM, performance comparable to MySQL. Not too many concurrent connections means no need for
   a cloud DB with potential for easy scaling.
2. Postgres migration after initially choosing MariaDB: Postgres just has a better binary column support. (Supporting default values, for example)
3. TypeORM: Works well with Typescript and reduces our workload on the database layer.
4. Graphql and type-graphql: We really benefit from a Graphql API since we'll have many different clients. Both mobile apps and websites. And since
   we're also using TypeORM, type-graphql is a great choice.
5. Not serverless: This is not meant to be a huge enterprise project, so an instance is just fine.

# Guidelines for consuming

1. Use as little requests as possible. Graphql can execute multiple queries and mutations in the same request, this is to be taken advantage of. Every
   request requires a DB read to retrieve the user from the token.

# Roadmap

1. Migration for admin user - DOING
2. Authorization
3. First entity with resolvers fully working
4. Auto import entities - DONE
5. Setup env file (.env.example DONE, get config.ts values from .env DONE, add validate env function) - 66% DONE
6. Implement JWT refresh
