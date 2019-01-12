const dsteem = require('dsteem');

const client = new dsteem.Client('https://api.steemit.com');
var fs = require('fs');

const cache_path = __dirname+"/tx_cache";


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
        return -1
}

function wait(time)
{
    return new Promise(resolve => {
        setTimeout(() => resolve('☕'), time*1000); // miliseconds to seconds
    });
}

function history() {
    return new Promise(async resolve => {
        let data = await client.database.call("get_account_history", ["howo", -1, 1000]);

        let newest_tx = 0;

        for (let i = 0; i < data.length; i++)
        {
            let tx = data[i][1];
            if (tx.op[0] === "transfer" /*&& tx.op[1].amount === "0.001 STEEM" && tx.op[1].memo !== "" && tx.op[1].memo.length <= 16*/)
            {
                console.log(data[i][0]);
                console.log(tx.op[1])
            }
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