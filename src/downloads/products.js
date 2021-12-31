import { handleError } from "../helpers/errorHandling";
const DATA_URL =
  "https://raw.githubusercontent.com/318097/bubblegum/master/PRODUCTS.json";

const getProducts = async (url = DATA_URL) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    const { products = [] } = data || {};
    return products;
  } catch (error) {
    handleError(error);
  }
};

const formatPromotionalProducts = (products = [], appId) => {
  if (!appId) return;
  return {
    current: products.find((product) => product.id === appId),
    others: products.filter(
      (product) => product.id !== appId && product.visibility?.promotion
    ),
  };
};

export { formatPromotionalProducts, getProducts };
