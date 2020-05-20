# InputTypes

When a mutation only receives 1 argument it's ok to use a single `@Arg()` without creating an **InputType**.  
However, when this is not the case, **InputTypes** **MUST** be used.  
An example is the `login` mutation from `AuthResolver`:

```js
@Mutation(() => TokenSet)
async login(@Arg('loginData') loginData: LoginInput): Promise<TokenSet> {
  const { email, password } = loginData;

  return getTokenSetFromLoginData(email, password);
}
```

Most of the time, **InputTypes** should implement one or more **Types**. This helps matching the types of the **InputType** fields and the original
**Type**, in the following case, `User`:

```js
@InputType()
export default class LoginInput implements Partial<User> {
  ...
}
```
