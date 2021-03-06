const dsteem = require('dsteem');
const utils = require("./utils");
const config = require("./config");

const client = new dsteem.Client('https://api.steemit.com');

const main_account = "ocdbref";
const iterate_nb = 500;

function get_account_history(start)
{
    return new Promise(async resolve => {
        let data = await client.database.call("get_account_history", [main_account, start + iterate_nb, iterate_nb]).catch(function (err) {
            console.error("handled error : ");
            console.error(err.message);
            return resolve(-1);
        });
        return resolve(data);
    });
}


function get_transactions() {
    return new Promise(async resolve => {

        let transactions = [];
        let start = utils.get_last_tx();
        let highest_tx = await utils.get_highest_tx(main_account);

        while (highest_tx - start > iterate_nb)  {

            let data = await get_account_history(start);

            while (data === -1)
            {
                data = await get_account_history(start);
            }

            let newest_tx = 0;

            for (let i = 0; i < data.length; i++) {
                let tx = data[i][1];
                if (tx.op[0] === "transfer" && tx.op[1].amount === "0.001 STEEM" && tx.op[1].memo !== "" && (tx.op[1].memo.length <= 16)) {
                    transactions.push(tx.op[1]);
                }

                if (tx.op[0] === "transfer" && tx.op[1].amount === "0.001 STEEM" && tx.op[1].memo !== "" && config.admins.indexOf(tx.op[1].from) !== -1 && utils.is_json_string(tx.op[1].memo)) {
                    {
                        let json = JSON.parse(tx.op[1].memo);
                        let custom_transaction = tx.op[1];
                        custom_transaction.from = json.child;
                        custom_transaction.memo = json.parent;
                        transactions.push(tx.op[1]);
                    }
                }
            }

            newest_tx = data[data.length - 1][0];

            utils.save_tx(newest_tx);
            start = newest_tx;
        }

        // Last transactions to grab, we have to do it that way because the highest_tx id keeps changing.
        let data = await client.database.call("get_account_history", [main_account, start + iterate_nb, iterate_nb]);

        let newest_tx = 0;

        for (let i = 0; i < data.length; i++) {
            let tx = data[i][1];
            if (tx.op[0] === "transfer" && tx.op[1].amount === "0.001 STEEM" && tx.op[1].memo !== "" && (tx.op[1].memo.length <= 16)) {
                transactions.push(tx.op[1]);
            }

            if (tx.op[0] === "transfer" && tx.op[1].amount === "0.001 STEEM" && tx.op[1].memo !== "" && config.admins.indexOf(tx.op[1].from) !== -1 && utils.is_json_string(tx.op[1].memo)) {
                {
                    let json = JSON.parse(tx.op[1].memo);
                    let custom_transaction = tx.op[1];
                    custom_transaction.from = json.child;
                    custom_transaction.memo = json.parent;
                    transactions.push(tx.op[1]);
                }
            }
        }


        return resolve(transactions);
    })
}

async function save_new_refs()
{
    console.log("Saving new refs...");
    let transactions = await get_transactions();

    for (let i = 0; i < transactions.length; i++)
    {
        // Check if the account actually exists
        const acc = await client.database.getAccounts([transactions[i].memo]);

        if (acc.length !== 0) {

            const parent = transactions[i].memo;
            const child = transactions[i].from;

            await utils.db_query("INSERT INTO referral(parent,child) VALUES(?,?)", [parent, child]).catch(function (err) {
                console.error(err)
            });
            console.log(`${parent} refereed ${child}`);
        }
    }

    console.log("Finished saving new refs")
}


function get_referrals()
{
    return new Promise(async resolve => {
        let users = await utils.db_query("select * from referral");

        for (let i = 0; i < users.length; i++)
        {
                users[i].lifetime_sbd = 0;
                users[i].lifetime_steem = 0;
                users[i].weekly_sbd = 0;
                users[i].weekly_steem = 0;
        }

        return resolve(users);
    });
}




module.exports = {
    save_new_refs,
    get_referrals
};