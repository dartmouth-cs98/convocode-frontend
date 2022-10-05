import { createBackendAxiosRequest } from '.';

export const signUpUserRequest = async (email, password, firstName, lastName) => createBackendAxiosRequest({
  method: 'post',
  url: '/auth/signup',
  data: {
    email, password, firstName, lastName,
  },
});

export const signInUserRequest = async (email, password) => createBackendAxiosRequest({
  method: 'post',
  url: '/auth/signin',
  data: { email, password },
});
