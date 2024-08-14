import { useEffect, useState } from 'react';
import { Response } from '../types/Status';

const useWebSocketStatus = (serverPort: number, domain: string, timeoutDuration: number) => {
  const [statuses, setStatuses] = useState<Response[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    console.log('protocol', protocol, domain, serverPort);
    const url = `${protocol}://${domain}:` + String(serverPort);
    const ws = new WebSocket(url);

    let timeout: NodeJS.Timeout;

    const handleTimeOut = () => {
      console.error('WebSocket connection timed out');
      setError(true);
      setLoading(false);
      ws.close();
    };

    ws.onopen = () => {
      setLoading(true);
      timeout = setTimeout(handleTimeOut, timeoutDuration);
    }

    ws.onmessage = (event) => {
      clearTimeout(timeout);
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
      clearTimeout(timeout);
      console.error("WebSocket error observed:", event);
      setError(true);
    };

    ws.onclose = () => {
      clearTimeout(timeout);
      setLoading(false);
    };

    return () => {
      clearTimeout(timeout);
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      } else if (ws.readyState === WebSocket.CONNECTING) {
        ws.onopen = () => ws.close();
      }
    };
  }, [domain, serverPort, timeoutDuration]);

  return { statuses, error, loading };
};

export default useWebSocketStatus;