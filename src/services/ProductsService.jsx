// src/services/ProductsService.js

import productsData from "../data/products.json";

/**
 * Returns the full list of products.
 * In the future this could fetch from an API.
 */
export function listProducts() {
  return productsData;
}

/**
 * Returns a single product by ID
 */
export function getProductById(id) {
  return productsData.find((p) => p.id === id);
}
