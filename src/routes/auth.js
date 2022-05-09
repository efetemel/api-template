import express from 'express';
import jwt from "jsonwebtoken";
import {getUserById, register, signIn} from "../database/repository/userRepository.js";
import { headerTokenName, tokenExpired, tokenSecret } from "../settings/index.js";
import auth from "../authenticate/verifyToken.js";

const router = express.Router();

router.post('/signIn',(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    signIn(email,password).then((response) => {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const token = jwt.sign({_id:response._id, ipAddress:ip},tokenSecret, {expiresIn: tokenExpired});
        res.header(headerTokenName,token).send(
            {
                "token":token,
                "email":response.email,
                "profilePhoto":response.profilePhoto,
                "timeStamp":response.timeStamp,
            }
        );
    }).catch((err) => {
        res.status(400).send(err.message);
    });


});

router.get('/getSettings',auth,(req,res) => {
    const token = req.header(headerTokenName);
    const verified = jwt.verify(token,tokenSecret);
    getUserById(verified._id).then((response) => {
        const user = {
            "email":response.email,
            "profilePhoto":response.profilePhoto,
            "timeStamp":response.timeStamp,
        }
        res.send(user);
    });
});


export default router;