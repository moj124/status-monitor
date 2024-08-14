# Status Monitor

A ReactJS + TS, Express + TS monolith applicaton that houses the server and client. Displays a real time status dashboard for each region from an API call. 

## Installation

```bash
$ make install
```

## Running the app

```bash
# development
$ npm run start:server
$ npm run start

# using docker
$ make build
$ make dev
```

Open at [http://localhost:8080/](http://localhost:8080/)

## Testing

### Jest

To run jest tests of individual util functions.
```bash
$ make test
```

### Cypress

To run cypress GUI tests of react components.
```bash
$ npm run test:cypress:open
```

## Deployment with Fly.io
Requires `flyctl` can be installed via [https://fly.io/docs/flyctl/install/](https://fly.io/docs/flyctl/install/).

To deploy changes to the server and client.
```bash
$ make deploy
```

To deploy changes to the server.
```bash
$ npm run deploy:server
```

To deploy changes to the client.
```bash
$ npm run deploy
```

