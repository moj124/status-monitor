import { UtilizationRate } from '../../src/types/UtilizationRate';
import getUtilizationModifierClass from '../../src/utils/getUtilizationModifierClass';
import getCPUUtilization from '../../src/utils/getCPUUtilization';
import Status from '../../src/types/Status';

jest.mock('../../src/utils/getCPUUtilization');

describe('getUtilizationModifierClass', () => {
  it('should return background--success for LOW utilization rate', () => {
    (getCPUUtilization as jest.Mock).mockReturnValue(UtilizationRate.LOW);

    const status = { results: { stats: { server: { cpu_load: 0.2 } } } } as Status;

    expect(getUtilizationModifierClass(status)).toBe('background--success');
  });

  it('should return background--warning for MID utilization rate', () => {
    (getCPUUtilization as jest.Mock).mockReturnValue(UtilizationRate.MID);

    const status = { results: { stats: { server: { cpu_load: 0.5 } } } } as Status;

    expect(getUtilizationModifierClass(status)).toBe('background--warning');
  });

  it('should return background--error for HIGH utilization rate', () => {
    (getCPUUtilization as jest.Mock).mockReturnValue(UtilizationRate.HIGH);

    const status = { results: { stats: { server: { cpu_load: 0.7 } } } } as Status;

    expect(getUtilizationModifierClass(status)).toBe('background--error');
  });
});
