import Product from "../models/ProductModel.js";

export const getProduct = async (req, res) => {
  try {
    const response = await Product.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const response = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { product_name, type, price, merk, stock } = req.body;
  try {
    const existingProduct = await Product.findOne({ where: { type } });

    if (existingProduct) {
      return res
        .status(400)
        .json({ msg: "Product with this type already exists" });
    }
    const newProduct = await Product.create({
      product_name: product_name,
      type: type,
      price: price,
      merk: merk,
      stock: stock,
    });
    res.status(201).json({ msg: "Insert Product Succes", product: newProduct });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const product = await Product.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!product) return res.status(404).json({ msg: "Product Not Found" });
  const { product_name, type, price, merk, stock } = req.body;
  try {
    await Product.update(
      {
        product_name: product_name,
        type: type,
        price: price,
        merk: merk,
        stock: stock,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Product Updated Success" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!product) {
      return res.status(404).json({ msg: "Product Not Found" });
    }

    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({ msg: "Product Deleted Successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ msg: error.message });
  }
};
