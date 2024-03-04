// api/services/generalApi.js
import { get } from "./utils";
import { API_ENDPOINTS } from "./endpoints";
import handleApiError from "../utils/handleApiError";

export const fetchProducts = async ({ offset, limit, categoryId, searchText }) => {
  try {
    const response = await get(API_ENDPOINTS.VIEW_PRODUCTS, {
      params: {
        offset,
        limit,
        category_id: categoryId,
        product_name: searchText
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error; 
  }
};
