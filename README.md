# Jest JWT Auth tests example

> For education only

Jest tests example for a API using JWT authentication.

* Unit tests
* Integration tests (using supertest package)

Uses ESModules (import).

## Install

```sh
$ npm install
```

### Database

Generate database schema (migration):

```sh
$ node db/migration.js
```

## Usage

You need to set a `JWT_SECRET` environment variable.

```sh
$ JWT_SECRET=secret node index.js
# Or
$ npm run dev
```

## Tests

```sh
$ npm run test
```

### Coverage

```sh
$ npm run coverage
```