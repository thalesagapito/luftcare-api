# Use Case

## Purpose

Use case files should be actual use cases of the application. Retrieving a certain user, updating a certain entity, etc.  
They _**MUST**_ contain **business logic** and worry about **validation** and **error catching**. This needs to be this way because these files by
themselves should be able to show how the application works.  
Use case files can be used by a single or multiple Graphql queries/mutations.  
Use cases must be worried about validation and **must** throw descriptive errors _in case things go wrong_. For example, if a use case is to
`giveUserAdminPermission`, and it receives an user's id as a parameter, it should:

1. Use the `UserRepository` to fetch the user with that id
2. Throw an error in case that user can't be found
3. Use the `PermissionRepository` to grant the admin permission
4. Throw an error in case that permission can't be granted
5. Return a response if everything went as planned

## Structure

Use case files are usually straight forwared, after all they must be simple functions:

```js
// npm packages imports
import { npmPackageFunction } from 'my-npm-package';
import { getCustomRepository } from 'typeorm';
// local entity and type imports
import UserRepository from '@/repositories/UserRepository';
import { grantAdminPermission } from '@/repositories/PermissionRepository';
import { GenericUseCaseResponse } from '@/helper-types';

// message constants
const USER_NOT_FOUND_ERROR = 'User not found';
const UNKNOWN_ERROR = 'An unknown error occurred';
const SUCCESS_MESSAGE = 'Success';

export default async function (id: string): Promise<GenericUseCaseResponse> {
    const { findUser } = getCustomRepository(UserRepository);

    const user = await findUser(id);
    if (!user) throw new Error(USER_NOT_FOUND);

    const wasPermissionGranted = grantAdminPermission(user);
    if (!wasPermissionGranted) throw new Error(UNKNOWN_ERROR);

    return { userFriendlyMessage: SUCCESS_MESSAGE };
}
```

## Coding style

> General order

1.  External package imports
2.  Project types and functions imports
3.  Internal types
4.  Exported types
5.  Use case function

> Nitpicking

-   **NO COMMENTS**
-   While still following the general order recommendations, order imports by line length (asc or desc, whichever **looks best**)
