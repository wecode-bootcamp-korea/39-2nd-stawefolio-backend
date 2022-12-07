const { appDataSource } = require('./dataSource');

const getBookingList = async (orderStatus, userId) => {
    try {
        const result = await appDataSource.query(
        `SELECT
            u.name name,
        JSON_ARRAYAGG(
        JSON_OBJECT(
            "orderid", o.id,
            "title", p.name,
            "type", mc.name,
            "area", p.regions,
            "numberOfGuests", po.number_of_guests,
            "price", po.price,
            "checkInDate", o.check_in_date,
            "checkOutDate", o.check_out_date,
            "src", p.thumbnail_image_url,
            "used", os.id 
        )) reservation
        FROM
            orders o
        INNER JOIN
            order_status os ON o.order_status_id = os.id
        INNER JOIN
            product_options po ON o.product_option_id = po.id
        INNER JOIN
            products p ON po.product_id = p.id
        INNER JOIN
            main_categories_sub_categories mcsc ON p.category_id = mcsc.id
        INNER JOIN
            sub_categories sc ON mcsc.sub_category_id = sc.id
        INNER JOIN
            main_categories mc ON mcsc.main_category_id = mc.id
        INNER JOIN
            users u ON o.user_id = u.id
        WHERE
            user_id = ? AND order_status_id = ?
        `, [ userId, orderStatus ]
        );

        result[0].reservation.map(item => item.checkInDate = item.checkInDate.slice(0,10))
        result[0].reservation.map(item => item.checkOutDate = item.checkOutDate.slice(0,10))

        return result
    } catch {
        const err = new Error('unable to verify user');
        err.statusCode = 401;
        throw err;
    }
};

module.exports = { getBookingList };