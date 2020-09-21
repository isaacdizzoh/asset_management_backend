const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Define port to listen request
const port = 8000;

//Parse request of content of type: application/json
app.use(bodyParser.json());

//parse request of content type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Simple route
app.get("/", (req, res) => {
    res.json({ message : "Welcome To Asset Management API"});
})

require('./routes/user.routes')(app);
require('./routes/asset.routes')(app);

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});