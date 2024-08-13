import Status from "../types/Status";
import { UtilizationRate } from "../types/UtilizationRate";
import getCPUUtilization from "./getCPUUtilization";

const getUtilizationModifierClass = (status: Status) => {
    if (getCPUUtilization(status) === UtilizationRate.LOW) return 'status-detail--success';
    if (getCPUUtilization(status) === UtilizationRate.MID) return 'status-detail--warning';
    return 'status-detail--error'
};
export default getUtilizationModifierClass;