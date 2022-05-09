import user from "../schemas/userSchema.js";
import { ObjectId }  from "mongodb";
import bcrypt from "bcrypt";
import {
    notAuthDto,
    notFoundUser,
    registeredEmail,
    sendInvalid,
    wrongLogin
} from "../../settings/index.js";

async function getUserById(id){
    if(typeof id === "undefined"){
        throw new Error(sendInvalid);
    }
    try {
        var o_id = new ObjectId(id);
        const result = await user.findById({_id:o_id});
        if (result == null)
            throw new Error(sendInvalid);
        return result;
    }
    catch (err){
        throw new Error(sendInvalid);
    }
}

async function getUserByUsername(userName){
    if(typeof userName === "undefined"){
        throw new Error(sendInvalid);
    }
    try {
        const result = await user.findOne({userName:userName});
        if (result == null)
            throw new Error(notFoundUser);
        const userDto = notAuthDto;
        userDto.profilePhoto = result.profilePhoto;
        userDto.timeStamp = result.timeStamp;
        return userDto;
    }
    catch (err){
        throw new Error(notFoundUser);
    }
}


async function register(userInfo){
    if(typeof userInfo === "undefined"){
        throw new Error(sendInvalid);
    }

    const checkEmail = await user.findOne({email:userInfo.email})

    if(checkEmail) throw new Error(registeredEmail);

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(userInfo.password,salt);

    const savedUser = await user.create({
        email:userInfo.email,
        password:hashPassword,
        profilePhoto:userInfo.profilePhoto,
        timeStamp:userInfo.timeStamp
    });

    return savedUser;
}

async function signIn(emailOrUserName,password){
    if(typeof emailOrUserName === "undefined" || typeof password === "undefined" ){
        throw new Error(sendInvalid);
    }
    try{
        const result = await user.findOne({email:emailOrUserName})
        if (result == null)
            throw new Error(wrongLogin);
        const validPass = await bcrypt.compare(password,result.password);
        if (!validPass)
            throw new Error(wrongLogin);

        return result;
    }
    catch (err){
        throw new Error(notFoundUser);
    }
}

export { getUserById, getUserByUsername, signIn, register }