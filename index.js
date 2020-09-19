const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});