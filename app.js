const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const {v4: uuidv4} = require('uuid');
const swagger = require('./swagger');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('cors')());
app.use(morgan('dev'));
swagger.run(app);

const users = require('./routes/users.route');
const files = require('./routes/files.route');

app.use('/api/users', users);
app.use('/api/files', files);

app.use('/uploads', express.static('./_uploads'));
app.use(express.static(__dirname + '/Project/dist/Project'));


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/Project/dist/Project/index.html'));
});
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/Project/dist/Project/index.html'));
});

app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    res.status(err.status).json({error: err.message})
});
app.use((err, req, res, next) => {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).json({error: err.message});
});

module.exports = app;
