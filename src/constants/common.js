export const BASE_URL = 'http://localhost:3000';

export const ROLES = {
  ADMIN: 'Admin',
  CHEF: 'Chef',
  WAITER: 'Waiter',
};

export const ORDER_STATUSES = {
  not_confirmed: 'not_confirmed',
  confirmed: 'confirmed',
  cooked: 'cooked',
  paid: 'paid',
};

export const DEFAULT_TIMEZONE_OFFSET = 2;

export const ONE_MINUTE_MILLI = 60 * 1000;
export const ONE_HOUR_MILLI = 60 * ONE_MINUTE_MILLI;
