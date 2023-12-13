export const setToken = token => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const clearToken = () => localStorage.removeItem('token');

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
};

export default storage;
