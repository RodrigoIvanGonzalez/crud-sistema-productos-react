import {initialProducts} from '../data/initialProducts.js';

const STORAGE_KEY = 'products';

/* INICIALIZA EL ALMACENAMIENTO DE PRODUCTOS EN EL LOCALSTORAGE */

export const initProductStorage =() => {
  const stored = localStorage.getItem('STORAGE_KEY');

  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
  }
};

/* OBTIENE LOS PRODUCTOS ALMACENADOS EN EL LOCALSTORAGE */

export const getProducts = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error al recuperar productos del almacenamiento:', error);
    return [];
  }
};

/* GUARDA LOS PRODUCTOS EN EL LOCALSTORAGE */

export const saveProducts = (products) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

/* Crea un nuevo producto y lo agrega al almacenamiento */

export const createProduct = (product) => {
  const products = getProducts();

  const newProduct = {
    ...product,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  saveProducts([...products, newProduct]);
  return newProduct;
}

/* Actualiza un producto existente en el almacenamiento */

export const updateProduct = (id, updates) => {
  const products = getProducts();

  const updatedProducts = products.map((product) =>
    product.id === id
      ? { ...product,
          ...updates, 
          updatedAt: new Date().toISOString()
        }
      : product
  );

  saveProducts(updatedProducts);
}

/* Elimina un producto del almacenamiento (hard delete) */

export const deleteProduct = (id) => {
  const products = getProducts();
  const filtered = products.filter((product) => product.id !== id);
  saveProducts(filtered);
}