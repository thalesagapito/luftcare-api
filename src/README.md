# Root level files

## Enums

Global enums are all defined in the `enums.ts` file, this discourages changing these types constantly and encourages always following the same
style.  
Upon opening the `enums.ts` file you will notice that all enum values are mapped to their equivalent string names. This is because Typescript will by
default assign enum names to int values. Even though this doesn't make a difference on our code, it makes our db values very hard to read.  
Another thing to consider is why we're not using string unions instead of enum types. String unions can become a pain if we ever have to refactor.
Since we need to reference our enum name everytime we try to access it, it becomes easier in case of a refactor.

## Helper types

In the `helpers-types.ts` file we define the types that are helpful to use everywhere inside the application. Just general reusable types or
interfaces that don't belong anywhere specifically.

## Index

The `index.ts` file is responsible for bootstrapping our Graphql server and Typeorm connection. You'll probably never need to change anything in it.

## Modules

Our `modules.d.ts` file is used to augment our types with helpful info. Like typing our **process.env** with our expected .env keys.

## Server

Our `server.ts` file contains all server related configs. Also hardly changed.
