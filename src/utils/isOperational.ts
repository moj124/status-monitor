import { Results } from "../types/Status";

const isOperational = (services: Results["services"]) => {
    for (const status of Object.values(services)) {
        if(!status) return false;
    }

    return true;
}
export default isOperational;