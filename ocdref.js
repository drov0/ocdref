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

        clean_referrals(refs);


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