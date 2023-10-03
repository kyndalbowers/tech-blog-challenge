const express = require('express');
const app = express();
const postController = require('./controllers/postController');
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.send('Welcome to my Tech Blog!');
});

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()}: ${req.method} ${req.url}`);
    next();
});

app.use(express.static('public'));

app.post('/api/posts', postController.createPost);

app.listen(PORT, () => {
    console.log('server is running on http://localhost:${PORT}');
});