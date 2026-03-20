export default function useLocalStorage() {

  const setLocalStorageValue = (key, value) => {
    console.log('set value called')
    try {
      if (value === null || value === "" || value === undefined) {
        removeValue(key)
      }
      else {
        localStorage.setItem(key, value);
      }
    } catch (error) {
      console.log(error, error.message);
    }
  }

  const getLocalStorageValue = (key) => {
    return localStorage.getItem(key)
  }

  const removeValue = (key) => {
    localStorage.removeItem(key);
  }


  return { getLocalStorageValue, setLocalStorageValue };
}

