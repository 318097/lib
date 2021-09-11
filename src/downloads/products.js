import { handleError } from "../helpers/errorHandling";

const getProducts = async () => {
  const DATA_URL =
    "https://raw.githubusercontent.com/318097/bubblegum/master/server/PRODUCTS.json";

  try {
    const res = await fetch(DATA_URL);
    const data = await res.json();
    const { products = [] } = data || {};
    return products;
  } catch (error) {
    handleError(error);
    return [];
  }
};

export default getProducts;
