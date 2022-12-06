const { appDataSource } = require('./dataSource');

const getBookingList = async (orderStatus, userId) => {
    try {
        return await appDataSource.query(
        `SELECT
            u.kakao_id kakaoId,
            u.name name,
            o.id id,
            p.name title,
            mc.name type,
            p.regions area,
            po.number_of_guests numberOfGuests,
            po.price price,
            o.check_in_date checkInDate,
            o.check_out_date checkOutDate,
            p.thumbnail_image_url src,
            os.id used
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
    } catch {
        const err = new Error('unable to verify user');
        err.statusCode = 401;
        throw err;
    }
};

module.exports = { getBookingList };