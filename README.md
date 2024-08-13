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

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.