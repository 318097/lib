import moment from "moment";

const formatDate = (date) => {
  moment(date).format("DD MMM, YY");
};

export { formatDate };
