# ts-type-generator

![build](https://github.com/pghalliday/ts-type-generator/workflows/build/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/pghalliday/ts-type-generator/badge.svg?branch=main)](https://coveralls.io/github/pghalliday/ats-type-generatorbranch=main)

A tool for generating TypeScript types with associated validators and relational resolvers.

The main use case for this library is to generate data types to match structures that might be loaded from JSON sources. The problem being that `JSON.parse` will always return an `any` and as such this should be type guarded to bring it into our nice type safe world.

Unfortunately writing type guards is a chore and generating type guards by analysing source code is problematic. To get around this `ts-type-generator` provides a DSL to define types as code that can then be used to generate the type and validation source code together as a build step.

Additionally, it provides a special `ReferenceType` to create relationships between collections of typed data and generates a `Resolver` class to check and resolve those references.

## Usage

Install into your `devDependencies`:

```shell
npm install --save-dev @pghalliday/ts-type-generator
```

Then to get started create a `./types/src` directory and add an `index.ts` file to it with the following content:

```typescript
// ./types/index.ts

import {resolve} from "path";
import {TsTypeGenerator} from "@pghalliday/ts-type-generator";

new TsTypeGenerator()
    // TODO: add types here
    .generate(resolve(__dirname, "../lib"));
```

You can then run this using `ts-node`:

```shell
ts-node ./types/types/index.ts.mustache
```

As it stands this will not create any types or type guards as none have been defined. However, it will create a `./types/lib` directory and copy in some utility libraries, etc.

### Adding types

Types are added to the generator using the `type` chain method. A number of different type constructs can be created, although at the moment they are limited to purely data types (no functions). This is because type guarding function signatures is hard, and the focus is on data types such as those that might be parsed from JSON input.

As an example we will add a couple of interfaces to our example code from above:

```typescript
import {
    TsTypeGenerator,
    StructType,
    stringType,
} from "@pghalliday/ts-type-generator";

new TsTypeGenerator()
    .type(
        new StructType("User")
            .property("id", stringType)
            .property("displayName", stringType)
    )
    .type(
        new StructType("Message")
            .property("userId", stringType)
            .property("message", stringType)
    )
    .generate(resolve(__dirname, "../lib"));
```

This will generate 2 types equivalent to this:

```typescript
export type User = {
    id: string,
    displayName: string,
}

export type Message = {
    userId: string,
    message: string,
}
```

It will also generate 2 validator functions with the following signatures:

```typescript
export function validateUser(value: unknown): User | ValidationError {
    ...
}

export function validateMessage(value: unknown): Message | ValidationError {
    ...
}
```

You can import them like this:

```typescript
import {Validated, ValidationError} from "./types/lib";
const {User, validateUser, Message, validateMessage} = Validated;
```

So what's happening here. Well the main thing to know is that any number of types can be added and each type, and the types they depend on, will be added to the generated types modules.

Types all have the same base `Type` class, so they can be re-used wherever a type is required.

Some primitive types are provided as constants. Here we are using the `stringType` as an alias for `string`. We have to use an instance of `Type` so this has been created as a singleton for convenience.

### Reference types

So far we have defined a couple of types, and we have a way to pass in some unknown data and validate it safely to create some properly typed data. However we have defined 2 types that are related. The `userId` on the `Message` is meant to be a reference to the `id` property on the `User` type.

The `ReferenceType` class can be used to enforce this relationship between collections of `User` and `Message` structures. We can change the definitions as follows:

```typescript
import {
    TsTypeGenerator,
    StructType,
    ReferenceType,
    stringType,
} from "@pghalliday/ts-type-generator";

const userType = new StructType("User")
    .property("id", stringType)
    .property("displayName", string);

const usersReference = new ReferenceType("Users", userType);

const messageType = new StructType("Message")
    .property("id", string)
    .property("userId", usersReference)
    .property("message", stringType);

const messagesReference = new ReferenceType("Messages", messageType);

new TsTypeGenerator()
    .type(usersReference)
    .type(messagesReference)
    .generate(resolve(__dirname, "../lib"));
}
```

Note that we created a `ReferenceType` for each collection. This is required even for the `Message` struct because we want our generated code to support collections of messages too (even if we don't have references to them... yet).

Also note that we have not specified a field that defines the reference key. Obviously we will want to use the user `id` property but in fact the generated code does not care what key you use, so this is left as an implementation detail for the collection based validation and resolution code.

So, given collections of users and messages how do we validate the data and resolve the references. Well, the call to `generate` also creates 2 classes `Validator` and `Resolver` and this is how you would use them:

```typescript
import {
    Validator,
    Resolver,
    References,
} from "./types/lib";
import {
    readdir,
    readFile,
} from "fs/promises";
import {
    join,
    basename,
} from "path";

const USERS_DIR = "./users";
const MESSAGES_DIR = "./messages";

async function getResolvedReferences(): Promise<{
    validationErrors: References.ValidationErrors,
    resolutionErrors: References.ResolutionErrors,
    resolvedReferences: References.ResolvedReferences,
}> {
    const validationErrors = References.initValidationErrors();
    const resolutionErrors = References.initResolutionErrors();
    const resolvedReferences = References.initResolvedReferences();
    const validator = new Validator();
    const resolver = new Resolver();
    
    // pipe the validated structures into the resolver
    validator.success.on(data => resolver.add(data));
    validator.failure.on(({reference, key, error}) => {
        // store error for later
        //
        // You could also do some logging here
        validationErrors[reference][key] = error;
    });
    resolver.success.on(({reference, key, instance}) => {
        // store the resolved instance
        //
        // Note that at this point the references may not be
        // fully resolved and you should store them and wait
        // until the resolve function below has completed
        resolvedReferences[reference][key] = instance;
    })
    resolver.failure.on(({reference, key, error}) => {
        // store error for later
        //
        // You could also do some logging here
        resolutionErrors[reference][key] = error;
    });

    // Loop through the raw data and pass it to the validator
    // in this case we can load it from JSON files that use the ids
    // as file names. The validated instances will be piped into the
    // resolver as we go.
    const userFiles = await readdir(USERS_DIR);
    for (const userFile of userFiles) {
        const path = join(USERS_DIR, userFile);
        const id = basename(userFile, ".json"); // get the ID from the filename
        const json = await readFile(path).toString();
        validator.validate({
            reference: "Users",
            key: id,
            data: JSON.parse(json),
        });
    }
    
    const messageFiles = await readdir(MESSAGES_DIR);
    for (const messageFile of messageFiles) {
        const path = join(MESSAGES_DIR, messageFile);
        const id = basename(messageFile, ".json"); // get the ID from the filename
        const json = await readFile(path).toString();
        validator.validate({
            reference: "Messages",
            key: id,
            data: JSON.parse(json),
        });
    }
    
    // Only resolve the references after all the validated instances
    // have been added
    resolver.resolve();
    
    return {
        validationErrors,
        resolutionErrors,
        resolvedReferences,
    }
}

// Load and resolve all the JSON files
getResolvedReferences()
.then(({validationErrors, resolutionErrors, resolvedReferences}) => {
    // handle the errors and the resolved references as needed
});

```

### Type constants

The following `Type` constants are provided as convenience primitive types:

- `stringType` - the `string` primitive
- `numberType` - the `number` primitive
- `booleanType` - the `boolean` primitive

The following `Type` constants are provided as convenience primitive collection instances:

- `stringListType` - for lists of `string` primitives
- `stringDictionaryType` - for dictionaries of `string` primitives
- `numberListType` - for lists of `number` primitives
- `numberDictionaryType` - for dictionaries of `number` primitives
- `booleanListType` - for lists of `boolean` primitives
- `booleanDictionaryType` - for dictionaries of `boolean` primitives

### Type classes

#### `StructType`

To define an interface type.

```typescript
new StructType(NAME)
    .property(PROPERTY_NAME, TYPE)
    .property(PROPERTY_NAME, TYPE)
    ...
```

#### `UnionType`

To define a union type.

```typescript
new UnionType(NAME)
    .type(TYPE)
    .type(TYPE)
    ...
```

#### `ListType`

To define a list type.

```typescript
new ListType(NAME, TYPE)
```

#### `DictionaryType`

To define a dictionary type.

```typescript
new DictionaryType(NAME, TYPE)
```

#### `LiteralType`

Literal types only support literal primitives and are useful in union types to specify a limited list of valid values.

To define a `string` literal type.

```typescript
new LiteralType<string>(NAME, VALUE)
```

To define a `number` literal type.

```typescript
new LiteralType<number>(NAME, VALUE)
```

To define a `string` literal type.

```typescript
new LiteralType<string>(NAME, VALUE)
```

#### `ReferenceType`

To define a reference type.

```typescript
new ReferenceType(NAME, TYPE)
```

Where `NAME` will be used as the name of the referenced collection.

## Contributing

Run unit tests and build before pushing/opening a pull request.

Start [Alarmist](https://github.com/pghalliday/alarmist) to lint, run tests, build and run integration tests on file changes:

```shell
npm start
```

Lint, run tests, build and run integration tests on demand:

```shell
npm run integration
```
