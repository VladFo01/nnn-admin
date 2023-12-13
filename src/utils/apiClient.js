/* eslint-disable no-underscore-dangle */
import axios from 'axios';

import routes from './routes';
import storage from './storage';

import { HTTP_STATUSES } from '../constants/http';
import { BASE_URL } from '../constants/common';

const defaultAxiosInstanceOptions = {
  baseURL: BASE_URL,
};

const headerInterceptor = async config => {
  const token = storage.getToken();
  const configWithDynamicHeaders = {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token || ''}`,
    },
  };

  return configWithDynamicHeaders;
};

const resolveInterceptor = response => response;

const rejectInterceptor = async error => {
  if (error.response?.status === HTTP_STATUSES.UNAUTHORIZED) {
    storage.clearToken();
    window.location.replace(routes.signIn);
  }

  if (error.response?.status === HTTP_STATUSES.NOT_FOUND) {
    window.location.replace(routes.notFound);
  }

  return Promise.reject(error);
};

const unauthorizedApiClient = axios.create(defaultAxiosInstanceOptions);

const authorizedApiClient = axios.create(defaultAxiosInstanceOptions);

authorizedApiClient.interceptors.request.use(headerInterceptor);
authorizedApiClient.interceptors.response.use(resolveInterceptor, rejectInterceptor);

const wrappedAxiosRequest =
  isAuthorized =>
  async ({ url, method, data = null, headers = {}, params = {} }) => {
    const apiClient = isAuthorized ? authorizedApiClient : unauthorizedApiClient;

    const config = {
      url,
      method,
      data,
      params,
      headers,
    };

    try {
      const response = await apiClient.request(config);

      return response?.data ? { response: response.data, error: null } : { response: null, error: null };
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return {
          response: null,
          error: {
            data: error.response.data,
            status: error.response.status,
          },
        };
      }
      if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        return {
          response: null,
          error: {
            data: error.request,
          },
        };
      }
      return {
        response: null,
        error: {
          data: error,
        },
      };
    }
  };

const apiClient = {
  authorizedRequest: wrappedAxiosRequest(true),
  unauthorizedRequest: wrappedAxiosRequest(false),
};

export default apiClient;
