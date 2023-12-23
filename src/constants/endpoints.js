const AUTH_ENDPOINTS = {
  LOGIN: 'auth/login',
  LOGOUT: 'auth/logout',
};

const FEEDBACK_ENDPOINTS = {
  GET_ALL: '/feedback',
  DELETE_ONE: id => `/feedback/${id}`,
};

const DISH_ENDPOINTS = {
  MENU: '/menu',
  ALL_DISHES: '/menu/all-dishes',
  ONE_DISH: id => `/menu/dish/${id}`,
  CREATE_NEW_MENU: '/menu/create-new',
  SET_MENU_ACTIVE: date => `/menu/set-active/${date}`,
  DELETE_MENU: date => `/menu/${date}`,
};

const ORDER_ENDPOINTS = {
  CONFIRM: id => `/order/${id}/confirm`,
  MARK_COOKED: id => `/order/${id}/mark-cooked`,
  GET_ALL: '/order/all',
};

export { AUTH_ENDPOINTS, FEEDBACK_ENDPOINTS, DISH_ENDPOINTS, ORDER_ENDPOINTS };
