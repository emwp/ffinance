# Friday Finance Full-Stack Test

This is my solution to the Friday Finance [Full-Stack Developer Challenge](https://github.com/fridayfinance/challenges/tree/main/dev-fullstack)

## Running the project

#### Requisites:

- Cloning the repository
- Have docker running
- Node version 14 or higher
- yarn

```bash
  yarn docker:build:run
```

This command will run yarn, create a docker network, build the docker files and finally start the containers.

Now you should have the containers for the Nuxt Frontend App, Apollo-Server Backend App and postgres running.

#### After the containers are running:

```bash
  yarn prepare:db
```

This command will run prisma migrate and prisma seed with the provided data from the challenge.

The transactions csv is quite large (over 339k records), it may take some time to finish seeding.

![](/assets/seeding.png)

That's it! You can access the Nuxt Frontend at http://localhost:3000

## Stack Used:

#### Frontend:

- Nuxt/Vue
- Tailwind
- Apollo Client, with @nuxtjs/apollo.

The choices were trying to follow the tech stack that Friday Finance uses.

Regarding Vue/Nuxt, I have been working mainly with React and had pretty limited experience with Vue prior to this challenge, so I might have written Vue in some kinda of React.js patterns.

Regarding the choice of @nuxtjs/apollo, it integrates well with the GraphQL Codegen library, which I really like to use to have type-safe GraphQL queries, mutations and data. With the GraphQL codegen watch command running, whenever a query/mutation is written it will pick up the types for it by introspecting the Apollo-Server schema.

#### Backend/DB:

- Node.js
- Apollo-Server
- GraphQL
- Prisma
- PostgreSQL

Again, trying to follow as much as the suggested tech stack.

Prisma Schema was created as required by the task, with Category, Account and Transaction models. Both Category and Account have one-to-many relation with Transaction model, so in the DB, a transaction will have categoryId and accountId foreign keys.

From GraphQL side, used graphQL codegen again to generate types from the GraphQL Schema. Those types help make sure that the GraphQL resolvers are correctly typed. Added zod library to validate the inputs and return nicer errors in case of invalid input parameters.

#### Testing & Tools:

- Eslint and Prettier to enforce some rules.
- Typescript
- Cypress for E2E testing. I covered most of the challenge requirements with cypress tests.
  - I am using the testing-library plugin for nicer selectors with Cypress. Testing-Library is my go to tool for unit/integration tests with Jest/Vitest and their selectors are much simpler to use.
  - Using cy.log() to document the part of the test currently running. This also makes your life easier when E2E tests break during CI, you can check the cy.log() and know exactly where the problem is happening.
  - Example of test cases:
    - A transaction can be filtered by Account/Category/Date as well as with the free text input field.
    - Sorting by date.
    - Cursor based pagination.
    - Updating a category and making sure that all other transactions with this categoryId FK are also updated with the new color.

You can run Cypress locally with the following command:

```bash
  npx cypress open
```

I've prepared a GIF showing tests running:

![](/assets/cypress.gif)
