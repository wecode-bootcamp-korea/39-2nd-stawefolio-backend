const { appDataSource } = require('./dataSource');

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
    const err = new Error('Invalid Data Input');
    err.statusCode = 500;
    throw err;
  }
};

const signup = async (kakaoId, name, email, profileImageUrl) => {
  try {
    return await appDataSource.query(
      `
      INSERT INTO users
        (
          kakao_id,
          name,
          email,
          profile_image_url
        )
      VALUES
        ( ?, ?, ?, ?)
      `,
      [kakaoId, name, email, profileImageUrl]
    );
  } catch (error) {
    const err = new Error('Invalid Data Input');
    err.statusCode = 500;
    throw err;
  }
};

module.exports = { signup, getUserByKakaoId };
