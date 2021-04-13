/*
 * store an item to local storage
 *
 * @param string key
 * @param any value
 * @return void
 */
export const saveToStorage = (key: string, value: string) => {
  localStorage.removeItem(key);
  localStorage.setItem(key, value);
};

/*
 * remove an item out of local storage
 *
 * @param string key
 * @return void
 */
export const removeFromStorage = (key: string) => {
  localStorage.removeItem(key);
};

/*
 * retrieve an item from local storage
 *
 * @param string key
 * @return any
 */
export const retrieveFromStorage = (key: string) => {
  return localStorage.getItem(key);
};

/*
 * store an item to session storage
 *
 * @param string key
 * @param any value
 * @return void
 */
export const saveToSession = (key: string, value: any) => {
  sessionStorage.removeItem(key);
  sessionStorage.setItem(key, value);
};

/*
 * remove an item out of session storage
 *
 * @param string key
 * @return void
 */
export const removeFromSession = (key: string) => {
  sessionStorage.removeItem(key);
};

/*
 * retrieve an item from session storage
 *
 * @param string key
 * @return any
 */
export const retrieveFromSession = (key: string) => {
  return sessionStorage.getItem(key);
};
