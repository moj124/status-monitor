import { RecentlyBlockedKey, TopKey } from "../types/Status";

const filterOutWorkerKeys = (entries: [string, number | RecentlyBlockedKey[] | TopKey[]][]) => {
    return entries.filter((elem) => !elem[0].includes('key'));
};
export default filterOutWorkerKeys;