import moment from "moment";

const formatDate = (date, style = "default") => {
  if (!date) return null;

  const format = "DD MMM, YY";
  return moment(date).format(format);
};

export { formatDate };
