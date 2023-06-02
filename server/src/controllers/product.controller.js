const product = require("../services/product.service");
const commonUtils = require("../utils/common.util");

async function getProductList(req, res, next) {
  const { currentPage, limit, cateId, sortKey, sortType } = req?.query;
  try {
    const listProduct = await product.getProductList(
      limit,
      currentPage,
      cateId,
      sortKey,
      sortType
    );
    res.status(200).json(
      commonUtils.formatResponse("Get success!", 200, {
        ...listProduct,
      })
    );
  } catch (err) {
    console.error(`Error while get`, err.message);
    next(err);
  }
}

async function getProduct(req, res, next) {
  const { product_id } = req?.query;
  try {
    if (product_id) {
      const listProduct = await product.getProduct(product_id);
      res.status(200).json(
        commonUtils.formatResponse("Get success!", 200, {
          ...listProduct[0],
        })
      );
    } else {
      res
        .status(200)
        .json(
          commonUtils.formatResponse("Missing param product_id", 404, null)
        );
    }
  } catch (err) {
    console.error(`Error while get`, err.message);
    next(err);
  }
}

async function searchProduct(req, res, next) {
  const { currentPage, limit, searchText, sortKey, sortType } = req?.query;
  try {
    const listProduct = await product.searchProduct(
      limit,
      currentPage,
      searchText,
      sortKey,
      sortType
    );
    res.status(200).json(
      commonUtils.formatResponse("Get success!", 200, {
        ...listProduct,
      })
    );
  } catch (err) {
    console.error(`Error while get`, err.message);
    next(err);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const product_id = req?.body;
    if (!product_id) {
      res
        .status(404)
        .json(commonUtils.formatResponse("Missing product ID!!!", 404, null));
    } else {
    }
  } catch (error) {
    console.error(`Error while auth`, err.message);
    next(err);
  }
}

module.exports = {
  getProductList,
  searchProduct,
  getProduct,
  deleteProduct,
};
