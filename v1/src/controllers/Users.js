const {insert,list,loginUser} = require("../services/Users")
const httpStatus = require('http-status');
const {passwordHash,generateAccessToken,generateRefreshToken} = require("../scripts/utils/helper");

const create =  (req, res) => {
    req.body.password =  passwordHash(req.body.password);
    insert(req.body).then(response => {
        res.status(httpStatus.OK).send(response);
     }).catch(err => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
     });
};

const index =  (req, res) => {
    list().then(response => {
        res.status(httpStatus.OK).send(response);
     }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });

}
const login = (req,res) => {
    req.body.password =  passwordHash(req.body.password);
    loginUser(req.body).then(user => {
        if (!user) res.status(httpStatus.NOT_FOUND).send({message: "User not found"});
        user = {
            ...user.toObject(),
            tokens: {
                access_token: generateAccessToken(user),
                refresh_token: generateRefreshToken(user)
            }
        }
        delete user.password;
        res.status(httpStatus.OK).send(user);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
}
module.exports = {
    create,
    index,
    login
}
