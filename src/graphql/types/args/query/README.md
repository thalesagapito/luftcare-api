# ArgsTypes

When a query only receives 1 argument it's ok to use a single `@Arg()` without creating an **ArgsType**.  
However, when this is not the case, **ArgsTypes** **MUST** be used.  
An example is the `login` query from `AuthResolver`:

```js
@Mutation(() => TokenSet)
async login(@Arg('loginData') loginData: LoginInput): Promise<TokenSet> {
  const { email, password } = loginData;

  return getTokenSetFromLoginData(email, password);
}
```

Most of the time, **ArgsTypes** should implement one or more **Types**. This helps matching the types of the **ArgsType** fields and the original
**Type**, in the following case, `User`:

```js
@ArgsType()
export default class LoginInput implements Partial<User> {
  ...
}
```
