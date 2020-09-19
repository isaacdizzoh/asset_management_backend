module.exports = app => {
    const users = require('../controllers/asset.controller');

    //Adding new User information
    app.post('/users', users.create);

    //Get all user infomation
    app.get('/users', users.findAll);

    //Get single user by user_id
    app.get('/users/:userId', users.findOne);

    //Updating User info by user_id
    app.put('/users/:userId', users.update);

    //Deleting User info by user_id
    app.delete('/users/:userId', users.delete);
    
};