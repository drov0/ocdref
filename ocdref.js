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

        //const voteRshares = post.active_votes.reduce((a, b) => a + parseFloat(b.rshares), 0);
        //const ratio = totalPayout / voteRshares;

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

        console.log("yes")

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