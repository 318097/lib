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
  constructor(options = {}, custom = {}) {
    const { events, trackingId, isDev = true, ...rest } = options;

    if (!trackingId) console.warn("Tracking id is required.");

    mixpanel.init(trackingId, { debug: isDev, ...rest });

    this.trackingId = trackingId;
    this.events = events;
    this.isDev = isDev;
    this.custom = custom;
  }

  track = (event, params = {}) => {
    try {
      let eventName;

      if (this.events) {
        if (this.events[event]) {
          const obj = this.events[event] || {};
          eventName = obj["name"];
          if (obj["fields"]) {
            const isValid = obj["fields"].every((field) =>
              Boolean(params[field])
            );
            if (!isValid)
              return console.warn(
                `${obj["fields"].join(", ")} fields are required.`
              );
          }
        } else return console.warn(`Invalid event: '${event}'`);
      } else eventName = event;

      const { defaultProperties = {} } = this.custom || {};
      const properties = { ...params, ...defaultProperties };

      if (this.isDev) console.table({ eventName, ...properties });

      if (this.trackingId) mixpanel.track(eventName, properties);
    } catch (error) {
      handleError(error);
    }
  };

  setUser = (user = {}, once = true) => {
    try {
      const { email, name, profileURL, id, _id } = user;
      const uid = _id || id;
      const data = { $email: email, $name: name, profileURL, _id: uid };

      if (this.trackingId) {
        if (once) mixpanel.people.set_once(data);
        else mixpanel.people.set(data);
      }
    } catch (error) {
      handleError(error);
    }
  };

  setIdentity = (user = {}, key = "email") => {
    try {
      const value = getValue(user, key);

      if (this.trackingId) mixpanel.identify(value);
    } catch (error) {
      handleError(error);
    }
  };

  alias = (user = {}, key = "email") => {
    try {
      const value = getValue(user, key);

      if (this.trackingId) mixpanel.identify(value);
    } catch (error) {
      handleError(error);
    }
  };

  reset = () => {
    try {
      if (this.trackingId) mixpanel.reset();
    } catch (error) {
      handleError(error);
    }
  };
}

export default EventTracker;
