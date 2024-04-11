const httpStatus = require('http-status');
const {passwordHash,generateAccessToken,generateRefreshToken} = require("../scripts/utils/helper");
const ProjectService = require('../services/ProjectService');
const uuid = require('uuid');
const eventEmitter = require('../scripts/events/eventEmitter');
const path = require('path');
const fs = require('fs');
const UserServices = require('../services/UserService');
const ApiErrors = require("../errors/ApiErrors");

class UserController {

    create(req, res, next){
        req.body.password =  passwordHash(req.body.password);
        UserServices.create(req.body).then(response => {
            res.status(httpStatus.OK).send(response);
        }).catch((err) => next(new ApiErrors(err?.message, httpStatus.INTERNAL_SERVER_ERROR)));
    };
    index =  (req, res, next) => {
        UserServices.list().then(response => {
            res.status(httpStatus.OK).send(response);
        }).catch((err) => next(new ApiErrors(err?.message, httpStatus.INTERNAL_SERVER_ERROR)));

    }
    login = (req,res, next) => {
        req.body.password =  passwordHash(req.body.password);
        UserServices.findOne(req.body).then(user => {
            if (!user) return next(new ApiErrors("User not found", httpStatus.NOT_FOUND));
            user = {
                ...user?.toObject(),
                tokens: {
                    access_token: generateAccessToken(user),
                    refresh_token: generateRefreshToken(user)
                }
            }
            delete user.password;
            res.status(httpStatus.OK).send(user);
        }).catch((err) => next(new ApiErrors(err?.message, httpStatus.INTERNAL_SERVER_ERROR)));
    }
    getProjects = async (req,res, next) => {
        return ProjectService.list({user_id: req.user?._doc?._id}).then(response => {
            res.status(httpStatus.OK).send(response);
        }).catch((err) => next(new ApiErrors(err?.message, httpStatus.INTERNAL_SERVER_ERROR)));
    }
    resetPassword(req,res, next) {
        eventEmitter.emit('send_email', req.body.email);
        const {email} = req.body;
        const newPassword = uuid.v4()?.split("-")[0] || `usr-${new Date().getTime()}`;
        UserServices.updateWhere({email}, {password: passwordHash(newPassword)}).then((response) => {
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
        }).catch((err) => next(new ApiErrors(err?.message, httpStatus.INTERNAL_SERVER_ERROR)));
    }
    updateUser(req,res, next){
        UserServices.update(req.user?._doc?._id, req.body).then(response => {
            if (!response) return next(new ApiErrors("User not found", httpStatus.NOT_FOUND));
            res.status(httpStatus.OK).send(response);
        }).catch((err) => next(new ApiErrors(err?.message, httpStatus.INTERNAL_SERVER_ERROR)));
    }
    deleteUser(req,res, next){
        console.log(req.user?._doc?._id, req.params?.id)
        if (req.user?._doc?._id === req.params.id) return next(new ApiErrors("You can't delete yourself", httpStatus.FORBIDDEN));
        UserServices.delete({_id: req.params?.id}).then(response => {
            if (!response) return next(new ApiErrors("User not found", httpStatus.NOT_FOUND));
            res.status(httpStatus.OK).send({message: "User deleted"});
        }).catch((err) => next(new ApiErrors(err?.message, httpStatus.INTERNAL_SERVER_ERROR)));
    }
   async changePassword(req,res,next){
        req.body.password =  passwordHash(req.body.new_password);
        //check old password is correct
        const user = await UserServices.findOne({_id: req.user?._doc?._id, password: passwordHash(req.body.old_password)});
        if (!user) return res.status(httpStatus.UNAUTHORIZED).send({message: "Old password is incorrect"});
        UserServices.update(req.user?._doc?._id, req.body).then(response => {
            if (!response) return next(new ApiErrors("User not found", httpStatus.NOT_FOUND));
            const userData = {
                ...user?.toObject(),
                tokens: {
                    access_token: generateAccessToken(user),
                    refresh_token: generateRefreshToken(user)
                }
            }
            delete userData.password;
            res.status(httpStatus.OK).send(userData);
        }).catch((err) => next(new ApiErrors(err?.message, httpStatus.INTERNAL_SERVER_ERROR)));
    }
    async updateProfileImage(req,res,next){
        // check file exist in request
        if (!req?.files?.profile_image) return next(new ApiErrors("Profile image is required", httpStatus.BAD_REQUEST));
        // check file type
        const extension = path.extname(req.files.profile_image.name);
        const fileName = `${req.user?._doc?._id}${extension}`;
        const filePath = path.join(__dirname, '../' ,"uploads/users", fileName);
        const checkFolderPath = path.join(__dirname, '../' ,"uploads/users");
        // check folder exist
        if (!fs.existsSync(checkFolderPath)) fs.mkdirSync(checkFolderPath, { recursive: true });

        //check file names are same if same delete old file if not move new file
        if (req.user?._doc?.profile_image && req.user?._doc?.profile_image !== '/uploads/users/'+fileName) {
            const oldFilePath = path.join(__dirname, '../' ,req.user?._doc?.profile_image);
            if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
        }
        // move file to folder
        await req.files.profile_image.mv(filePath, function (err) {
            if (err) return next(new ApiErrors(err?.message, httpStatus.INTERNAL_SERVER_ERROR));
            UserServices.update(req.user?._doc?._id, { profile_image: '/uploads/users/'+fileName }).then(response => {
                if (!response) return next(new ApiErrors("User not found", httpStatus.NOT_FOUND));
                res.status(httpStatus.OK).send(response);
            }).catch((err) => next(new ApiErrors(err?.message, httpStatus.INTERNAL_SERVER_ERROR)));
        })
    }
}
module.exports = new UserController();
