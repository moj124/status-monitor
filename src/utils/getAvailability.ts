import { OK, REGIONS } from "./constant";
import {Response} from "../types/Status";
import AvailableRegions from "../types/AvailableRegions";

const getAvailability = (statuses: Response[]) => {
    const availableRegions = [];
    for (const { data } of statuses) {
      const {status, results, region} = data;
      
      if(status !== OK) continue;
      if(Object.values(results.services).includes(false)) continue;

      availableRegions.push({region: region, services: results});
    }
    if(availableRegions.length === 0) return AvailableRegions.none;
    if(availableRegions.length < REGIONS.length) return AvailableRegions.multiple;
    return AvailableRegions.all;
};
export default getAvailability;