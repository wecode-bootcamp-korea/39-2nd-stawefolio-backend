const request = require('supertest');
const axios = require('axios');
jest.mock('axios');
const { createApp } = require('../app');
const { appDataSource } = require('../src/models/dataSource');
const authController = require('../src/controllers/authController');

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
      access_token: 'YhYmri2A5ZOAXXTMhyTJRwMXSPOX77em5BaeoMcBCilwEwAAAYTL2kNi',
    });

    await axios.mockResolvedValue({
      sub: '2556810322',
      email: 'yhkyhk92@naver.com',
    });

    await request(app)
      .get(
        '/auth?kakaoAuthorizationCode=-YyVRzXeWAYpm7bCxP-7kdBI2383Ny5o_aXji32LOBCagKrWXYdlvQWfrmxQXokZUWhhaAo9dVoAAAGEy9n8Dg'
      )
      .expect(200);
  });

  test('LOGIN FAILED : No Authorization Code', async () => {
    await request(app).get('/auth?kakaoAuthorizationCode=').expect(400);
  });
});
