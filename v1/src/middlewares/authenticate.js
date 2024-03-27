const JWT = require('jsonwebtoken');
const httpStatus = require('http-status');
const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(httpStatus.UNAUTHORIZED).send({message: "Unauthorized"});
    const [type, value] = token.split(' ');
    if (type !== 'Bearer') return res.status(httpStatus.UNAUTHORIZED).send({message: "Unauthorized"});
    JWT.verify(value, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
        if (err) return res.status(httpStatus.FORBIDDEN).send({message: "Forbidden"});
        req.user = user;
        next();
    });
}

module.exports = authenticate;
