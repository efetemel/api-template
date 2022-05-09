import { getDb } from "../index.js";

const myDb = getDb();

let postSchema = new myDb.Schema({
    title:{type:String,required:[true,"Başlık alanı zorunludur."]},
    contentText:{type:String},
    contentImage:{type:String},
    timeStamp:{type:String}
});

let post = myDb.model('post',postSchema);

export default post;