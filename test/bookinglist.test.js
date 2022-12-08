const { token } = require('morgan');
const request = require('supertest');

const { createApp } = require('../app');
const { appDataSource } = require('../src/models/dataSource');

describe('bookingListTest', () => {
    let app;

    beforeAll(async () => {
        app = createApp();
        await appDataSource.initialize();
    });

    afterAll(async () => {
        app = createApp();
        await appDataSource.destroy();
    });

    /*
    test('_', async () => {
        await request(app)
            .메소드(엔드포인트)
            .send(body에보내는값)
            .expect(해당사항에맞는statuscode)
            .expect(그에대한응답메세지)
    });
*/
    test('SUCCESS : getBookingList', async () => {
        await request(app)
            .get('/booking/list?orderStatus=3')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwia2FrYW9JZCI6IjI1NjU3NzkyNTgiLCJpYXQiOjE2NzA0ODAwNjIsImV4cCI6MTY3MTY4OTY2MiwiaXNzIjoic3Rhd2Vmb2xpbyJ9.70Qhb4VS-0EVHdRFgjiev9iFTpn8QNKyV8bcvnr8zYM')
            .expect(200)
            .expect({
                "name": "이은영",
                "reservation": [
                    {
                        "src": "https://i.pinimg.com/564x/c1/ed/83/c1ed8313018612d59bd131a94124d2f5.jpg",
                        "area": "강원",
                        "type": "한옥",
                        "used": 3,
                        "price": 550000,
                        "title": "마운틴빌라",
                        "orderid": 1,
                        "checkInDate": "2022-12-28",
                        "checkOutDate": "2022-12-30",
                        "numberOfGuests": 5
                    },
                    {
                        "src": "https://cdn.pixabay.com/photo/2016/07/16/14/20/holiday-house-1522051_960_720.jpg",
                        "area": "강원",
                        "type": "캠핑",
                        "used": 3,
                        "price": 300000,
                        "title": "레이크뷰",
                        "orderid": 21,
                        "checkInDate": "2023-01-01",
                        "checkOutDate": "2023-01-06",
                        "numberOfGuests": 2
                    }
                ]
            })
    });
});