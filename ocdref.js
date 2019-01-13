const dsteem = require('dsteem');
const utils = require("./utils");
const config = require("./config");
const refs = require("./referral")

const client = new dsteem.Client('https://api.steemit.com');





async function  run()
{
    console.log("running");

    while (true)
    {
        await refs.save_new_refs();
        await utils.wait(300);
    }
}

run();