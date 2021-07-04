import moment from "moment";

const DEFAULT_FORMAT = "D MMM, YY";

const formatDate = (date, { style = "default" } = {}) => {
  if (!date) return null;

  return moment(date).format(DEFAULT_FORMAT);
};

export { formatDate };
