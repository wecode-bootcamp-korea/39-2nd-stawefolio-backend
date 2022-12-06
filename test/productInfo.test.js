const request = require('supertest');
const { createApp } = require('../app');
const { appDataSource } = require('../src/models/dataSource');

describe('GET product information by path params', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await appDataSource.initialize();
  });

  afterAll(async () => {
    await appDataSource.destroy();
  });

  test('FAILED : The product is not exist ', async () => {
    await request(app).get(encodeURI(`/products/99999`)).expect(404).expect({
      message: 'The requested information is not found',
    });
  });

  test('SUCCESS : Information of the product is exist', async () => {
    await request(app)
      .get(encodeURI(`/products/1`))
      .expect(200)
      .expect({
        data: [
          {
            id: 1,
            name: '레이크뷰',
            latitude: '37.8855687000',
            longitude: '127.7301849000',
            address: '강원도 춘천시 중앙로 1',
            rooms: [
              {
                id: 1,
                name: 'blue door',
                size: 28,
                price: 300000,
                features: ['주차', '정원', '산책로', '빔프로젝터'],
                amenities: [
                  'TV',
                  '냉장고',
                  '헤어드라이어',
                  '전자레인지',
                  '세면도구',
                  '캡슐커피',
                ],
                checkInTime: '15',
                description: '고요한 호수 속 운치를 만끽할 수 있는 스테이',
                checkOutTime: '11',
                numberOfGuests: 2,
                productOptionImageUrl: [
                  'https://cdn.pixabay.com/photo/2016/06/24/11/47/architecture-1477100_960_720.jpg',
                  'https://cdn.pixabay.com/photo/2017/08/06/11/22/web-2591485_960_720.jpg',
                ],
                availableProductOptionsId: [
                  '2023-01-01 00:00:00.000000',
                  '2023-01-02 00:00:00.000000',
                  '2023-01-03 00:00:00.000000',
                  '2023-01-04 00:00:00.000000',
                  '2023-01-05 00:00:00.000000',
                  '2023-01-06 00:00:00.000000',
                  '2023-01-07 00:00:00.000000',
                  '2023-01-08 00:00:00.000000',
                  '2023-01-09 00:00:00.000000',
                  '2023-01-10 00:00:00.000000',
                  '2023-01-11 00:00:00.000000',
                  '2023-01-12 00:00:00.000000',
                  '2023-01-13 00:00:00.000000',
                  '2023-01-14 00:00:00.000000',
                ],
              },
            ],
          },
        ],
      });
  });
});
