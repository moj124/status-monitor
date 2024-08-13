import { useState, useCallback } from 'react';
import getCPUUtilization from "../utils/getCPUUtilization";
import getServices from "../utils/getServices";
import isOperational from "../utils/isOperational";
import StatisticsDetail from "./StatisticsDetail";
import getUtilizationModifierClass from '../utils/getUtilizationModifierClass';
import '../styles/StatusDetail.css';
import Status from "../types/Status";
import Tag from './Tag';

type StatusDetailProps = {
    status: Status;
}

const StatusDetail = ({ status }: StatusDetailProps) => {
    const [viewStats, setViewStats] = useState(false);

    const handleClick = useCallback(() => setViewStats((prev) => !prev), [setViewStats]);
    
    return (
        <div className="status-detail__wrapper">  
            <div className="status-detail__card" onClick={handleClick}>
                <div className="status-detail__section">
                    <div className="status-detail__heading">
                        <div 
                            className={`
                                status-detail__symbol
                                ${!viewStats ? 'status-detail--shift-down' : ''}
                            `}
                        >
                            {viewStats ? '-' : '+'}
                        </div>
                        <div className="status-detail__title">
                            {status.region}
                        </div>
                    </div>
                    <div className="status-detail__tags">
                        {getServices(status.results.services).map(([name, status], idx) => 
                            <Tag key={idx} status={status} name={name}/>
                        )}
                        <Tag 
                            modifier={getUtilizationModifierClass(status)}
                            name={`${getCPUUtilization(status)} CPU load`}
                        />
                    </div>
                </div>
                <div 
                    className={`
                        status-detail__state
                        ${isOperational(status.results.services) ? 
                            'text--success' :
                            'text--error'
                        }
                    `}>
                    {isOperational(status.results.services) ? 
                        'Operational' : 
                        'Out of service'
                    }
                </div>
            </div>
            <StatisticsDetail stats={status.results.stats} isOpen={viewStats}/>
        </div>
    );
};
export default StatusDetail;
