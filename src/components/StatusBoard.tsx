import { useEffect, useState } from 'react';
import { Response } from '../types/Status';
import getAvailability from '../utils/getAvailability';
import StatusDetail from './StatusDetail';
import '../styles/StatusBoard.css';

const StatusBoard = () => {
  const [statuses, setStatuses] = useState<Response[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const ws = new WebSocket(`${protocol}://localhost:${process.env.REACT_APP_SERVER_PORT}`);

    ws.onopen = () => {
      setLoading(true);
    }

    ws.onmessage = (event) => {
      try {        
        const data = JSON.parse(event.data) as Response[];
        setStatuses(data);
      } catch (error) {
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
      if(ws.readyState === WebSocket.OPEN) {
        ws.close();
      } else if (ws.readyState === WebSocket.CONNECTING) {
        ws.onopen = () => ws.close();
      }
    };
  }, []);

  if(error) return (
    <div className='status-board__banner status-board--error'>
      A error has occurred whilst fetching data... Please reload the page.
    </div>
  );

  if(loading) return (
    <div className='status-board__banner status-board--warning'>
      Loading data...
    </div>
  );

  return (
    <>
      <div>
        <div 
          className={`
            status-board__banner
            ${getAvailability(statuses) ?
                'status-board--success' :
                getAvailability(statuses) ?
                  'status-board--warning' :
                  'status-board--error'
            }
          `}
        >
          Service Availability: {getAvailability(statuses)}
        </div>
        <div className="status-board__list">
          {statuses.map((status, index) => (
            <StatusDetail key={index} status={status.data}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default StatusBoard;