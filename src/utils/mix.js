import _ from "lodash";

const convertObjToQueryParams = (obj = {}) => {
  const result = [];

  _.forEach(obj, (val, key) => {
    if (val) result.push(`${key}=${val}`);
  });

  return result;
};

const appendQueryParams = (url, queryParams) => {
  if (!url) return "";
  if (!queryParams) return url;

  const parsed =
    typeof queryParams === "string" ? queryParams : queryParams.join("&");
  return `${url}${url.includes("?") ? "&" : "?"}${parsed}`;
};

export { convertObjToQueryParams, appendQueryParams };
