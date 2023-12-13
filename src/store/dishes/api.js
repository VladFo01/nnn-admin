import apiClient from '../../utils/apiClient';

import { DISH_ENDPOINTS, HTTP_METHODS } from '../../constants';

const { MENU, ALL_DISHES, SET_MENU_ACTIVE, DELETE_MENU, CREATE_NEW_MENU } = DISH_ENDPOINTS;

const { GET, POST, PUT, DELETE } = HTTP_METHODS;

const getActiveMenu = () =>
  apiClient.unauthorizedRequest({
    method: GET,
    url: MENU,
  });

const getAllDishes = () =>
  apiClient.authorizedRequest({
    method: GET,
    url: ALL_DISHES,
  });

const createMenu = data =>
  apiClient.authorizedRequest({
    method: POST,
    url: CREATE_NEW_MENU,
    data,
  });

const setMenuActive = date =>
  apiClient.authorizedRequest({
    method: PUT,
    url: SET_MENU_ACTIVE(date),
  });

const deleteMenu = date =>
  apiClient.authorizedRequest({
    method: DELETE,
    url: DELETE_MENU(date),
  });

const api = {
  getActiveMenu,
  getAllDishes,
  createMenu,
  setMenuActive,
  deleteMenu,
};

export default api;
