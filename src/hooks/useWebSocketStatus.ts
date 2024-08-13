import { useEffect, useState } from 'react';
import { Response } from '../types/Status';

const useWebSocketStatus = (serverPort: string, hostName: string) => {
  const [statuses, setStatuses] = useState<Response[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const ws = new WebSocket(`${protocol}://${hostName}:${serverPort}`);

    ws.onopen = () => setLoading(true);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as Response[];
        setStatuses(data);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    ws.onerror = (event) => {
      console.error("WebSocket error observed:", event);
      setError(true);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      } else if (ws.readyState === WebSocket.CONNECTING) {
        ws.onopen = () => ws.close();
      }
    };
  }, [hostName, serverPort]);

  return { statuses, error, loading };
};

export default useWebSocketStatus;