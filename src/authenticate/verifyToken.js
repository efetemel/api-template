import jwt from "jsonwebtoken";
import { accessDenied, headerTokenName, invalidIpAdress, invalidToken, tokenSecret } from "../settings/index.js";
import { getUserById } from "../database/repository/userRepository.js";

function auth(req,res,next){
    const token = req.header(headerTokenName);
    if (!token) return res.status(401).send(accessDenied);
    try{
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const verified = jwt.verify(token,tokenSecret);
        getUserById(verified._id).then((res) => {
            if(verified.ipAddress == ip){
                req.user = verified;
                next();
            }
            else{
                res.status(401).send(invalidIpAdress);
            }
        }).catch((err) => {
            res.status(204).send(invalidToken);

        });

    }catch (err){
        res.status(401).send(invalidToken);
    }
}
export default auth;