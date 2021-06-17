const User = require('../models/users.model');

exports.findUser = async (username, password) => {
    const user = await User.findOne({
        where: {
            USERNAME: username,
            PASSWORD: password
        }
    });
    return user;
};
