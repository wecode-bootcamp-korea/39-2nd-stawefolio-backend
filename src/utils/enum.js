const orderByList = Object.freeze({
  priceAsc: `po.price ASC`,
  priceDesc: `po.price DESC`,
  newest: `p.created_at DESC`,
});

const orderStatus = Object.freeze({
  PAYMENTCOMPLETE : 1,
  ORDERCHECKING : 2,
  ORDERCOMPLETE : 3,
  STAYCOMPLETE : 4,
  ORDERCANCELING: 5,
  ORDERCANCELED : 6
})

module.exports = {
  orderByList, orderStatus
};
