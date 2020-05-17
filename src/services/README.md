# Service

## Purpose

Service files should be a **compilation** of **simple getter-setter** and/or **utility stateless functions**, types can also be exported, but this is
normally not needed and should be given thought.  
Receiving **1 to 3 args**, they should _**NOT**_ contain business logic or worry about validation, authorization and error catching (they need however
to specify their args and return types).  
**Most of the time**, service files will be dedicated to a single entity from the codebase. This is however _**NOT**_ a rule, as there may be
circumstances where it's interesting to create a service for a _Concern_ instead, e.g. `AuthService`.  
**Most of the time**, service functions will be called from `useCases`, but they may also be called directly from `resolvers`. A service function
_**MUST NOT**_ be concerned about their caller.  
Service functions _**MUST NOT**_ call external `services` or `useCases`. If a service function does so much work that it needs to call external
`services` or `useCases`, it shouldn't be a service function in the first place, maybe a `useCase` would be better suited.  
Common functions inside service files are:

-   Database retrieving, e.g. `getUserById`, `getSneakersByColor`
-   Database writing, e.g. `createUser`, `updateSneaker`
-   Utility, e.g. `signAuthenticationToken`

## Structure

Service files should try to follow the same strutucture, it being:

```js
// npm packages imports
import { npmPackageFunction } from 'my-npm-package';
// local entity and type imports
import MyEntity from '@/entities/MyEntity';
import { Nullable } from '@/types/Helpers';

// type declarations (can also be exported)
type MyInternalType<T> = T & { internal: true };
export type MyFunctionArgType = { abc: string };

// normally should not call internal service functions
const replaceABC = (myArg: string): string => myArg.replace('ABC', 'DEF');

// can call internal service functions normally
export const getReplacedNameInEntity = ({ name }: MyEntity): string => replaceABC(name);

export function getEntityWithReplacedName(entity: MyEntity): MyEntity {
    const nameAfterReplace = replaceABC(entity);

    return { ...entity, name: nameAfterReplace };
}
```

## Coding style

> General order

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
