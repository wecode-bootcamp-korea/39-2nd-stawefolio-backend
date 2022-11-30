const authDao = require('../models/authDao');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const getKakaoAccessToken = async (kakaoAuthorizationCode) => {
  return await axios({
    method: 'post',
    url: 'https://kauth.kakao.com/oauth/token',
    baseURL: 'https://kauth.kakao.com/',
    params: {
      grant_type: 'authorization_code',
      client_id: process.env.KAKAO_API_KEY,
      redirect_uri: process.env.KAKAO_REDIRECT_URI,
      code: kakaoAuthorizationCode,
      client_secret: process.env.KAKAO_CLIENT_SECRET_KEY,
    },
  });
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

const auth = async (kakaoId, name, email, isVerifiedEmail, profileImageUrl) => {
  const user = await authDao.getUserByKakaoId(kakaoId);

  if (!user) {
    await authDao.signup(kakaoId, name, email, profileImageUrl);
  }

  if (!isVerifiedEmail) {
    email = null;
  }

  const jwtToken = await signin(kakaoId);

  return jwtToken;
};

const signin = async (kakaoId) => {
  return jwt.sign(
    {
      expiresIn: '14 days',
      issuer: 'stawefolio',
      kakaoId: kakaoId,
    },
    process.env.JWT_SECRET_KEY
  );
};

module.exports = { auth, getKakaoAccessToken, getKakaoUserInfo };
