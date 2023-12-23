import apiClient from '../../utils/apiClient';

import { ORDER_ENDPOINTS, HTTP_METHODS } from '../../constants';

const { CONFIRM, MARK_COOKED, GET_ALL } = ORDER_ENDPOINTS;

const { POST, GET } = HTTP_METHODS;

const confirmOrder = id =>
  apiClient.authorizedRequest({
    method: POST,
    url: CONFIRM(id),
  });

const getAllOrders = () =>
  apiClient.authorizedRequest({
    method: GET,
    url: GET_ALL,
  });

const markCookedOrder = id =>
  apiClient.authorizedRequest({
    method: POST,
    url: MARK_COOKED(id),
  });

const api = { confirmOrder, getAllOrders, markCookedOrder };

export default api;
