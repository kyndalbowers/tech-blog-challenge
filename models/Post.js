const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config.connection');

class Post extends Model {}

Post.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'post',
    }
);

Post.belongsTo(models.User, {
    foreignKey: 'user_id',
});

module.exports = Post;