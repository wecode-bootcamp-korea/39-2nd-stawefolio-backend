const request = require('supertest');
const axios = require('axios');
jest.mock('axios');
const { createApp } = require('../app');
const { appDataSource } = require('../src/models/dataSource');

describe('Log in Test', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await appDataSource.initialize();
  });

  afterAll(async () => {
    await appDataSource.query(`SET FOREIGN_KEY_CHECKS = 0`);
    await appDataSource.query(`TRUNCATE users`);
    await appDataSource.query(`SET FOREIGN_KEY_CHECKS = 1`);
    await appDataSource.destroy();
  });

  test('LOGIN SUCCESS', async () => {
    await axios.mockResolvedValue({
      data: { access_token: 'token' },
    });

    await axios.mockResolvedValue({
      data: {
        sub: '1234',
        nickname: 'me',
        picture: 'myprofile.jpg',
        email: 'email@email.com',
        email_verified: true,
        gender: 'male',
        birthdate: '0000-04-19',
      },
    });

    await request(app).get('/auth?kakaoAuthorizationCode=codewhy').expect(200);
  });

  test('LOGIN FAILED : No Authorization Code', async () => {
    await request(app).get('/auth?kakaoAuthorizationCode=').expect(400);
  });
});
