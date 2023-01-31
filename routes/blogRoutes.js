const express = require('express');
const blogController = require('../controllers/blogController');
const blogRouter = express.Router();

blogRouter.get('/', blogController.getAllBlogs);
blogRouter.post('/add', blogController.addBlogs);
blogRouter.put('/update/:id', blogController.updateBlogs);
blogRouter.delete('/delete/:id', blogController.deleteBlog);
blogRouter.get('/:id', blogController.getById);
blogRouter.get('/user/:id', blogController.getByUserId);

module.exports = blogRouter;
