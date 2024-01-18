import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Retrieve an object from the AsyncStorage.
 * @param {String} key
 * @returns Object from the AsyncStorage or null if not found.
 */
export const getAsyncStorageObject = async (key: string) => {
  try {
    const val = await AsyncStorage.getItem(key);
    if (val) {
      const storeObj = JSON.parse(val);
      return storeObj;
    }
    return null;
  } catch (err) {
    console.error(`getAsyncStorageObject error (${key}): `, err);
    return null;
  }
};

/**
 * Save a new key-value par in the AsyncStorage
 * @param {String} key Key that will be used to store the value
 * @param {*} value Desired value to store in async storage
 */
export const setAsyncStorageObject = async (key: string, value: any) => {
  const valueObj = JSON.stringify(value);
  try {
    // console.log(`valueObj stringified`, valueObj);
    await AsyncStorage.setItem(key, valueObj);
  } catch (err) {
    console.error(`Setting AsyncStorage item `, err);
  }
};

/**
 * Clear all the current values of the AsyncStorage
 */
export const clearAsyncStorage = async () => {
  try {
    console.log(`clearing async storage`);
    await AsyncStorage.clear();
  } catch (err) {
    console.error(`clearAsyncStorage error: `, err);
  }
};

/**
 * Removes a key-value pair from the AsyncStorage
 * @param {String} key Key to remove from AsyncStorage
 */
export const removeAsyncStorageKey = (key: string) => removeAsyncStorageKeys([key]);

/**
 * Removes multiple key-value pairs from the AsyncStorage
 * @param {String[]} keys Keys to remove from AsyncStorage
 */
export const removeAsyncStorageKeys = async (keys: string[]) => {
  try {
    await Promise.all(keys.map((key) => AsyncStorage.removeItem(key)));
  } catch (err) {
    console.error(`removeAsyncStorageKeys error: `, err);
  }
};
