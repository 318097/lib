import { handleError } from "../helpers/errorHandling";
import {
  getDataFromStorage,
  setDataInStorage,
  getProperty,
} from "../helpers/localStorage";

class SessionManager {
  constructor(options = {}, defaultValue = {}) {
    const { key = "root" } = options;

    this.key = key;
    // this.set(defaultValue);
  }

  set = (value) => {
    try {
      return setDataInStorage(this.key, value);
    } catch (error) {
      handleError(error);
    }
  };

  get = () => {
    try {
      return getDataFromStorage(this.key);
    } catch (error) {
      handleError(error);
    }
  };

  getProperty = (property) => {
    return getProperty(this.key, property);
  };

  getToken = () => {
    return this.getProperty("token");
  };

  hasToken = () => {
    return Boolean(this.getToken());
  };

  get token() {
    return this.getProperty("token");
  }
}

export default SessionManager;
