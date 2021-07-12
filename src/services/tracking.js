import mixpanel from "mixpanel-browser";
import { handleError } from "../helpers/errorHandling";
class Tracker {
  constructor(options = {}) {
    const { events, trackingId, logEvents = true } = options;

    if (!trackingId) return console.warn("Tracking id is required.");

    mixpanel.init(trackingId);

    this.events = events;
    this.logEvents = logEvents;
  }

  track = (event, params = {}) => {
    try {
      if (this.events && !this.events[event])
        return console.warn(`Invalid event: ${event}`);

      const { name } = this.events[event];

      if (this.logEvents) console.table({ eventName: name, ...params });

      mixpanel.track(name, params);
    } catch (error) {
      handleError(error);
    }
  };

  register = (user) => {
    try {
      this.setIdentity(user);
      this.setUser(user);
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

  setIdentity = (user) => {
    try {
      const { _id, id } = user;
      const uid = _id || id;
      mixpanel.identify(uid);
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

export default Tracker;
