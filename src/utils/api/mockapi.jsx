const BASE_URL = 'https://681b1c4d17018fe5057a0e51.mockapi.io';

export const GET_PRODUCTS = `${BASE_URL}/products`;
export const GET_PRODUCT_BY_ID = (id) => `${BASE_URL}/products/${id}`;

export const MOCKAPI_ENDPOINTS = {
  GET_ALL_PRODUCTS: `${BASE_URL}/products`,
  GET_PRODUCT_DETAIL: (id) => `${BASE_URL}/products/${id}`,
};

export const fetchProducts = async () => {
  try {
    const response = await fetch(GET_PRODUCTS);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(GET_PRODUCT_BY_ID(id));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

export const MOCKAPI_BASE_URL = BASE_URL;
