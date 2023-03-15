const configs = require('./configs/configs');
const mysql = require('mysql');
const sql = require('./sql-query-generator');

db = mysql.createConnection({
    user: configs.user,
    host: configs.host,
    password: configs.password,
});

db.connect(err => {
    if (err) {
        return console.log('Migration fail: Database is not connected...')
    } else {
        db.query(sql.dropDataBase(), (err, res) => {
            if (err) throw err;
            db.query(sql.createDataBase(), (err, res) => {
                if (err) throw err;
                db.query(sql.createUserTables(), (err, res) => {
                    if (err) throw err;
                    db.query(sql.createFilesTable(), (err, res) => {
                        if (err) throw err;
                        db.end(() => {
                            console.log('Migration Success...');
                        });
                    })
                })
            })
        })
    }
});

