import apiClient from '../../utils/apiClient';

import { ORDER_ENDPOINTS, HTTP_METHODS } from '../../constants';

const { CONFIRM } = ORDER_ENDPOINTS;

const { POST } = HTTP_METHODS;

const confirmOrder = id =>
  apiClient.unauthorizedRequest({
    method: POST,
    url: CONFIRM(id),
  });

const api = { confirmOrder };

export default api;
