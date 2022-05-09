import post from "../schemas/postSchema.js";
import user from "../schemas/userSchema.js";
import { ObjectId } from "mongodb";


async function getPostByTitle(title){
    if(typeof title === "undefined"){
        throw new Error("Gönderdiğiniz başlık geçersiz!");
    }
    try {
        const result = await post.findOne({title:title});
        if (result == null)
            throw new Error("Gönderdiğiniz title a ait bir post bulunamadı!");
        return result;
    }
    catch (err){
        throw new Error("Gönderdiğiniz title a ait bir post bulunamadı!");
    }
}

async function getAllPosts(){
    try {
        const result = await post.find({});
        if (result == null)
            throw new Error("Post bulunamadı!");
        return result;
    }
    catch (err){
        throw new Error("Post bulunamadı!");
    }
}

async function addPost(postItem){
    try{
        const savedPost = await post.create({
            title:postItem.title,
            contentText:postItem.contentText,
            contentImage:postItem.contentImage,
            author:postItem.author,
            timeStamp:postItem.timeStamp
        });
        return savedPost;
        
    }
    catch(err){
        throw new Error(err.messsage);
    }
}

async function getMyNewPosts(){
    try {
        const result = await post.find({timeStamp:{$gte:new Date().toISOString()}});
        if (result == null)
            throw new Error("post bulunamadı!");
        return result;
    }
    catch (err){
        throw new Error("post bulunamadı!");
    }
}

export { getPostByTitle, getAllPosts,addPost,getMyNewPosts }