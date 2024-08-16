import { useEffect, useRef, useState } from 'react';
import { Response } from '../types/Status';

const useWebSocketStatus = (domain: string, serverPort: string, timeoutDuration: number) => {
  const ws = useRef<WebSocket | null>(null);
  const [statuses, setStatuses] = useState<Response[]>([])
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    let url = `${protocol}://${domain}:${serverPort}`;
    
    if(ws.current === null) {
      ws.current = new WebSocket(url);
    }

    if (!ws.current) throw new Error('ws WebSocket is null'); 

    let timeout: NodeJS.Timeout;

    const handleTimeOut = () => {
      console.error('WebSocket connection timed out');
      setError(true);
      setLoading(false);
      ws.current?.close();
    };

    ws.current.onopen = () => {
      setLoading(true);
      timeout = setTimeout(handleTimeOut, timeoutDuration);
    }

    ws.current.onmessage = (event) => {
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

    ws.current.onerror = (event) => {
      clearTimeout(timeout);
      console.error("WebSocket error observed:", event);
      setError(true);
    };

    ws.current.onclose = () => {
      clearTimeout(timeout);
      setLoading(false);
    };

    return () => {
      clearTimeout(timeout);
      if (ws.current?.readyState === WebSocket.OPEN) {
        ws.current?.close();
      } else if (ws.current?.readyState === WebSocket.CONNECTING) {
        ws.current.onopen = () => ws.current?.close();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { statuses, error, loading };
};

export default useWebSocketStatus;