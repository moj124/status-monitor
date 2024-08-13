import { Results } from '../types/Status';
import formatStringValue from '../utils/formatStringValue';
import getSelectedWorkerProps from '../utils/getSelectedWorkerProps';
import '../styles/StatisticsDetail.css';

type StatisticsDetailProps = {
    stats: Results['stats'];
    isOpen: boolean
}

const StatisticsDetail = ({ stats, isOpen }: StatisticsDetailProps) => {
    if (!isOpen) return;

    return (
    <div className="statistics-detail__wrapper">
        <div>
            <p className="statistics-detail__header">
                <strong>Statistics</strong>
            </p>
            <ul className="statistics-detail__list">
                <li className="statistics-detail__item">
                    Online users: {stats.online}
                </li>
                <li className="statistics-detail__item">
                    Server instances: {stats.servers_count}
                </li>
                <li className="statistics-detail__item">
                    Server Active Connections: {stats.server.active_connections}
                </li>
                <li className="statistics-detail__item">
                    Server Wait time: {stats.server.wait_time}ms
                </li>
            </ul>
        </div>
        <div>
            {stats.server.workers.map((elem, idx) =>
                <div key={idx}>
                    <p className="statistics-detail__header">
                        <strong>{elem[0]}</strong>
                    </p>
                    <ul className="statistics-detail__list">
                        {getSelectedWorkerProps(elem[1]).map((entry, index) =>
                                <li 
                                    key={index}
                                    className="statistics-detail__item">
                                    {entry[0]} : {formatStringValue(entry)}
                                </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    </div>

    );
}
export default StatisticsDetail;