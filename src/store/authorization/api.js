import apiClient from '../../utils/apiClient';

import { AUTH_ENDPOINTS, HTTP_METHODS } from '../../constants';

const { LOGIN, LOGOUT } = AUTH_ENDPOINTS;

const { POST } = HTTP_METHODS;

const login = data =>
  apiClient.unauthorizedRequest({
    method: POST,
    url: LOGIN,
    data,
  });

const logout = () =>
  apiClient.authorizedRequest({
    method: POST,
    url: LOGOUT,
  });

const api = { login, logout };

export default api;
