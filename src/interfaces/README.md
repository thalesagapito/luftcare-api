# Interfaces

In this folder we put interfaces used by the system. They are mostly from 2 types, EntityFields or Enums.

## EntityFields

EntityFields interfaces are used to register **Concepts** of interfaces and their properties inside our app.  
This means that interfaces do not concern with relationships with other interfaces or (database/graphql)-layer mappings.  
When writing interfaces we should just consider essentially what they are, what they contain by themselves and what we would like to access from them.
Let's take a `UserFields` interface for example, it **should** have:

-   fullName
-   nameToCallBy
-   date of birth
-   age
-   password

Notice that we **do not care** if the age is saved in the database redundantly with the date of birth. Or if a password contains less than 6
characters. Or if a nameToCallBy is the user's first name, or maybe a nickname. This goes on.  
Such concerns should be handled at an **Entity** level. Inside an entity we should define if the age is present on database or is only a graphql
field. We can also make sure the password is only a database field and not accessible by our graphql API.  
Here are things that the `UserFields` interface **should not** have:

-   answeredForms
-   doctor (given that a doctor is another instance of an User)

These are **relations** that an user has with other concepts. They are **not** contained within an user.  
These relations are also concerns that should be handled at an **Entity** level.
