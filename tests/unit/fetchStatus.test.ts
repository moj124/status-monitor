import fetchStatus from '../../server/src/utils/fetchStatus';
import nock from 'nock';

const endpoints = [
  'https://example.com/api/status1',
  'https://example.com/api/status2',
];

describe('fetchStatus', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should fetch and return data from all endpoints', async () => {
    nock('https://example.com')
      .get('/api/status1')
      .reply(200, { status: 'ok', data: 'status1' });

    nock('https://example.com')
      .get('/api/status2')
      .reply(200, { status: 'ok', data: 'status2' });

    const result = await fetchStatus(endpoints);

    expect(result).toEqual([
      { data: {status: 'ok', data: 'status1'}, endpoint: endpoints[0] },
      { data: {status: 'ok', data: 'status2'}, endpoint: endpoints[1] },
    ]);
  });

  it('should handle endpoint errors gracefully', async () => {
    nock('https://example.com')
      .get('/api/status1')
      .reply(500);

    nock('https://example.com')
      .get('/api/status2')
      .reply(200, { status: 'ok', data: 'status2' });

    try {
      await fetchStatus(endpoints);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
