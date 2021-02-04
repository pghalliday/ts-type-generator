# ts-type-generator

![build](https://github.com/pghalliday/ts-type-generator/workflows/build/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/pghalliday/ts-type-generator/badge.svg?branch=main)](https://coveralls.io/github/pghalliday/ats-type-generatorbranch=main)

A tool for generating TypeScript interfaces and types with associated type guards.

The main use case for this library is to generate data interfaces to match structures that might be loaded from JSON sources. The problem being that `JSON.parse` will always return an `any` and as such this should be type guarded to bring it into our nice type safe world.

Unfortunately writing type guards is a chore and generating type guards by analysing source code is problematic. To get around this `ts-type-generator` provides a DSL to define interfaces and types as code that can then be used to generate the type and type guard source code together as a build step.

## Usage

Install into your `devDependencies`:

```shell
npm install --save-dev @pghalliday/ts-type-generator
```

Then to get started create a `./types/src` directory and add an `index.ts` file to it with the following content:

```typescript
// ./types/src/index.ts

import {resolve} from "path";
import {TsTypeGenerator} from "@pghalliday/ts-type-generator";

new TsTypeGenerator()
    // TODO: add types here
    .generate(resolve(__dirname, "../lib"));
```

You can then run this using `ts-node`:

```shell
ts-node ./types/src/index.ts
```

As it stands this will not create any types or type guards as none have been defined. However, it will create a `./types/lib` directory and copy in some library files for use in generated type files.

### Adding types

Types are added to the generator using the `type` chain method. A number of different type constructs can be created, although at the moment they are limited to purely data types (no functions). This is because type guarding function signatures is hard, and the focus is on data types such as those that might be parsed from JSON input.

As an example we will add a couple of interfaces to our example code from above:

```typescript
import {
    TsTypeGenerator,
    InterfaceType,
    stringType,
} from "@pghalliday/ts-type-generator";

new TsTypeGenerator()
    .type(
        new InterfaceType("User")
            .property("id", stringType)
            .property("displayName", stringType)
    )
    .type(
        new InterfaceType("Message")
            .property("userId", stringType)
            .property("message", stringType)
    )
    .generate(resolve(__dirname, "../lib"));
```

This will generate 2 types equivalent to this:

```typescript
export interface User {
    id: string;
    displayName: string;
}

export interface Message {
    userId: string;
    message: string;
}
```

It will also generate 2 type guards with the following signatures:

```typescript
export function isUser(value: unknown): value is User {
    ...
}

export function isMessage(value: unknown): value is Message {
    ...
}
```

These will be generated in their own files under the output `lib` directory. As such you can import them like this:

```typescript
import {User, isUser} from './types/lib/User'
import {Message, isMessage} from './types/lib/User'
```

So what's happening here. Well the main thing to know is that any number of types can be added and each type and the types they depend on will result in a generated type file.

Types all have the same base `Type` class, so they can be used wherever a type is required.

Some primitive types are provided as constants. Here we are using the `stringType` as an alias for `string`. We have to use an instance of `Type` so this has been created as a singleton. Using the `stringType` will result in a `String` type file being created with the following content:

```typescript
export type StringTypeTs = string;

export function isStringType(value: unknown): value is StringTypeTs {
    ...
}
```

### Anonymous types

When defining types and sub types, you may not always care what they're called. As such, type names are always optional. As it happens, when the type file is generated, a name will also be generated but this is just an implementation detail.

For example to create a more complex structure where we only care about the top level type name:

```typescript
import {stringType} from "./stringType";

new TsTypeGenerator()
    .type(
        new InterfaceType("User")
            .property("id", stringType)
            .property(
                "name",
                new Interface()
                    .property("firstName", stringType)
                    .property("lastName", stringType)
            )
    )
    .generate(resolve(__dirname, "../lib"));
```

Which will create a named type and type guard equivalent to:

```typescript
export interface User {
    id: string;
    name: {
        firstName: string;
        lastName: string;
    }
}

export function isUser(value: unknown): value is User {
    ...
}
```

### Type constants

The following `Type` constants are provided as primitive types:

- `stringType` - the `string` primitive
- `numberType` - the `number` primitive
- `booleanType` - the `boolean` primitive

The following are provided as convenience `Type` instances:

- `stringArrayType` - for arrays of `string` primitives
- `stringMapType` - for maps of `string` primitives
- `numberArrayType` - for arrays of `number` primitives
- `numberMapType` - for maps of `number` primitives
- `booleanArrayType` - for arrays of `boolean` primitives
- `booleanMapType` - for maps of `boolean` primitives

NB. Only maps keyed by `string` are supported.

### Type classes

#### `InterfaceType`

To define an interface type.

```typescript
new InterfaceType(NAME?)
    .property(PROPERTY_NAME, TYPE)
    .property(PROPERTY_NAME, TYPE)
    ...
```

#### `UnionType`

To define a union type.

```typescript
new UnionType(NAME?)
    .type(TYPE)
    .type(TYPE)
    ...
```

#### `ArrayType`

To define an array type.

```typescript
new ArrayType(TYPE, NAME?)
```

#### `MapType`

To define a map type.

```typescript
new MapType(TYPE, NAME?)
```

NB. Only `string` keys are supported for maps.

#### `StringLiteralType`

To define a `string` literal type.

```typescript
new StringLiteralType(VALUE, NAME?)
```

Literal types are useful in union types to specify a limited list of valid values.

#### `NumberLiteralType`

To define a `number` literal type.

```typescript
new NumberLiteralType(VALUE, NAME?)
```

Literal types are useful in union types to specify a limited list of valid values.

#### `BooleanLiteralType`

To define a `boolean` literal type.

```typescript
new BooleanLiteralType(VALUE, NAME?)
```

Literal types are useful in union types to specify a limited list of valid values.

## Contributing

Run unit tests and build before pushing/opening a pull request.

Start [Alarmist](https://github.com/pghalliday/alarmist) to lint, run tests and build on file changes:

```shell
npm start
```

Lint, run tests and build on demand:

```shell
npm run build
```
