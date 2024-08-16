import express from 'express';
import { WebSocket, WebSocketServer } from 'ws';
import cors from 'cors';
import URL_ENDPOINTS, { POLLING_INTERVAL } from './utils/constants';
import { config } from 'dotenv';
import fetchStatus from './utils/fetchStatus';
import { createServer } from 'http';

config()

const app = express();

app.use(cors());

const server = createServer();
const wss = new WebSocketServer({ server });

let currentResponse: Awaited<ReturnType<typeof fetchStatus>>;

const broadcast = (data: any, clients: Set<WebSocket>) => {
  clients.forEach((client: WebSocket) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

// Periodically fetch data and broadcast
setInterval(async () => {
  try {
    const statuses = await fetchStatus(URL_ENDPOINTS);
    currentResponse = statuses;
    broadcast(statuses, wss.clients);
  } catch (error) {
    console.error('Error fetching status:', error);
  }
}, POLLING_INTERVAL);

server.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(`Server is running on ${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_SERVER_PORT}`);
});

wss.on('connection', (ws) => {
  if(!currentResponse) return;
  ws.send(JSON.stringify(currentResponse));
});
