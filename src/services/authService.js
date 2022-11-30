const authDao = require('../models/authDao');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { customError } = require('../utils/errorHandler');

const getKakaoAccessToken = async (authorizationCode) => {
  return await axios({
    method: 'post',
    url: 'https://kauth.kakao.com/oauth/token',
    baseURL: 'https://kauth.kakao.com/',
    params: {
      grant_type: 'authorization_code',
      client_id: process.env.KAKAO_API_KEY,
      redirect_uri: process.env.KAKAO_REDIRECT_URI,
      code: authorizationCode,
      client_secret: process.env.KAKAO_CLIENT_SECRET_KEY,
    },
  })
    .then((data) => data)
    .catch(() => customError('Kakao Server Error', 400));
};

const getKakaoUserInfo = async (kakaoAccessToken) => {
  return await axios({
    method: 'get',
    url: 'https://kapi.kakao.com/v1/oidc/userinfo',
    headers: {
      Authorization: `Bearer ${kakaoAccessToken.access_token}`,
    },
  });
};

const getUserByKakaoId = async (kakaoId) => {
  return await authDao.getUserByKakaoId(kakaoId);
};

const signin = async (kakaoId) => {
  const { id: userId } = await getUserByKakaoId(kakaoId);

  return jwt.sign(
    { id: userId, kakaoId: kakaoId },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '14 days',
      issuer: 'stawefolio',
    }
  );
};

const auth = async (authorizationCode) => {
  const { data: kakaoAccessToken } = await getKakaoAccessToken(
    authorizationCode
  );

  const { data: kakaoUserInfo } = await getKakaoUserInfo(kakaoAccessToken);

  if (!kakaoUserInfo.email_verified) {
    email = null;
  }

  const user = await getUserByKakaoId(kakaoUserInfo.sub);

  if (!user)
    await authDao.signup(
      kakaoUserInfo.sub,
      kakaoUserInfo.nickname,
      kakaoUserInfo.email,
      kakaoUserInfo.picture
    );

  const jwtToken = await signin(kakaoUserInfo.sub);

  return jwtToken;
};

module.exports = { auth, getKakaoAccessToken, getKakaoUserInfo };
