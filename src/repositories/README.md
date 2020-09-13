# Repository

## Purpose

Repository files should be a **compilation** of **simple getter-setter** and general **database entity handling functions**, types can also be
exported, but this is normally not needed and should be given thought.  
Receiving **1 to 3 args**, they should _**NOT**_ contain business logic or worry about validation, authorization and error catching (they need however
to specify their args and return types).  
Repository files will **always** be dedicated to a single entity from the codebase.  
**Most of the time**, repository functions will only be called from `useCases`. A repository function _**MUST NOT**_ be concerned about their
caller.  
Repository functions _**MUST NOT**_ call external `useCases`. If a repository function does so much work that it needs to call external `useCases`, it
shouldn't be a repository function in the first place, maybe a `useCase` would be better suited.  
**Still debating if repository functions can call other repositories**  
Common functions inside repository files are:

-   Database retrieving, e.g. `findUserById`, `getResponses`
-   Database writing, e.g. `createUser`, `updateQuestionnaire`

## Structure

Repository files should try to follow the same strutucture, it being:

<!-- TODO UPDATE THIS -->

```js

```

## Coding style

> General order

<!-- TODO UPDATE THIS -->

1.  External package imports
2.  Project types and functions imports
3.  Internal types
4.  Exported types
5.  Internal arrow functions
6.  Internal traditional functions
7.  Exported arrow functions
8.  Exported traditional functions

> Functions, traditional or arrow syntax?

If it's only **one line long**, **under the max-length** and **still readable**, it **can be** an arrow function, everything else should use the
traditional syntax

> Nitpicking

-   **NO COMMENTS**
-   Every function declaration should be spaced with **only 1 line**
-   Function sets (e.g. exported vs non imported) **can be** spaced with 2 lines
-   While still following the general order recommendations, order imports by line length (asc or desc, whichever **looks best**)
