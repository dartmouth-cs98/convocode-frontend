import { createBackendAxiosRequest } from '.';

export const resourceSearchRequest = async (query, filters, sort, page, numPerPage) => createBackendAxiosRequest({
  method: 'get',
  url: `/search?query=${query && query.split(' ').length > 0
    ? query.split(' ').join('+') : query || ''}&filters=${filters || ''}&sort=${sort || 'a'}&page=${page || 1}&numperpage=${numPerPage || 100}`,
});
