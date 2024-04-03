const {insert,list,loginUser, update} = require("../services/Users")
const httpStatus = require('http-status');
const {passwordHash,generateAccessToken,generateRefreshToken} = require("../scripts/utils/helper");
const projectService = require('../services/Projects');
const uuid = require('uuid');
const eventEmitter = require('../scripts/events/eventEmitter');
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
        if (!user) return res.status(httpStatus.NOT_FOUND).send({message: "User not found"});
        user = {
            ...user?.toObject(),
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
const getProjects = async (req,res) => {
    return projectService.getProjects({user_id: req.user?._doc?._id}).then(response => {
        res.status(httpStatus.OK).send(response);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
}
const resetPassword = async (req,res) => {
    eventEmitter.emit('send_email', req.body.email);
    const {email} = req.body;
    const newPassword = uuid.v4()?.split("-")[0] || `usr-${new Date().getTime()}`;
    update({email}, {password: passwordHash(newPassword)}).then((response) => {
        if (!response) return res.status(httpStatus.NOT_FOUND).send({message: "User not found"});
        // send email
        eventEmitter.emit('send_email', {
            to: response?.email, // list of receivers
            subject: "Şifre sıfırlama", // Subject line
            html: `Talebiniz üzere şifre sıfırlama işleminiz gerçekleşmiştir. 
            </br> Giriş yaptıktan sonra şifrenizi değiştiriniz. Yeni şifreniz: ${newPassword}`, // html body
        });
        // send response
        res.status(httpStatus.OK).send({message: "Şifre sıfırlama işlemi başarılı. Yeni şifreniz mail adresinize gönderilmiştir."});
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
}

module.exports = {
    create,
    index,
    login,
    getProjects,
    resetPassword
}
