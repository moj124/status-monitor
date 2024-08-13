import { Results } from "../types/Status";

const getServices = (services: Results["services"]) => {
    return Object.entries(services).sort((a,b) => a[0].localeCompare(b[0]));
}
export default getServices;