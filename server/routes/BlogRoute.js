import express from 'express';
import { upload } from '../middleware/upload.js'; 
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  validatePassword
} from '../controllers/BlogController.js';

const router = express.Router();

router.get('/posts', getAllBlogs);
router.get('/posts/:id', getBlogById);

router.post('/posts/validate', validatePassword);

router.post(
  '/posts',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'authorProfilePicture', maxCount: 1 },
  ]),
  createBlog
);

router.put(
  '/posts/:id',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'authorProfilePicture', maxCount: 1 },
  ]),
  updateBlog
);

router.delete('/posts/:id', deleteBlog);

// routes/blogRoutes.js
router.post('/posts/:id/like', likeBlog);


export default router;