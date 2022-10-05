import { createBackendAxiosRequest } from '.';
import { getBearerTokenHeader } from '../../utils/store';

export const fetchResourceByIdRequest = async (id) => createBackendAxiosRequest({
  method: 'get',
  url: `/resources/${id}`
});

export const createResourceRequest = async (title, description, value) => createBackendAxiosRequest({
  method: 'post',
  url: '/resources',
  data: { title, description, value },
  headers: getBearerTokenHeader()
});

export const updateResourceByIdRequest = async (id, fields) => createBackendAxiosRequest({
  method: 'put',
  url: `/resources/${id}`,
  data: fields,
  headers: getBearerTokenHeader()
});

export const deleteResourceByIdRequest = async (id) => createBackendAxiosRequest({
  method: 'delete',
  url: `/resources/${id}`,
  headers: getBearerTokenHeader()
});

export const fetchAllResourcesRequest = async () => createBackendAxiosRequest({
  method: 'get',
  url: '/resources'
});
