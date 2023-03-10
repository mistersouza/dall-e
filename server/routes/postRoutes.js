import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as Cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

Cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Create a post
router.post('/', async (req, res) => {
    try {
        const { name, prompt, image } = req.body;
        const imageUrl = await Cloudinary.uploader.upload(image);

        const newPost = Post.create({
            name,
            prompt,
            image: imageUrl.url
        });

    
        res.status(201).json({ success: true, data: newPost });
        
    } catch (error) {
        res.status(500).json({ success: false, message: 'Unable to create a post. Please try again' });
    }
});

export default router;