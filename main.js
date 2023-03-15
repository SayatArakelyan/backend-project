const app = require('./app');
const configs = require('./configs/configs');
const db = require('./database');

db.connect(err => {
    if (err) {
        return console.log('Database is not connected...')
    } else {
        console.log('Database is connect successfully...')
    }
});

app.listen(configs.port, console.log(`Server has started in ${configs.port} port ...`));
