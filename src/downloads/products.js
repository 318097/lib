import { handleError } from "../helpers/errorHandling";
import { appendQueryParams } from "../utils/mix";
import _ from "lodash";

const DATA_URL =
  "https://raw.githubusercontent.com/318097/bubblegum/master/PRODUCTS.json";

// Keep this function in sync with 'bubblegum'
const parseProducts = (products) =>
  _.map(products, (product) => {
    const { links } = product;
    const ctaUrl = _.get(links, "landing.url") || _.get(links, "product.url");
    const ctaLabel =
      _.get(links, "landing.label") || _.get(links, "product.label");
    return {
      ...product,
      ctaUrl,
      ctaLabel,
    };
  });

const getProducts = async (url = DATA_URL) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    const { products = [] } = data || {};
    return parseProducts(products);
  } catch (error) {
    handleError(error);
  }
};

const formatProducts = (
  products = [],
  { appId, trackingInfo, visibilityKey = "promotion" } = {}
) => {
  if (!appId) return;

  const convertProductsListToArray = (linksObj) =>
    Object.entries(linksObj)
      .map(([platform, value]) => ({
        ...value,
        label: value.label || _.capitalize(platform),
        platform,
      }))
      .filter(
        (item) => !!item.url && !["product", "landing"].includes(item.platform)
      );

  const current = _.find(products, { id: appId });

  const filteredList = _.filter(
    products,
    ({ id, visibility }) => id !== appId && _.get(visibility, visibilityKey)
  );

  const others = _.map(filteredList, (product) => {
    const queryParams = `utm_source=${appId.toLowerCase()}&utm_medium=${
      trackingInfo?.utm_medium
    }`;
    return {
      ...product,
      ctaUrl: appendQueryParams(product.ctaUrl, queryParams),
      linkList: convertProductsListToArray(product.links),
    };
  });

  return {
    current,
    others,
  };
};

const getAndFormatProducts = async (params) => {
  const products = await getProducts();
  return formatProducts(products, params);
};

export { formatProducts, getProducts, getAndFormatProducts };
