# Jest JWT Auth tests example

> For education only

Jest tests example for a API using JWT authentication (register, login).

* Unit tests
* Integration tests (using supertest package)

Uses ES Modules (import).

## Install

```sh
$ npm install
```

### Database

Generate database schema (migration):

```sh
$ npm run migrate
```

## Usage

You need to set a `JWT_SECRET` environment variable.

```sh
$ npm run dev
```

## Tests

You need to set a `NODE_ENV` environment variable to `test` value.

```sh
$ npm run test
```

Set `maxWorkers=1` to fix `listen EADDRINUSE: address already in use :::3001` error: https://stackoverflow.com/questions/54422849/jest-testing-multiple-test-file-port-3000-already-in-use

### Coverage

```sh
$ npm run coverage
```