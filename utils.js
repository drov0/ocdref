require('dotenv').config()
var fs = require('fs');
const {promisify} = require('util');

const mysql      = require('mysql');
const db = mysql.createConnection({
    host     : 'localhost',
    user     : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : 'ocdbref',
    charset: 'utf8mb4'
});

db.connect();
const db_query = promisify(db.query).bind(db);


/**
 * Save voter data to a cache file
 * @param username of the voter
 * @param author of the oldest active post voted
 * @param permlink of the oldest active post voted
 */
function save_tx(id, file)
{
    fs.writeFileSync(__dirname+file, id);
}

/**
 * Returns the vote data of an user
 * @param username of the voter
 * @returns {*} the author and permlink of the oldest active post voted.
 */
function get_last_tx(file)
{
    if (fs.existsSync(cache_path)) {
        let data = fs.readFileSync(__dirname+file).toString();
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

function is_json_string(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


function get_highest_tx(account)
{
    return new Promise(async resolve => {

        let data = await client.database.call("get_account_history", [account, 999999999999, 0]);

        return resolve(data[0][0]);
    })
}


module.exports = {
    db_query : db_query,
    wait,
    get_last_tx,
    save_tx,
    is_json_string,
    get_highest_tx
}
