export const getLocalStorage = (key: string) => localStorage.getItem(key);

export const removeLocalStorage = (key: string) => localStorage.removeItem(key);

export const addLocalStorage = (key: string, value: string) =>
  localStorage.setItem(key, value);
