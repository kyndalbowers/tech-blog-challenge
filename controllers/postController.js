const { Post, User, Comment } = require('../models');

const postController = {
    createPost: async (req, res) => {
        try {
            const { title, content } = req.body;

            const newPost = await Post.create({
                title,
                content,
                user_id: req.session.user_id,
        });

        res.status(201).json(newPost);
        } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create a new post.' });
        }
    },

    fetchAllPosts: async (req, res) => {
        try {
        const posts = await Post.findAll({
            include: [{ model: User, attributes: ['username'] }, { model: Comment }],
        });

        res.status(200).json(posts);
        } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch blog posts.' });
        }
    },

    fetchSinglePost: async (req, res) => {
        try {
        const postId = req.params.id;
        const post = await Post.findByPk(postId, {
            include: [{ model: User, attributes: ['username'] }, { model: Comment }],
        });

        if (!post) {
            res.status(404).json({ error: 'Post not found.' });
        } else {
            res.status(200).json(post);
        }
        } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch the blog post.' });
        }
    },

    updatePost: async (req, res) => {
        try {
        const postId = req.params.id;
        const { title, content } = req.body;

        const [updatedRowsCount] = await Post.update(
            { title, content },
            {
            where: {
                id: postId,
                user_id: req.session.user_id,
            },
            }
        );

        if (updatedRowsCount === 0) {
            res.status(403).json({ error: 'You are not authorized to update this post.' });
        } else {
            res.status(200).json({ message: 'Post updated successfully.' });
        }
        } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update the blog post.' });
        }
    },
};

module.exports = postController;
