const dsteem = require('dsteem');
const utils = require("./utils");
const config = require("./config");
const is_url = require("is-url");
const refs = require("./referral");

const client = new dsteem.Client('https://api.steemit.com');

const main_account = "ocdb";
const iterate_nb = 10000;


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
        let start = 0;
        let highest_tx = await utils.get_highest_tx(main_account);

        do {
            console.log(`Grabbing ocdb tx data : ${start}/${highest_tx}`);

            let data = await get_account_history(start);

            while (data === -1)
            {
                data = await get_account_history(start);
            }

            let newest_tx = 0;

            for (let i = 0; i < data.length; i++) {
                let tx = data[i][1];
                if (tx.op[0] === "transfer" && tx.op[1].memo !== "" && is_url(tx.op[1].memo) === true) {
                    let custom_transaction = tx.op[1];

                    custom_transaction.timestamp = data[i][1].timestamp;
                    transactions.push(custom_transaction);
                }
            }

            newest_tx = data[data.length - 1][0];
            start = newest_tx;
        } while (highest_tx - start > iterate_nb);

        // Last transactions to grab, we have to do it that way because the highest_tx id keeps changing.
        console.log(`Grabbing ocdb tx data : ${start}/${highest_tx}`);

        let data = await get_account_history(start);

        while (data === -1)
        {
            data = await get_account_history(start);
        }

        for (let i = 0; i < data.length; i++) {
            let tx = data[i][1];
            if (tx.op[0] === "transfer" && tx.op[1].memo !== "" && is_url(tx.op[1].memo) === true) {
                let custom_transaction = tx.op[1];

                custom_transaction.timestamp = data[i][1].timestamp;
                transactions.push(custom_transaction);
            }
        }


        console.log("All tx recorded");

        return resolve(transactions);
    })
}

function get_earnings_per_user()
{
    return new Promise(async resolve => {
        const now = Math.floor(new Date().getTime() / 1000);

        console.log("Grabbing All ocdb transfers...");
        let transactions = await get_transactions();

        let users = [];

        for (let i = 0; i < transactions.length; i++) {
            let amount_sbd = 0;
            let amount_steem = 0;
            let weekly_sbd = 0;
            let weekly_steem = 0;

            if (transactions[i].amount.indexOf("SBD") !== -1) {
                amount_sbd = parseFloat(transactions[i].amount);

                // If the tx happened less than a week ago
                if (now - (new Date(transactions[i].timestamp).getTime() / 1000) < 604800)
                    weekly_sbd = parseFloat(transactions[i].amount);
            } else {
                amount_steem = parseFloat(transactions[i].amount);
                if (now - (new Date(transactions[i].timestamp).getTime() / 1000) < 604800)
                    weekly_steem = parseFloat(transactions[i].amount);
            }

            let user = users.find(x => x.name === transactions[i].from);

            if (user === undefined) {
                user = {
                    name: transactions[i].from,
                    lifetime_sbd: amount_sbd,
                    lifetime_steem: amount_steem,
                    weekly_sbd: weekly_sbd,
                    weekly_steem: weekly_steem
                };
                users.push(user);

            } else {
                let index = users.indexOf(user);

                user.lifetime_sbd = Math.floor((amount_sbd + user.lifetime_sbd) * 100) / 100;
                user.lifetime_steem = Math.floor((amount_steem + user.lifetime_steem) * 100) / 100;
                user.weekly_sbd = Math.floor((weekly_sbd + user.weekly_sbd) * 100) / 100;
                user.weekly_steem = Math.floor((weekly_steem + user.weekly_steem) * 100) / 100;

                users[index] = user;

            }
        }

        console.log("Finished getting earnings");

        return resolve(users);
    });
}


module.exports = {
    get_earnings_per_user,
    get_transactions
};