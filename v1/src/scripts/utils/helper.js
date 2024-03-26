const hmacSha1 = require('crypto-js/hmac-sha1');
const hmacSha256 = require('crypto-js/hmac-sha256');
const JWT = require('jsonwebtoken');
const passwordHash = (password) => {
    return hmacSha256(password,hmacSha1(password, process.env.PASSWORD_SECRET).toString()).toString();
}
const generateAccessToken = (user) => {
    return JWT.sign({name:user.full_name,...user}, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '15m' });
}
const generateRefreshToken = (user) => {
    return JWT.sign({name:user.full_name,...user}, process.env.REFRESH_TOKEN_SECRET_KEY);
}
module.exports = {
    passwordHash,
    generateAccessToken,
    generateRefreshToken
}
