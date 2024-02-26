export const getLocalStorage = (key: string): any => {
  return JSON.parse(localStorage.getItem(key) ?? "null");
};

export const removeLocalStorage = (key: string) => localStorage.removeItem(key);

export const addLocalStorage = (key: string, value: any) =>
  localStorage.setItem(key, JSON.stringify(value));
