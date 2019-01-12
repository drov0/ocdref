const dsteem = require('dsteem');

const client = new dsteem.Client('https://api.steemit.com');
var fs = require('fs');

const cache_path = __dirname+"/tx_cache";
const main_account = "howo";
const iterate_nb = 1000;


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

function get_highest_tx()
{
    return new Promise(async resolve => {

        let data = await client.database.call("get_account_history", [main_account, 999999999999, 0]);

        return resolve(data[0][0]);
    })
}



function history() {
    return new Promise(async resolve => {



        let transactions = [];
        let start = get_last_tx();
        let highest_tx = await get_highest_tx();

        while (highest_tx - start > iterate_nb) {

            let data = await client.database.call("get_account_history", [main_account, start + iterate_nb, iterate_nb]);

            let newest_tx = 0;

            for (let i = 0; i < data.length; i++) {
                let tx = data[i][1];
                if (tx.op[0] === "transfer" /*&& tx.op[1].amount === "0.001 STEEM" && tx.op[1].memo !== "" && tx.op[1].memo.length <= 16*/) {
                    transactions.push(tx.op[1]);
                }
            }

            newest_tx = data[data.length - 1][0];

            save_tx(newest_tx);
            start = newest_tx;
        }
    })
}

async function  run()
{
    console.log("running");

    while (true)
    {
        await history();
        await wait(300);
    }
}

run();