// import PostMessage from "../models/postMessage.js"

import PostMessage from '../models/postMessage.js'
import mongoose from 'mongoose';

// const PostMessage = require('../models/postMessage.js')

export const getSinglePost = async (req,res) =>{

    const {id} = req.params;

    try {
        const post = await PostMessage.findById(id)
        res.status(200).json(post)
        
    } catch (error) {
        res.status(404).json({message:"here is error"})
    }
}

export const getPosts = async (req, res) => {

    const {page} = req.query;

    try {

        const LIMIT = 6;
        const startIndex= (Number(page) - 1) * LIMIT // get starting index of every page

        const total = await  PostMessage.countDocuments({})

        
        const posts = await PostMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex)


        res.json({data:posts,currentPage: Number(page),numberOfPages: Math.ceil(total/LIMIT)});


    } catch (error) {

        res.status(404).json({ message: error.message });


    }

}

export const getPostsBySearch = async (req, res) => {

    const {searchQuery,tags}= req.query


    try {
        const title = new RegExp(searchQuery, 'i'); // TEST,Test,test all would count same using regexp

        const posts = await PostMessage.find({ $or:[ {title} , { tags: { $in: tags.split(',') } } ] } )
       

        res.json({data:posts})
        
    } catch (error) {

        res.staus(404).json({message:error.message})
    }

}

export const createPost = async (req, res) => {

    const post = req.body;


    const newPost = new PostMessage({...post , creator:req.userId , createdAt:new Date().toISOString()})

    try {

        await newPost.save();

        res.status(201).json(newPost)

    } catch (error) {
        res.status(409).json({ message: error.message });

    }

}

export const updatePost = async (req, res) => {

    const { id } = req.params;


    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.staus(404).send('nopost with that id')
    }


    const updatedPost = { ...post, _id: id  };
   
    await PostMessage.findByIdAndUpdate(id, updatedPost,{new:true})

   res.json(updatedPost);

    

}

export const deletePost = async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.staus(404).send('nopost with that id')
    }

    await PostMessage.findByIdAndRemove(id);

    res.json({message:'Post deleted succesfully'})

}


export const likePost = async (req, res) => {

    const { id } = req.params;

    if(!req.userId){
        return res.json({message:'unaunthenticated..'})
    }


    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.staus(404).send('nopost with that id')
    }

    const post = await PostMessage.findById(id);

    // to check if post which we get above is liked by login person 
    const index = post.likes.findIndex((id)=> id === String(req.userId))

    if(index===-1){ //if he not like the post
        
        //then like the post
        post.likes.push(req.userId);

    }else{
        // dislike post , remove his id from likes array
        post.likes = post.likes.filter((id)=> id !== String(req.userId))
    }

    // const updatedPost = await PostMessage.findByIdAndUpdate(id,{likeCount: post.likeCount + 1},{new:true})
    const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new:true})



    

   res.json(updatedPost);

    

}

export const commentPost = async (req, res) => {

    const {id} = req.params;
    const {value} = req.body;

    try {
        
        const post = await PostMessage.findById(id)
    
        post.comments.push(value)
    
        const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new:true})
    
        res.json(updatedPost)
    } catch (error) {

        res.status(404).json({ message: error.message });

        
    }



}