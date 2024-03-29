
import express from 'express';

import { getPostsBySearch,getPosts,createPost,updatePost,deletePost,likePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js'
import { getSinglePost,commentPost } from '../controllers/posts.js';


const router = express.Router();

router.get('/search',getPostsBySearch)
router.get('/', getPosts)
router.get('/:id',getSinglePost)

router.post('/', auth , createPost)
router.post('/:id/commentpost',auth,commentPost)

router.patch('/:id', auth ,updatePost)

router.delete('/:id', auth ,deletePost)

router.patch('/:id/likePost', auth ,likePost);


export default router;