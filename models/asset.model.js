const sql = require('./db');

const User = function(user) {
    this.user_id = user.user_id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.gender = user.gender;
    this.username = user.username;
    this.password = user.password;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO user_info SET ?", newUser, (err, res) => {

    });
};