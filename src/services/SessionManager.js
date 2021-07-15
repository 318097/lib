import { handleError } from "../helpers/errorHandling";
import {
  getDataFromStorage,
  setDataInStorage,
  getProperty,
} from "../helpers/localStorage";

class SessionManager {
  constructor(options = {}) {
    const { key = "root" } = options;

    this.key = key;
  }

  set = (value) => {
    try {
      setDataInStorage(this.key, value);
    } catch (error) {
      handleError(error);
    }
  };

  get = () => {
    try {
      getDataFromStorage(this.key);
    } catch (error) {
      handleError(error);
    }
  };

  getProperty = (property) => {
    getProperty(this.key, property);
  };

  getToken = () => {
    this.getProperty("token");
  };

  hasToken = () => {
    return Boolean(this.getToken());
  };
}

export default SessionManager;
