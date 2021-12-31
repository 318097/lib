import _ from "lodash";

const convertObjToQueryParams = (obj = {}) => {
  const result = [];

  _.forEach(obj, (val, key) => {
    if (val) result.push(`${key}=${val}`);
  });

  return result;
};

const appendQueryParams = (url, queryParams) => {
  if (!url) return;
  if (!queryParams) return url;

  const parsed =
    typeof queryParams === "string" ? queryParams : queryParams.join("&");
  const seperator = url.includes("?") ? "&" : "?";

  return `${url}${seperator}${parsed}`;
};

export { convertObjToQueryParams, appendQueryParams };
