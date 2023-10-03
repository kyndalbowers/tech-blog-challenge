app.get('/dashboard', userController.getUserDashboard);

app.get('/dashboard/edit/:id', userController.renderEditPostForm);

app.get('/dashboard/new', userController.renderNewPostForm);
