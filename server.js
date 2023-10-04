const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const pageRoutes = require('./routes/pageRoutes');

const app = express();

const sessionStore = new SequelizeStore({
    db: sequelize,
    });
    
    app.use(
        session({
        secret: 'Changeme123',
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        })
    );

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/', pageRoutes);

app.use((err, req, res, next) => {
    console.error(err);

    let statusCode = 500;
    let errorMessage = 'An unexpected error occurred.';

    if (err instanceof CustomError) {
        statusCode = err.statusCode;
        errorMessage = err.message;
    }

    res.status(statusCode).json({ error: errorMessage });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
