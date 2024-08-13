import AvailableRegions from "../types/AvailableRegions";
import getAvailability from "./getAvailability";
import { Response } from "../types/Status";

const getAvailabilityModifierClass = (statuses: Response[]) => {
    if(getAvailability(statuses) === AvailableRegions.all) return 'background--success';
    if(getAvailability(statuses) === AvailableRegions.limited) return 'background--warning';
    return 'background--error';
};
export default getAvailabilityModifierClass;