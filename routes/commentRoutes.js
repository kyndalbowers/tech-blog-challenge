app.get('/api/posts/:postId/comments', commentController.getCommentsForPost);

app.post('/api/posts/:postId/comments', commentController.createComment);

app.put('/api/comments/:id', commentController.updateComment);

app.delete('/api/comments/:id', commentController.deleteComment);
