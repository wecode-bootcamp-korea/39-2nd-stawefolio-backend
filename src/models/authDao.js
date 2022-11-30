const { appDataSource } = require('./dataSource');
const { customError } = require('../utils/errorHandler');

const getUserByKakaoId = async (kakaoId) => {
  try {
    const [user] = await appDataSource.query(
      `
      SELECT
          id,
          kakao_id,
          name,
          email,
          phone_number,
          profile_image_url
      FROM users
      WHERE kakao_id = ?
      `,
      [kakaoId]
    );

    return user;
  } catch (error) {
    customError('The requested information not found', 404);
  }
};

const signup = async (kakaoId, name, email, profileImageUrl) => {
  try {
    return await appDataSource.query(
      `
      INSERT INTO users(
          kakao_id,
          name,
          email,
          profile_image_url
      )VALUES
          ( ?, ?, ?, ?)
      `,
      [kakaoId, name, email, profileImageUrl]
    );
  } catch (error) {
    customError('User already exists', 409);
  }
};

module.exports = { signup, getUserByKakaoId };
