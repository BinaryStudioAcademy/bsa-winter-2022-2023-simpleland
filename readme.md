# SimpleLand

## âšī¸ General Info

This is the repository responsible for SimpleLand's apps.

## đ­ Applications

- [Backend](./backend) â SimpleLand's application backend.

  _To work properly, fill in the **`.env`** file. Use the **`.env.example`** file as an example._

- [Frontend](./frontend) â SimpleLand's application frontend.

  _To work properly, fill in the **`.env`** file. Use the **`.env.example`** file as an example._

- [Shared](./shared) â SimpleLand's application common modules for reuse.

## đ Requirements

- [NodeJS](https://nodejs.org/en/) (18.x.x);
- [NPM](https://www.npmjs.com/) (9.x.x);
- [PostgreSQL](https://www.postgresql.org/) (15.2)
- run **`npx simple-git-hooks`** at the root of the project, before the start (it will set the [pre-commit hook](https://www.npmjs.com/package/simple-git-hooks) for any commits).

## đââī¸ Simple Start

1. **`npm install`** at the root
2. Fill ENVs
3. **`npx simple-git-hooks`** at the root
4. **`cd backend && npm run migrate:dev`**
5. **`cd frontend && npm run start:dev`** then **`cd backend && npm run start:dev`**
6. Enjoy <3

## đ Architecture

### đ Application Schema

TBA

### đŊ DB Schema

```mermaid
erDiagram

  users {
    int id PK
    dateTime created_at
    dateTime updated_at
    varchar email
    text password_hash
    text password_salt
  }

  %% mb user_details should content subscription_end_time col?
  user_details ||--|| users : user_id
  user_details ||--|| subscriptions : subscription_id
  user_details {
    int id PK
    dateTime created_at
    dateTime updated_at
    int user_id FK
    varchar first_name
    varchar last_name
    int subscription_id FK
  }

  sites {
    int id PK
    dateTime created_at
    dateTime updated_at
    varchar name
    varchar published_url "may be null if site was not published to specific domain"
  }

  sections {
    int id PK
    dateTime created_at
    dateTime updated_at
    varchar name
    text content "or would be jsonb map of content applied to section"
  }

  sites_to_sections }|--|| sections : section_id
  sites_to_sections }|--|| sites : site_id
  sites_to_sections {
    int id PK
    dateTime created_at
    dateTime updated_at
    int section_id FK
    int site_id FK
  }

  projects }o--|| users : user_id
  projects {
    int id PK
    dateTime created_at
    dateTime updated_at
    varchar name
    int user_id FK
  }

  projects_sites }|--|| projects : project_id
  projects_sites }|--|| sites : site_id
  projects_sites {
    int id PK
    dateTime created_at
    dateTime updated_at
    int project_id FK
    int site_id FK
  }

  subscriptions {
    int id PK
    dateTime created_at
    dateTime updated_at
    varchar name
    float price "would be null for free plan?"
  }

```

### đ Backend

- [Fastify](https://www.fastify.io/) â a backend framework.
- [Knex](https://knexjs.org/) â a query builder.
- [Objection](https://vincit.github.io/objection.js/) â an ORM.

### đ Frontend

- [React](https://reactjs.org/) â a frontend library.
- [Redux](https://redux.js.org/) + [Redux Toolkit](https://redux-toolkit.js.org/) â a state manager.

### đĨ Code quality

- [simple-git-hooks](https://www.npmjs.com/package/simple-git-hooks) â a tool that lets you easily manage git hooks.
- [lint-staged](https://www.npmjs.com/package/lint-staged) â run linters on git staged files.
- [dangerjs](https://danger.systems/js/) â automate common code review chores.
- [commitlint](https://commitlint.js.org/) â helps your team adhere to a commit convention.
- [editorconfig](https://editorconfig.org/) â helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.
- [prettier](https://prettier.io/) â an opinionated code formatter.
- [ls-lint](https://ls-lint.org/) â file and directory name linter.
- [eslint](https://eslint.org/) â find problems in your JS code.
- [stylelint](https://stylelint.io/) â find and fix problems in your CSS code.

## đ§âđģ CI

### đ Git

#### đ Pull Request flow

```
<project-prefix>-<issue-number>: <ticket-title>
```

##### Example

- `sl-5: Add Clinician Dashboard`

#### đŗ Branch flow

```
<type>/<project-prefix>-<issue-number>-<short-desc>
```

##### Types

- task
- fix

##### Examples

- `task/sl-5-add-clinician-dashboard`
- `task/sl-12-add-clinician-flow`
- `fix/sl-16-fix-clinician-flow`

#### đ Commit flow

```
<project-prefix>-<issue-number>: <modifier> <description>
```

##### Modifiers

- `+` (add)
- `*` (edit)
- `-` (remove)

##### Examples

- `sl-5: + title for dashboard`
- `sl-12: * dashboard title`
- `sl-16: - dashboard title`

## đĻ CD

[Handled](.github/workflows/cd.yml) by [GitHub Actions](https://docs.github.com/en/actions).
