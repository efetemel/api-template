import { getDb } from "../index.js";

const myDb = getDb();

let userSchema = new myDb.Schema({
    email:{type:String,required:[true,"E-posta alanı zorunludur."]},
    password:{type:String,required:[true,"Şifre alanı zorunludur."]},
    profilePhoto:{type:String},
    timeStamp:{type:String,required:[true,"timeStamp alanı zorunludur."]}
});

let user = myDb.model('user',userSchema);
export default user;