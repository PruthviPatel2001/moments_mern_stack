// import PostMessage from "../models/postMessage.js"


import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js'

// const PostMessage = require('../models/postMessage.js')

export const getPosts = async (req, res) => {

    try {

        const postMessage = await PostMessage.find()

        // console.log(postMessage);

        res.status(200).json(postMessage);


    } catch (error) {

        res.status(404).json({ message: error.message });


    }

}

export const createPost = async (req, res) => {

    const post = req.body;

    console.log("in Post js", post);

    const newPost = new PostMessage(post)

    try {

        await newPost.save();

        res.status(201).json(newPost)

    } catch (error) {
        res.status(409).json({ message: error.message });

    }

}

export const updatePost = async (req, res) => {

    const { id } = req.params;

    console.log("feom server update post",id);

    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.staus(404).send('nopost with that id')
    }


    const updatedPost = { ...post, _id: id };
   
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

    

    

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.staus(404).send('nopost with that id')
    }

    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id,{likeCount: post.likeCount + 1},{new:true})


    

   res.json(updatedPost);

    

}