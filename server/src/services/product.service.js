const db = require("./db.service");

async function getProductList(
  limitRecord = 10,
  currentPage = 1,
  cateId = null,
  sortKey = "name",
  sortType = "ASC",
) {
  const getTotal = await db.query(
    `select count(product_id) as total from product ${
      cateId ? `where cate_id = "${cateId}"` : ""
    }`,
  );
  if (getTotal.length > 0 && getTotal[0].total > 0) {
    const totalRecord = getTotal[0].total;
    const totalPage = Math.ceil(totalRecord / limitRecord);
    if (currentPage > totalPage) {
      currentPage = totalPage;
    } else if (currentPage < 1) {
      currentPage = 1;
    }
    const start = (currentPage - 1) * limitRecord;
    const data = await db.query(
      `SELECT * FROM product ${
        cateId ? `where cate_id = ${cateId}` : ""
      } ORDER BY ${sortKey} ${sortType} LIMIT ${start}, ${limitRecord}`,
    );
    return {
      dataArray: data,
      currentPage: Number(currentPage),
      totalPage: Number(totalPage),
      limit: Number(limitRecord),
      totalRecord: Number(totalRecord),
    };
  } else {
    return {
      dataArray: [],
      currentPage: Number(currentPage),
      totalPage: 0,
      limit: Number(limitRecord),
      totalRecord: 0,
    };
  }
}

async function getProduct(product_id) {
  const query = await db.query(
    `SELECT * FROM product WHERE product_id = ${product_id}`,
  );
  return query;
}

async function searchProduct(
  limitRecord = 10,
  currentPage = 1,
  searchText = "",
  sortKey = "name",
  sortType = "ASC",
) {
  const getTotal = await db.query(
    `select count(product_id) as total from product WHERE name LIKE '%${searchText}%'`,
  );
  if (getTotal.length > 0 && getTotal[0].total > 0) {
    const totalRecord = getTotal[0].total;
    const totalPage = Math.ceil(totalRecord / limitRecord);
    if (currentPage > totalPage) {
      currentPage = totalPage;
    } else if (currentPage < 1) {
      currentPage = 1;
    }
    const start = (currentPage - 1) * limitRecord;
    const data = await db.query(
      `SELECT * FROM product WHERE name LIKE '%${searchText}%' ORDER BY ${sortKey} ${sortType} LIMIT ${start}, ${limitRecord}`,
    );
    return {
      dataArray: data,
      currentPage: Number(currentPage),
      totalPage: Number(totalPage),
      limit: Number(limitRecord),
      totalRecord: Number(totalRecord),
    };
  } else {
    return {
      dataArray: [],
      currentPage: Number(currentPage),
      totalPage: 0,
      limit: Number(limitRecord),
      totalRecord: 0,
    };
  }
}

module.exports = {
  getProductList,
  searchProduct,
  getProduct,
};
