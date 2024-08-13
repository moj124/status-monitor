import express from 'express';
import { WebSocketServer } from 'ws';
import axios from 'axios';
import URL_ENDPOINTS, { POLLING_INTERVAL } from './constants';
import { config } from 'dotenv';

config()

const app = express();

const wss = new WebSocketServer({ noServer: true });

async function fetchStatus() {
  const statusPromises = URL_ENDPOINTS.map(async (endpoint) => {
    try {
      const response = await axios.get(endpoint);
      return { endpoint, data: response.data };
    } catch (error) {
      return { endpoint, error: (error as {message: string}).message };
    }
  });

  return Promise.all(statusPromises);
}

// Broadcast data to all connected clients
function broadcast(data: any) {
  wss.clients.forEach(client => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(data));
    }
  });
}

// Periodically fetch data and broadcast
setInterval(async () => {
  const statuses = await fetchStatus();
  broadcast(statuses);
}, POLLING_INTERVAL);

const server = app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.SERVER_PORT}`);
});

// HTTP server to handle upgrades to WebSocket
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});
