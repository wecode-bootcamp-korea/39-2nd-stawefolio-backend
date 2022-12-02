const { asyncWrap } = require('../utils/errorHandler');
const authService = require('../services/authService');

const auth = asyncWrap(async (req, res) => {
  const { kakaoAuthorizationCode } = req.query;

  if (!kakaoAuthorizationCode) {
    const err = new Error('No Authorization Code');
    err.statusCode = 400;
    throw err;
  }

  const { data: kakaoAccessToken } = await authService.getKakaoAccessToken(
    kakaoAuthorizationCode
  );

  const { data: kakaoUserInfo } = await authService.getKakaoUserInfo(
    kakaoAccessToken
  );

  const jwtToken = await authService.auth(
    kakaoUserInfo.sub,
    kakaoUserInfo.nickname,
    kakaoUserInfo.email,
    kakaoUserInfo.email_verified,
    kakaoUserInfo.picture
  );

  return await res.status(200).json({ jwtToken: jwtToken });
});

module.exports = { auth };
