import { createBackendAxiosRequest } from '.';
import { getBearerTokenHeader } from '../../utils/store';

export const fetchUserByIdRequest = async (id) => createBackendAxiosRequest({
  method: 'get',
  url: `/users/${id}`,
  headers: getBearerTokenHeader()
});

export const createUserRequest = async (firstName, lastName, email, password) => createBackendAxiosRequest({
  method: 'post',
  url: '/users',
  data: {
    first_name: firstName, last_name: lastName, email, password,
  },
  headers: getBearerTokenHeader()
});

export const updateUserByIdRequest = async (id, fields) => createBackendAxiosRequest({
  method: 'put',
  url: `/users/${id}`,
  data: fields,
  headers: getBearerTokenHeader()
});

export const deleteUserByIdRequest = async (id) => createBackendAxiosRequest({
  method: 'delete',
  url: `/users/${id}`,
  headers: getBearerTokenHeader()
});

export const fetchAllUsersRequest = async () => createBackendAxiosRequest({
  method: 'get',
  url: '/users',
  headers: getBearerTokenHeader(),
});
