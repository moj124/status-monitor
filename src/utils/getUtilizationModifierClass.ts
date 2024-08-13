import Status from "../types/Status";
import { UtilizationRate } from "../types/UtilizationRate";
import getCPUUtilization from "./getCPUUtilization";

const getUtilizationModifierClass = (status: Status) => {
    if (getCPUUtilization(status) === UtilizationRate.LOW) return 'background--success';
    if (getCPUUtilization(status) === UtilizationRate.MID) return 'background--warning';
    return 'background--error'
};
export default getUtilizationModifierClass;