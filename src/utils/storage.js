export const setToken = token => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const clearToken = () => localStorage.removeItem('token');

export const setWorkerInfo = workerInfo =>
  localStorage.setItem('workerInfo', JSON.stringify(workerInfo));
export const getWorkerInfo = () => localStorage.getItem('workerInfo');
export const clearWorkerInfo = () => localStorage.removeItem('workerInfo');

export const addChangeListener = callback => window.addEventListener('storage', callback);
export const removeChangeListener = callback => window.removeEventListener('storage', callback);

export const clearLocalStorage = () => localStorage.clear();

const storage = {
  setToken,
  getToken,
  clearToken,
  addChangeListener,
  removeChangeListener,
  clearLocalStorage,
  setWorkerInfo,
  getWorkerInfo,
  clearWorkerInfo,
};

export default storage;
