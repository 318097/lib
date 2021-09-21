import _ from "lodash";

const convertObjToQueryParams = (obj = {}) => {
  const result = [];

  _.map(
    _.filter(obj, (val) => Boolean(val)),
    (val, key) => result.push(`${key}=${val}`)
  );

  return result;
};

const appendQueryParams = (url, queryParams) => {
  if (!url) return "";
  if (!queryParams) return url;

  return `${url}${url.contains("?") ? "&" : "?"}${queryParams}`;
};

export { convertObjToQueryParams, appendQueryParams };
