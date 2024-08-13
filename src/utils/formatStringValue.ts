import { RecentlyBlockedKey, TopKey } from "../types/Status";

const formatStringValue = (entry: [string, number | RecentlyBlockedKey[] | TopKey[]]) => {
    const stringVal = String(entry[1]);

    if (entry[0].includes('time')) return stringVal + 'ms';

    return stringVal
}
export default formatStringValue;