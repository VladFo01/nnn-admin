const INITIAL_STATE = {
  isFulfilled: false,
  isPending: false,
  isRejected: false,
  error: null,
};

const PENDING_STATE = {
  ...INITIAL_STATE,
  isPending: true,
};

const REJECTED_STATE = {
  ...INITIAL_STATE,
  isRejected: true,
};

const FULFILLED_STATE = {
  ...INITIAL_STATE,
  isFulfilled: true,
};

const STORE_NAMES = {
  AUTH: 'authorization',
};

export { INITIAL_STATE, PENDING_STATE, REJECTED_STATE, FULFILLED_STATE, STORE_NAMES };
