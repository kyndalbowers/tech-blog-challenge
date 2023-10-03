const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {

    checkPassword(loginPassword) {
        return bcrypt.compareSync(loginPassword, this.password);
    }
}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8],
        },
    },
},
{
    hooks: {
        async beforeCreate(newUser) {
            newUser.password = await bcrypt.hash(newUser.password, 10);
            return newUser;
        },
    },

        sequelize,
        modelName: 'user',
    }
);

User.hasMany(models.Post, {
    foreignKey: 'user_id',
});

module.exports = User;