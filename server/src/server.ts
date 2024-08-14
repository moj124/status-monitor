import express from 'express';
import { WebSocketServer } from 'ws';
import URL_ENDPOINTS, { POLLING_INTERVAL } from './utils/constants';
import { config } from 'dotenv';
import fetchStatus from './utils/fetchStatus';
import broadcast from './utils/broadcast';

config()

const app = express();

const wss = new WebSocketServer({ noServer: true });

// Periodically fetch data and broadcast
setInterval(async () => {
  const statuses = await fetchStatus(URL_ENDPOINTS);
  broadcast(statuses, wss);
}, POLLING_INTERVAL);

const server = app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(`Server is running on ${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_SERVER_PORT}`);
});

// HTTP server to handle upgrades to WebSocket
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});
