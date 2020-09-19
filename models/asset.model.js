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
        if (err) {
            result(err, null);
            return;
        }

        result(null, { user_id: res.user_id, ...newUser })
    });
};

User.findById = (userId, result) => {
    sql.query("SELECT * FROM user_info WHERE user_id = ?", userId, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        result({ kind : "Not Found"}, null);
    });
};

User.getAll = result => {
    sql.query("SELECT * FROM user_info", (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};

User.updateById = (userId, user, result) => {
    sql.query("UPDATE user_info SET first_name = ?, last_name = ?, gender = ?, username = ?, password = ? WHERE user_id = ?",
    [user.first_name, user.last_name, user.gender, user.username, user.password, userId], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind : "Not Found"}, null);
            return;
        }

        result(null, {userId: userId, ...user} );
    });
};

User.remove = (userId, result) => {
    sql.query("DELETE FROM user_info WHERE user_id = ?", userId, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind : "Not Found"}, null);
            return;
        }

        result(null, res);
    });
};

module.exports = User;