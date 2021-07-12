import mixpanel from "mixpanel-browser";

class Tracker {
  events = null;

  constructor(options) {
    const { events, trackingId } = options;
    if (!trackingId) return console.warning("Tracking id is required.");
    mixpanel.init(trackingId);

    this.events = events;
  }

  track = (event, params = {}) => {
    try {
      if (this.events && !this.events[event])
        return console.warning(`Invalid event: ${event}`);

      const { name } = this.events[event];
      console.table({ eventName: name, ...params });
      mixpanel.track(name, params);
    } catch (error) {
      console.error(error);
    }
  };

  init = (user, params = {}) => {
    try {
      this.setIdentity(user);
      this.setUser(user);
      this.track("INIT", params);
    } catch (error) {
      console.error(error);
    }
  };

  setUser = (user = {}) => {
    try {
      const { email, name, profileURL, id: _id } = user;
      const data = { $email: email, $name: name, profileURL, _id };
      console.log(data);
      mixpanel.people.set(data);
    } catch (error) {
      console.error(error);
    }
  };

  setIdentity = (user) => {
    try {
      mixpanel.identify(user.id);
    } catch (error) {
      console.error(error);
    }
  };

  reset = () => mixpanel.reset();
}

export default Tracker;
