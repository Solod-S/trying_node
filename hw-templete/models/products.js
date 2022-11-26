// const fs = require('fs/promises')

// const listContacts = async () => {}

// const getContactById = async (contactId) => {}

// const removeContact = async (contactId) => {}

// const addContact = async (body) => {}

// const updateContact = async (contactId, body) => {}

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }
const path = require("path");
const fs = require("fs").promises;
const { v4 } = require("uuid");

const productPath = path.resolve("./models/products.json");

async function listProducts() {
  const products = await fs.readFile(productPath, "utf8");
  const result = await JSON.parse(products);
  return result;

  // try {
  //   const products = await fs.readFile(productPath, "utf8");
  //   const result = await JSON.parse(products);
  //   return result;
  // } catch (error) {
  //   console.error(error);
  //   throw new Error(error);
  // }
}

async function getProductById(id) {
  const products = await listProducts();
  const result = products.find((item) => item.id === id.toString());
  return result;

  // try {
  //   const products = await listProducts();
  //   const result = products.find((item) => item.id === id.toString());
  //   return result;
  // } catch (error) {
  //   console.error(error);
  //   throw new Error(error);
  // }
  //   return contact;
}

async function removeProduct(id) {
  const productForDell = await getProductById(id);
  if (productForDell) {
    const prewProducts = await listProducts();
    const newProducts = await prewProducts.filter(
      (product) => product.id !== id.toString()
    );
    await fs.writeFile(productPath, JSON.stringify(newProducts));
    console.log(`Product with id: ${id} was successfully deleted!`);
    return productForDell;
  } else {
    return null;
  }

  // const prewProducts = await listProducts();
  // const newProducts = await prewProducts.filter(
  //   (product) => product.id !== id.toString()
  // );
  // try {
  //   await fs.writeFile(productPath, JSON.stringify(newProducts));
  //   console.log(`Product with id: ${id} was successfully deleted!`);
  //   const updatedProducts = await listProducts();
  //   return updatedProducts;
  // } catch (error) {
  //   console.error(error);
  //   throw new Error(error);
  // }
}

async function addProduct({ name, price }) {
  const products = await listProducts();
  const newProduct = { id: v4(), name, price };
  const updateProducts = [...products, newProduct];
  await fs.writeFile(productPath, JSON.stringify(updateProducts));
  console.table(`New product: ${name}, price: ${price} = was created!`);
  const updatedProduct = await listProducts();
  return updatedProduct;

  //  try {
  //    const newProduct = { _id: v4(), name, price };
  //    const updateProducts = [...products, newProduct];
  //    await fs.writeFile(productPath, JSON.stringify(updateProducts));
  //    console.table(`New product: ${name}, price: ${price} = was created!`);
  //    const updatedProduct = await listProducts();
  //    return updatedProduct;
  //  } catch (error) {
  //    console.log(error);
  //    throw new Error(error);
  //  }
}
async function updateProduct(id, { name, price }) {
  const allProducts = await listProducts();
  const productIndex = allProducts.findIndex((product) => product.id === id);
  if (productIndex !== -1) {
    allProducts[productIndex].price = price;
    allProducts[productIndex].name = name;

    await fs.writeFile(productPath, JSON.stringify(allProducts));
    return allProducts[productIndex];
  } else {
    return null;
  }
}
module.exports = {
  listProducts,
  getProductById,
  removeProduct,
  addProduct,
  updateProduct,
};
