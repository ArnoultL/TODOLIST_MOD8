module.exports = (connex, Sequelize) => {
    const User = connex.define("user", {
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        token: {
            type: Sequelize.STRING
        }
    }, { timestamps: true });

    return User;
};