import { WebSocketServer } from "ws";

const broadcast = (data: any, wss: WebSocketServer) => {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
};
export default broadcast;