const dsteem = require('dsteem');
const utils = require("./utils");
const config = require("./config");
const referrals = require("./referral")
const bidbot = require("./bidbot")

const client = new dsteem.Client('https://api.steemit.com');

/**
 * Cleans the list to prevent stuff like people mututally referring themselves
 * @param refs list of referrals.
 */
function clean_referrals(refs)
{
    for (let i = 0; i < refs.length; i++)
    {
        const cheating_user =  refs.find(o => (o.parent === refs[i].child && o.child === refs[i].parent));

        const index = refs.indexOf(cheating_user);
        if (index > -1)
            refs.splice(index, 1);
    }

    return refs;

}


function split_earnings()
{
    return new Promise(async resolve => {

        const ocdbfund = await client.database.getAccounts(['ocdbfund']);

        let earnings = await bidbot.get_earnings_per_user();

        let refs = await referrals.get_referrals();

        refs = clean_referrals(refs);

        let active_parents = [];

        for (let i = 0; i < earnings.length; i++)
        {

            let ref_user = refs.find(o => (o.child === earnings[i].name));

            if (ref_user !== undefined) {

                let user = active_parents.find(x => x.name === ref_user.parent);

                let newly_added = false;

                if (user === undefined) {
                    user = ref_user;
                    delete user.child;
                    user.name = user.parent;
                    delete user.parent;
                    newly_added = true;
                }

                user.lifetime_sbd = Math.floor((earnings[i].lifetime_sbd + user.lifetime_sbd) * 100) / 100;
                user.lifetime_steem = Math.floor((earnings[i].lifetime_steem + user.lifetime_steem) * 100) / 100;
                user.weekly_sbd = Math.floor((earnings[i].weekly_sbd + user.weekly_sbd) * 100) / 100;
                user.weekly_steem = Math.floor((earnings[i].weekly_steem + user.weekly_steem) * 100) / 100;

                if (newly_added === false)
                {
                    let index = active_parents.indexOf(user);
                    active_parents[index] = user;
                } else
                    active_parents.push(user);


            }
        }

        const lifetime_sbd_share = active_parents.reduce((a, b) => a + parseFloat(b.lifetime_sbd), 0);
        const lifetime_steem_share = active_parents.reduce((a, b) => a + parseFloat(b.lifetime_steem), 0);
        const weekly_sbd_share = active_parents.reduce((a, b) => a + parseFloat(b.weekly_sbd), 0);
        const weekly_steem_share = active_parents.reduce((a, b) => a + parseFloat(b.weekly_steem), 0);


        for (let i = 0; i < active_parents.length; i++) {
            let share_percentage = (   active_parents[i].lifetime_sbd / lifetime_sbd_share
                                        + active_parents[i].lifetime_steem / lifetime_steem_share
                                        + active_parents[i].weekly_sbd / weekly_sbd_share
                                        + active_parents[i].weekly_steem / weekly_steem_share) / 4;

            let share = Math.floor((parseFloat(ocdbfund[0].balance) * share_percentage) * 1000) / 1000;

            // 0.002 because we will be sending a 0.001 transfer with a memo as well
            if (share < 0.002)
                share = 0;

            active_parents[i].share = share;
        }


        for (let i = 0; i < active_parents.length; i++)
        {
            let u = 0;
        }



    });
}

/**
 * Powers up x amounts of steem
 * @param from Account from which the liquid steem will be drained
 * @param to Account on which the liquid steem will be powered up (can be the same as the account from which the steem will be drained)
 * @param amount Amount of tokens that you want to power up, note that it must be written like this : x.xxx unit eg : '1.265 STEEM' or '0.010 STEEM'
 * @param active_key Active key of the from account.
 * @returns {Promise<any>} Result of the operation.
 */
function power_up(from, to,  amount, active_key) {
    return new Promise(async resolve => {

        const privateKey = dsteem.PrivateKey.fromString(
            active_key
        );
        const op = [
            'transfer_to_vesting',
            {
                from: from,
                to: to,
                amount: amount,
            },
        ];
        const result = await client.broadcast.sendOperations([op], privateKey).catch(function(error) {
                console.error(error);
            }
        );

        return resolve(result);

    });
}

function transfer(from, to, amount, memo, active_key)
{
    return new Promise(resolve => {
        const privateKey = PrivateKey.fromString(
            active_key
        );

        //create transfer object
        const transf = {
            from: from,
            to: to,
            amount: amount,
            memo: memo,
        };

        //broadcast the transfer

        client.broadcast.transfer(transf, privateKey).then(
            function (result) {
                console.log(`Transferred ${amount} to ${to}`);
                return resolve(result);
            },
            function (error) {
                console.error(error);
                return resolve(error);
            }
        );
    });
}


async function run()
{
    console.log("running");

    await split_earnings();

    while (true)
    {
        await referrals.save_new_refs();
        await utils.wait(300);
    }
}

run();