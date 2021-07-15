const saveTokens = (access, refresh) => {
  localStorage.setItem('token', access);
  localStorage.setItem('refresh', refresh);
};

const getAccessToken = () => localStorage.getItem('token');

const getRefreshToken = () => localStorage.getItem('refresh');

const clearTokens = () => {
  localStorage.clear();
};
export {
  saveTokens, getAccessToken, getRefreshToken, clearTokens,
};
