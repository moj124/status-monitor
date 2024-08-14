import getAvailability from '../utils/getAvailability';
import getAvailabilityModifierClass from '../utils/getAvailabilityModifierClass';
import useWebSocketStatus from '../hooks/useWebSocketStatus'; 
import StatusDetail from './StatusDetail';
import '../styles/StatusBoard.css';

const StatusBoard = () => {
  const { statuses, error, loading } = useWebSocketStatus(
    process.env.REACT_APP_DOMAIN!,
    process.env.REACT_APP_SERVER_PORT!,
    10000
  );

  if(loading) return (
    <div className='status-board__banner background--warning'>
      Loading data...
    </div>
  );

  if(error) return (
    <div className='status-board__banner background--error'>
      A error has occurred whilst fetching data...
    </div>
  );

  return (
    <>
      <div 
        className={`
          status-board__banner
          ${getAvailabilityModifierClass(statuses)}
        `}
      >
        Service Availability: {getAvailability(statuses)}
      </div>
      <div className="status-board__list">
        {statuses.map((status, index) => (
          <StatusDetail key={index} status={status.data}/>
        ))}
      </div>
    </>
  );
};

export default StatusBoard;