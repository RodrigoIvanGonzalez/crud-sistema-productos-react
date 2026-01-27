import { useState } from 'react';
import {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} from '../services/productStorage';

export function useProducts() {

  const [products, setProducts] = useState(() => getProducts());

  const createProduct = (product) => {
    addProduct(product);
    setProducts(getProducts());
  };

  const removeProduct = (id) => {
    deleteProduct(id);
    setProducts(getProducts());
  };

  const editProduct = (updatedProduct) => {
    updateProduct(updatedProduct);
    setProducts(getProducts());
  };

  return {
    products,
    createProduct,
    removeProduct,
    editProduct,
  };
}
