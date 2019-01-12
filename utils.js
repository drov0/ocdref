require('dotenv').config()

const mysql      = require('mysql');
const db = mysql.createConnection({
    host     : 'localhost',
    user     : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : 'ocdbref',
    charset: 'utf8mb4'
});

db.connect();


/**
 * Save voter data to a cache file
 * @param username of the voter
 * @param author of the oldest active post voted
 * @param permlink of the oldest active post voted
 */
function save_tx(id)
{
    fs.writeFileSync(cache_path, id);
}

/**
 * Returns the vote data of an user
 * @param username of the voter
 * @returns {*} the author and permlink of the oldest active post voted.
 */
function get_last_tx()
{
    if (fs.existsSync(cache_path)) {
        let data = fs.readFileSync(cache_path).toString();
        return parseInt(data);
    } else
        return 0
}

function wait(time)
{
    return new Promise(resolve => {
        setTimeout(() => resolve('☕'), time*1000); // miliseconds to seconds
    });
}


module.exports = {
    db,
    wait,
    get_last_tx,
    save_tx
}
