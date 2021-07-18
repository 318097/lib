import mixpanel from "mixpanel-browser";
import { handleError } from "../helpers/errorHandling";

const getValue = (user, key) => {
  const { _id, id } = user;
  const uid = _id || id;

  if (key === "id") return uid;
  else if (user[key]) return user[key];
  return console.warn("Key not found in `user` obj");
};

class EventTracker {
  constructor(options = {}) {
    const { events, trackingId, isDev = true, ...rest } = options;

    if (!trackingId) return console.warn("Tracking id is required.");

    mixpanel.init(trackingId, { debug: isDev, ...rest });

    this.events = events;
    this.isDev = isDev;
  }

  track = (event, params = {}) => {
    try {
      let eventName;

      if (this.events) {
        if (this.events[event]) eventName = this.events[event]["name"];
        else return console.warn(`Invalid event: ${event}`);
      } else eventName = event;

      if (this.isDev) console.table({ eventName, ...params });

      mixpanel.track(eventName, params);
    } catch (error) {
      handleError(error);
    }
  };

  setUser = (user = {}) => {
    try {
      const { email, name, profileURL, id, _id } = user;
      const uid = _id || id;
      const data = { $email: email, $name: name, profileURL, _id: uid };
      mixpanel.people.set(data);
    } catch (error) {
      handleError(error);
    }
  };

  setIdentity = (user = {}, key = "email") => {
    try {
      const value = getValue(user, key);
      mixpanel.identify(value);
    } catch (error) {
      handleError(error);
    }
  };

  alias = (user = {}, key = "email") => {
    try {
      const value = getValue(user, key);
      mixpanel.identify(value);
    } catch (error) {
      handleError(error);
    }
  };

  reset = () => {
    try {
      mixpanel.reset();
    } catch (error) {
      handleError(error);
    }
  };
}

export default EventTracker;
