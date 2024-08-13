import Status from "../types/Status";

enum UtilizationRate {
  LOW = 'low',
  MID = 'medium',
  HIGH = 'high',
}

const getCPUUtilization = ({results}: Status) => {
  const cpuLoad = results.stats.server.cpu_load;

  if(cpuLoad <= 0.3) return UtilizationRate.LOW;
  if(cpuLoad <= 0.6) return UtilizationRate.MID;
  return UtilizationRate.HIGH;
};
export default getCPUUtilization;