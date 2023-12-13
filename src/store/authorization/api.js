import apiClient from '../../utils/apiClient';

import { AUTH_ENDPOINTS, HTTP_METHODS } from '../../constants';

const { LOGIN } = AUTH_ENDPOINTS;

const { POST } = HTTP_METHODS;

const login = data =>
  apiClient.unauthorizedRequest({
    method: POST,
    url: LOGIN,
    data,
  });

const api = { login };

export default api;
