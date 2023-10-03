const express = require('express');
const app = express();
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

app.listen(PORT, () => {
    console.log('server is running on http://localhost:${PORT}');
});