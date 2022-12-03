const enums = require('../utils/enum');
const queryBuilder = async (
  keyword,
  checkInDate,
  checkOutDate,
  region,
  numberOfGuests,
  priceMin,
  priceMax,
  theme,
  type,
  orderBy
) => {
  let hopeDate;
  let priceScope;
  let indexOfGuests;
  if (checkInDate && checkOutDate)
    hopeDate = `'${checkInDate}' AND '${checkOutDate}'`;
  if (priceMin && priceMax) {
    priceScope = `${priceMin} AND ${priceMax}`;
  }
  if (numberOfGuests <= 2) indexOfGuests = 2;
  else if (numberOfGuests <= 5) indexOfGuests = 5;
  else if (numberOfGuests <= 10) indexOfGuests = 10;

  const whereCondition = Object.freeze({
    keyword: keyword,
    hopeDate: hopeDate,
    region: region,
    numberOfGuests: indexOfGuests,
    priceScope: priceScope,
    theme: theme,
    type: type,
  });

  const whereConditionQuery = Object.freeze({
    hopeDate: `(apo.available_date BETWEEN ${whereCondition.hopeDate})`,
    priceScope: `(po.price BETWEEN ${whereCondition.priceScope})`,
    region: `p.regions = '${region}'`,
    numberOfGuests: `po.number_of_guests = ${whereCondition.numberOfGuests}`,
    theme: `s.name = '${whereCondition.theme}'`,
    type: `m.id IN (${whereCondition.type})`,
    keyword: `(p.address LIKE '%${whereCondition.keyword}%' OR p.regions LIKE '%${whereCondition.keyword}%' OR p.name LIKE '%${whereCondition.keyword}%')`,
  });

  let whereQuery = `WHERE apo.is_available = 1`;

  for (key in whereCondition) {
    whereCondition[key] !== undefined
      ? (whereQuery += ` AND ` + whereConditionQuery[key])
      : ``;
  }

  if (!orderBy) {
    orderBy = 'newest';
  }

  const orderByQuery = `ORDER BY ${enums.orderByList[orderBy]}`;

  return { whereQuery: whereQuery, orderByQuery: orderByQuery };
};

module.exports = { queryBuilder };
