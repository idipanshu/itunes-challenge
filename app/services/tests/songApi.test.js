import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getSongs } from '../songApi';

describe('RepoApi tests', () => {
  const searchedTerm = 'Sam';
  it('should make the api call to "/search?term="', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const data = [
      {
        resultCount: 1,
        results: [{ searchedTerm }]
      }
    ];
    mock.onGet(`/search?term=${searchedTerm}`).reply(200, data);
    const res = await getSongs(searchedTerm);
    expect(res.data).toEqual(data);
  });
});
