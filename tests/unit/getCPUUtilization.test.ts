import getCPUUtilization from '../../src/utils/getCPUUtilization';
import Status from '../../src/types/Status';

describe('getCPUUtilization', () => {
    it('should return LOW when cpu_load is less than or equal to 0.3', () => {
      const status: Status = {
        results: {
          stats: {
            server: {
              cpu_load: 0.2,
            },
          },
        },
      } as Status;
  
      expect(getCPUUtilization(status)).toBe('low');
    });
  
    it('should return MID when cpu_load is greater than 0.3 and less than or equal to 0.6', () => {
      const status: Status = {
        results: {
          stats: {
            server: {
              cpu_load: 0.5,
            },
          },
        },
      } as Status;
  
      expect(getCPUUtilization(status)).toBe('medium');
    });
  
    it('should return HIGH when cpu_load is greater than 0.6', () => {
      const status: Status = {
        results: {
          stats: {
            server: {
              cpu_load: 0.7,
            },
          },
        },
      } as Status;
  
      expect(getCPUUtilization(status)).toBe('high');
    });
  });