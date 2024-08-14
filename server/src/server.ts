import express from 'express';
import { WebSocket, WebSocketServer } from 'ws';
import cors from 'cors';
import URL_ENDPOINTS, { POLLING_INTERVAL } from './utils/constants';
import { config } from 'dotenv';
import fetchStatus from './utils/fetchStatus';

config()

const app = express();

app.use(cors());

const wss = new WebSocketServer({ noServer: true });

const broadcast = (data: any) => {
  wss.clients.forEach((client: WebSocket) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

// Periodically fetch data and broadcast
setInterval(async () => {
  try {
    const statuses = await fetchStatus(URL_ENDPOINTS);
    broadcast(statuses);
  } catch (error) {
    console.error('Error fetching status:', error);
  }
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
