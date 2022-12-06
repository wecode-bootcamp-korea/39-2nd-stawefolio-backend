const { customError } = require('../utils/errorHandler');
const { appDataSource } = require('./dataSource');

const getProductInfo = async (productId) => {
  try {
    const productInfo = await appDataSource.query(
      `
        SELECT
            p.id id,
            p.name name,
            p.latitude latitude,
            p.longitude longitude,
            p.address address,
            JSON_ARRAYAGG(
            JSON_OBJECT(
                "id", po.id,
                "name", po.name,
                "description", p.description,
                "checkInTime", po.check_in_time,
                "checkOutTime", po.check_out_time,
                "size", po.size,
                "price", po.price,
                "numberOfGuests", po.number_of_guests,
                "productOptionImageUrl",
                (SELECT
                  JSON_ARRAYAGG(
                    poi.image_url
                  )
                FROM product_option_image_url poi
                WHERE poi.product_option_id = ?),
                "features",
                (SELECT
                  JSON_ARRAYAGG(
                    f.name
                  )
                FROM product_options_features pof
                LEFT JOIN features f
                ON f.id = pof.feature_id
                    WHERE pof.product_option_id = ?),
                    "amenities",
                    (SELECT
                      JSON_ARRAYAGG(
                        a.name
                      )
                    FROM product_option_amenity poa
                    LEFT JOIN amenities a
                ON a.id = poa.amenity_id
                WHERE poa.product_option_id = ?),
                "availableProductOptionsId",
                (SELECT
                  JSON_ARRAYAGG(
                    apo.available_date
                  )
                FROM available_product_options apo
                WHERE apo.product_option_id = ?
                AND apo.is_available = 1)
              ))rooms
        FROM product_options po
        LEFT JOIN products p
        ON p.id = po.product_id
        WHERE po.product_id = ?
        GROUP BY po.id
    `,
      [productId, productId, productId, productId, productId]
    );

    const checkInTime = productInfo[0].rooms[0].checkInTime.slice(0, 2);
    const checkOutTime = productInfo[0].rooms[0].checkOutTime.slice(0, 2);

    productInfo[0].rooms[0].checkInTime = checkInTime;
    productInfo[0].rooms[0].checkOutTime = checkOutTime;

    return productInfo;
  } catch (error) {
    customError('The requested information is not found', 404);
  }
};

module.exports = { getProductInfo };
