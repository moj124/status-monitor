import AvailableRegions from "../types/AvailableRegions";
import getAvailability from "./getAvailability";
import { Response } from "../types/Status";

const getAvailabilityModifierClass = (statuses: Response[]) => {
    if(getAvailability(statuses) === AvailableRegions.all) return 'status-board--success';
    if(getAvailability(statuses) === AvailableRegions.limited) return 'status-board--warning';
    return 'status-board--error';
};
export default getAvailabilityModifierClass;