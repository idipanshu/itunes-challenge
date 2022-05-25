import { generateApiClient } from '@utils/apiUtils';

const songApi = generateApiClient('itunes');

export const getSongs = (searchString) => songApi.get(`/search?term=${searchString}`);
