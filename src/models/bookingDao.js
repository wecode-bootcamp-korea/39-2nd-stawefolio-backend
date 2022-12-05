const { appDataSource } = require('./dataSource');

const postBooking = async (orderNumber, productOptionId, numberOfUser, checkIn, checkOut, price, userId, orderStatus) => {
    try {
        return await appDataSource.query(
        `INSERT INTO
            orders(
                order_number, 
                product_option_id,
                number_of_user,
                check_in_date,
                check_out_date,
                price,
                user_id,
                order_status_id)
        VALUES
            (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [ orderNumber, productOptionId, numberOfUser, checkIn, checkOut, price, userId, orderStatus ]
    );
    } catch (err) {
    const error = new Error('invalid_data_input');
    error.statusCode = 400
    throw error;
    }
};

const updateAvailablity = async (productOptionId, availableDate) => {
    return await appDataSource.query(
        `UPDATE
            available_product_options
        SET
            is_available = 0
        WHERE
            available_date IN (?)
        AND product_option_id = ?
        `,
        [ availableDate, productOptionId ]
    )
};

module.exports = { postBooking, updateAvailablity };