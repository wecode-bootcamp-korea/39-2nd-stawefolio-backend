const request = require('supertest');
const { createApp } = require('../app');
const { appDataSource } = require('../src/models/dataSource');

describe('GET product list by query params', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await appDataSource.initialize();
  });

  afterAll(async () => {
    await appDataSource.destroy();
  });

  test('FAILED : No data (region)', async () => {
    await request(app)
      .get(encodeURI('/products?region=달나라'))
      .expect(200)
      .expect({
        data: [],
        message: 'The requested information not found',
      });
  });

  test('FAILED : No data (keyword)', async () => {
    await request(app)
      .get(encodeURI(`/products?keyword=달나라`))
      .expect(200)
      .expect({
        data: [],
        message: 'The requested information not found',
      });
  });

  test('FAILED : Wrong data type', async () => {
    await request(app)
      .get(encodeURI(`/products?priceMin=달나라&priceMax=달나라`))
      .expect(404)
      .expect({ message: 'The requested information wrong' });
  });

  test('FAILED : No data (Incomplete date)', async () => {
    await request(app)
      .get(encodeURI(`/products?checkInDate='2023-1-1'`))
      .expect(200)
      .expect({ data: [], message: 'Incomplete request data' });
  });

  test('FAILED : No data (Incomplete price scope)', async () => {
    await request(app)
      .get(encodeURI(`/products?priceMin=500000`))
      .expect(200)
      .expect({ data: [], message: 'Incomplete request data' });
  });

  test('SUCCESS : Filtered products', async () => {
    await request(app)
      .get(encodeURI(`/products?region=제주&type=1&keyword=&type=2&type=3`))
      .expect(200)
      .expect({
        data: [
          {
            id: 16,
            name: '제주는 혼자 옵서예',
            TYPE: '한옥',
            region: '제주',
            numberOfGuests: 2,
            price: '300000',
            thumbnailImage:
              'https://cdn.pixabay.com/photo/2015/04/16/07/38/jeju-island-725175_960_720.jpg',
          },
          {
            id: 21,
            name: '푸른캠핑',
            TYPE: '캠핑',
            region: '제주',
            numberOfGuests: 10,
            price: '600000',
            thumbnailImage:
              'https://cdn.pixabay.com/photo/2019/10/18/05/04/tent-4558240_960_720.jpg',
          },
          {
            id: 25,
            name: '제주도푸른밤',
            TYPE: '캠핑',
            region: '제주',
            numberOfGuests: 2,
            price: '400000',
            thumbnailImage:
              'https://cdn.pixabay.com/photo/2020/09/19/04/27/fantasy-5583344_960_720.jpg',
          },
          {
            id: 4,
            name: '스테이 인 제주',
            TYPE: '펜션',
            region: '제주',
            numberOfGuests: 5,
            price: '700000',
            thumbnailImage:
              'https://images.pexels.com/photos/5733837/pexels-photo-5733837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          },
          {
            id: 7,
            name: '카리브제주',
            TYPE: '펜션',
            region: '제주',
            numberOfGuests: 2,
            price: '400000',
            thumbnailImage:
              'https://images.pexels.com/photos/1179156/pexels-photo-1179156.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          },
          {
            id: 9,
            name: '오버레인보우',
            TYPE: '펜션',
            region: '제주',
            numberOfGuests: 2,
            price: '500000',
            thumbnailImage:
              'https://images.pexels.com/photos/2480608/pexels-photo-2480608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          },
        ],
      });
  });
});
