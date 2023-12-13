import apiClient from '../../utils/apiClient';

import { FEEDBACK_ENDPOINTS, HTTP_METHODS } from '../../constants';

const { GET_ALL, DELETE_ONE } = FEEDBACK_ENDPOINTS;

const { GET, DELETE } = HTTP_METHODS;

const getAllFeedback = () =>
  apiClient.unauthorizedRequest({
    method: GET,
    url: GET_ALL,
  });

const deleteFeedbackById = id =>
  apiClient.authorizedRequest({
    method: DELETE,
    url: DELETE_ONE(id),
  });

const api = { getAllFeedback, deleteFeedbackById };

export default api;