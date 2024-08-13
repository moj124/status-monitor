import { WorkerStats } from "../types/Status";
import filterOutWorkerKeys from "./filterOutWorkerKeys";

const getSelectedWorkerProps = (worker: WorkerStats) => {
    const entriesWorker = Object.entries(worker)
    return filterOutWorkerKeys(entriesWorker);
}
export default getSelectedWorkerProps;