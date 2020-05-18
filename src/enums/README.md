# Enums

Global enums are all defined in one single file, this discourages changing these types constantly and encouraging always following the same style.  
Upon opening the `index.ts` enums file you will notice that all enum values are mapped to their equivalent string names. This is because Typescript
will by default assign enum values to int counterparts. Even though this doesn't make a difference on our code, it makes our db values very hard to
read.  
Another thing to consider is why we're not using string unions instead of enum types. String unions can become a pain if we ever have to refactor.
Since we need to reference our enum name everytime we try to access it, it becomes easier in case of a refactor.
