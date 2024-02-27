export const API_URL_V1 = import.meta.env.VITE_API_URL_V1;

export enum HTTP_TYPES {
  'GET' = 'get',
  'POST' = 'post',
  'PUT' = 'put',
  'DELETE' = 'delete',
  'PATCH' = 'patch',
}

export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';

export enum ROUTES {
  HOME = '/',
  LOGIN = '/login',
  REGISTER = '/register',
}

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    CURRENT_UER: '/auth/current-user',
  },
};

export const MESSGAES = {
  SOME_THING_WENT_WRONG: 'Oops, something went wrong.',
  OPERATION_SUCCESS: 'Operation success.',
};
