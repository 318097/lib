import { handleError } from "../helpers/errorHandling";
import { appendQueryParams } from "../utils/mix";
import _ from "lodash";

const DATA_URL =
  "https://raw.githubusercontent.com/318097/bubblegum/master/PRODUCTS.json";

// Keep this function in sync with 'bubblegum'
const parseProducts = (products) =>
  _.map(products, (product) => {
    const { links } = product;
    const cta = _.get(links, "landing.url") || _.get(links, "product.url");
    return {
      ...product,
      cta,
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

const formatPromotionalProducts = (
  products = [],
  { appId, trackingInfo } = {}
) => {
  if (!appId) return;
  const current = _.find(products, { id: appId });
  const others = _.map(
    _.filter(
      products,
      ({ id, visibility }) => id !== appId && visibility?.promotion
    ),
    (product) => {
      const queryParams = `utm_source=${appId.toLowerCase()}&utm_medium=${
        trackingInfo?.utm_medium
      }`;
      return { ...product, cta: appendQueryParams(product.cta, queryParams) };
    }
  );

  return {
    current,
    others,
  };
};

const getAndFormatPromotionalProducts = async (appId) => {
  const products = await getProducts();
  return formatPromotionalProducts(products, appId);
};

export {
  formatPromotionalProducts,
  getProducts,
  getAndFormatPromotionalProducts,
};
