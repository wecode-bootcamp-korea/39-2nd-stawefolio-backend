const orderByList = Object.freeze({
  priceAsc: `po.price ASC`,
  priceDesc: `po.price DESC`,
  newest: `p.created_at DESC`,
});

module.exports = {
  orderByList,
};
