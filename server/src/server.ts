import express from 'express';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import URL_ENDPOINTS, { POLLING_INTERVAL } from './utils/constants';
import { config } from 'dotenv';
import axios from 'axios';

config()

const app = express();

app.use(cors());

const wss = new WebSocketServer({ noServer: true });

const broadcast = (data: any) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

const fetchStatus = async (url_endpoints: string[]) => {
  const statusPromises = url_endpoints.map(async (endpoint) => {
    try {
      const response = await axios.get(endpoint);
      return { endpoint, data: response.data };
    } catch (error) {
      return { endpoint, error: (error as {message: string}).message };
    }
  });

  return Promise.all(statusPromises);
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
