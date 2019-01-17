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

        let earnings = [
            {
                "name": "anomadsoul",
                "lifetime_sbd": 310.79,
                "lifetime_steem": 2523.5,
                "weekly_sbd": 7.34,
                "weekly_steem": 224
            },
            {
                "name": "gmuxx",
                "lifetime_sbd": 0,
                "lifetime_steem": 1,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "m31",
                "lifetime_sbd": 187.59,
                "lifetime_steem": 595.29,
                "weekly_sbd": 0,
                "weekly_steem": 92
            },
            {
                "name": "jeanpi1908",
                "lifetime_sbd": 110,
                "lifetime_steem": 43.3,
                "weekly_sbd": 0,
                "weekly_steem": 11.5
            },
            {
                "name": "guyfawkes4-20",
                "lifetime_sbd": 35.5,
                "lifetime_steem": 0.2,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "elteamgordo",
                "lifetime_sbd": 1.41,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "futurethinker",
                "lifetime_sbd": 21.91,
                "lifetime_steem": 33.86,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "dianna1",
                "lifetime_sbd": 0.1,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "theaustrianguy",
                "lifetime_sbd": 170.84,
                "lifetime_steem": 1042.63,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "saywha",
                "lifetime_sbd": 27.73,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "djynn",
                "lifetime_sbd": 172.09,
                "lifetime_steem": 132,
                "weekly_sbd": 0,
                "weekly_steem": 33
            },
            {
                "name": "yasu24",
                "lifetime_sbd": 151,
                "lifetime_steem": 11.69,
                "weekly_sbd": 0,
                "weekly_steem": 11.69
            },
            {
                "name": "sardrt",
                "lifetime_sbd": 508.39,
                "lifetime_steem": 2208.5,
                "weekly_sbd": 38,
                "weekly_steem": 96
            },
            {
                "name": "jackjohanneshemp",
                "lifetime_sbd": 2.8,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "jga",
                "lifetime_sbd": 22.09,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "erodedthoughts",
                "lifetime_sbd": 123.76,
                "lifetime_steem": 0.95,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "gniksivart",
                "lifetime_sbd": 68.5,
                "lifetime_steem": 215.97,
                "weekly_sbd": 0,
                "weekly_steem": 30
            },
            {
                "name": "controlcold",
                "lifetime_sbd": 0.3,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "jznsamuel",
                "lifetime_sbd": 393,
                "lifetime_steem": 348.88,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "pakwarazik1990",
                "lifetime_sbd": 0.3,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "joelgonz1982",
                "lifetime_sbd": 95.39,
                "lifetime_steem": 10,
                "weekly_sbd": 0,
                "weekly_steem": 10
            },
            {
                "name": "travelgirl",
                "lifetime_sbd": 530.89,
                "lifetime_steem": 790,
                "weekly_sbd": 0,
                "weekly_steem": 160
            },
            {
                "name": "macchiata",
                "lifetime_sbd": 28.77,
                "lifetime_steem": 3,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "htliao",
                "lifetime_sbd": 148.78,
                "lifetime_steem": 89.65,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "geke",
                "lifetime_sbd": 97.5,
                "lifetime_steem": 15,
                "weekly_sbd": 0,
                "weekly_steem": 15
            },
            {
                "name": "steeminator3000",
                "lifetime_sbd": 30.34,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "fukako",
                "lifetime_sbd": 67.98,
                "lifetime_steem": 50.98,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "howtostartablog",
                "lifetime_sbd": 27.5,
                "lifetime_steem": 2.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "tarazkp",
                "lifetime_sbd": 571.5,
                "lifetime_steem": 2726,
                "weekly_sbd": 0,
                "weekly_steem": 255
            },
            {
                "name": "galenkp",
                "lifetime_sbd": 504.5,
                "lifetime_steem": 1538.95,
                "weekly_sbd": 0,
                "weekly_steem": 192
            },
            {
                "name": "kalvas",
                "lifetime_sbd": 4.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "tarikhakan55",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "petals",
                "lifetime_sbd": 78.15,
                "lifetime_steem": 1.8,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "adrianobalan",
                "lifetime_sbd": 420,
                "lifetime_steem": 1321.04,
                "weekly_sbd": 0,
                "weekly_steem": 227.6
            },
            {
                "name": "zorto",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "disable3",
                "lifetime_sbd": 0.19,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "eduards",
                "lifetime_sbd": 0.1,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "dejan.vucovic",
                "lifetime_sbd": 39.79,
                "lifetime_steem": 269,
                "weekly_sbd": 0,
                "weekly_steem": 97
            },
            {
                "name": "rubencress",
                "lifetime_sbd": 40,
                "lifetime_steem": 2.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "ajier39",
                "lifetime_sbd": 0.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "rijalaronaceh",
                "lifetime_sbd": 10,
                "lifetime_steem": 56,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "smallsteps",
                "lifetime_sbd": 165.37,
                "lifetime_steem": 626.5,
                "weekly_sbd": 0,
                "weekly_steem": 33
            },
            {
                "name": "famil",
                "lifetime_sbd": 2,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "muradovv",
                "lifetime_sbd": 4,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "vinzie1",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "baronstrucker",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "zlatan-spielberg",
                "lifetime_sbd": 124,
                "lifetime_steem": 130,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "malahayati",
                "lifetime_sbd": 1,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "afifa",
                "lifetime_sbd": 1,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "oendertuerk",
                "lifetime_sbd": 214.5,
                "lifetime_steem": 958.92,
                "weekly_sbd": 0,
                "weekly_steem": 254.92
            },
            {
                "name": "theuxyeti",
                "lifetime_sbd": 10.07,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "warpedpoetic",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "fremy",
                "lifetime_sbd": 0.25,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "cryptonewslife",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "ivanfurqanpurba",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 1.41,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "steemitjp",
                "lifetime_sbd": 42.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "biomanu",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "techlife",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "amity123",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "mike11",
                "lifetime_sbd": 5,
                "lifetime_steem": 2,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "punjolife",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "marverick984",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "harrybell",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "vegasteem",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "alphasteem",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "solnamu",
                "lifetime_sbd": 32,
                "lifetime_steem": 22.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "kinakomochi",
                "lifetime_sbd": 187.5,
                "lifetime_steem": 52.23,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "shogo",
                "lifetime_sbd": 77.34,
                "lifetime_steem": 47.45,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "mariska.lubis",
                "lifetime_sbd": 0.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "muhammadan",
                "lifetime_sbd": 0.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "hashcash",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "momone",
                "lifetime_sbd": 42.5,
                "lifetime_steem": 12.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "yoshiko",
                "lifetime_sbd": 57.5,
                "lifetime_steem": 30,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "onecupofcoffee",
                "lifetime_sbd": 5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "acidyo",
                "lifetime_sbd": 128.79,
                "lifetime_steem": 2013.53,
                "weekly_sbd": 0,
                "weekly_steem": 30
            },
            {
                "name": "elliotjgardner",
                "lifetime_sbd": 5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "legko",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "moromaro",
                "lifetime_sbd": 27.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "orcheva",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "strawhat",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 47.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "lindiry",
                "lifetime_sbd": 7.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "ultraseven",
                "lifetime_sbd": 48,
                "lifetime_steem": 1,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "markos86",
                "lifetime_sbd": 45,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "salahuddinsharif",
                "lifetime_sbd": 5.6,
                "lifetime_steem": 0.3,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "redjepi",
                "lifetime_sbd": 37.5,
                "lifetime_steem": 22.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "thedarkhorse",
                "lifetime_sbd": 115.5,
                "lifetime_steem": 843.5,
                "weekly_sbd": 0,
                "weekly_steem": 32
            },
            {
                "name": "markkujantunen",
                "lifetime_sbd": 7.5,
                "lifetime_steem": 1634.51,
                "weekly_sbd": 0,
                "weekly_steem": 227.6
            },
            {
                "name": "worldcup-russia",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "wolfhart",
                "lifetime_sbd": 64.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "katzenblog",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "cryptoandcoffee",
                "lifetime_sbd": 362.22,
                "lifetime_steem": 1326.83,
                "weekly_sbd": 0,
                "weekly_steem": 141.5
            },
            {
                "name": "stuffing",
                "lifetime_sbd": 40,
                "lifetime_steem": 57.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "explorernations",
                "lifetime_sbd": 32.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "kaliju",
                "lifetime_sbd": 62.5,
                "lifetime_steem": 5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "hannaju",
                "lifetime_sbd": 12.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "akunhoky",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "intansary",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "empress-eremmy",
                "lifetime_sbd": 61.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "tcpolymath",
                "lifetime_sbd": 173,
                "lifetime_steem": 8.86,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "guada1",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "abh12345",
                "lifetime_sbd": 235,
                "lifetime_steem": 303.2,
                "weekly_sbd": 0,
                "weekly_steem": 32
            },
            {
                "name": "lyubovbar",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "mesba",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "momo74",
                "lifetime_sbd": 0.25,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "ip04",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "exhige",
                "lifetime_sbd": 40,
                "lifetime_steem": 140,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "tezmel",
                "lifetime_sbd": 95,
                "lifetime_steem": 107.7,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "noopu",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "wanderwithtwo",
                "lifetime_sbd": 40,
                "lifetime_steem": 2.5,
                "weekly_sbd": 2.5,
                "weekly_steem": 0
            },
            {
                "name": "felixixi",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "mashiliyanage",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "indigoocean",
                "lifetime_sbd": 163.9,
                "lifetime_steem": 2.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "meno",
                "lifetime_sbd": 111.67,
                "lifetime_steem": 24.9,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "arslan.hero",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "waheed.ansari1",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "slanty1",
                "lifetime_sbd": 3,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "askquestion",
                "lifetime_sbd": 4.7,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "funny-gifs",
                "lifetime_sbd": 0.2,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "latestmusic",
                "lifetime_sbd": 0.2,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "nurhayati",
                "lifetime_sbd": 5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "sarjoni",
                "lifetime_sbd": 5.09,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "miti",
                "lifetime_sbd": 319.99,
                "lifetime_steem": 4.63,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "meher04",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "shrazi",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "deadzy",
                "lifetime_sbd": 27.6,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "yandot",
                "lifetime_sbd": 42.5,
                "lifetime_steem": 10,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "irvanhelmi",
                "lifetime_sbd": 30.5,
                "lifetime_steem": 22.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "isfar",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "helmi",
                "lifetime_sbd": 10,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "steemitadventure",
                "lifetime_sbd": 27.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "mistakili",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "aulia1993",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 3.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "hattaarshavin",
                "lifetime_sbd": 62.5,
                "lifetime_steem": 96.5,
                "weekly_sbd": 0,
                "weekly_steem": 23
            },
            {
                "name": "jacksartori",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "anzirpasai",
                "lifetime_sbd": 5.15,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "diantbi",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "abialfatih",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "ronaldoavelino",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "zoltarian",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "arslan.saleem",
                "lifetime_sbd": 5,
                "lifetime_steem": 10.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "jazztasm",
                "lifetime_sbd": 22.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "amryksr",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "thechosenwhan",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "bohyee12",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "dedyrendra",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "edy90",
                "lifetime_sbd": 0,
                "lifetime_steem": 0.8,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "khim",
                "lifetime_sbd": 0,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "dunstuff",
                "lifetime_sbd": 1.404,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "bxt",
                "lifetime_sbd": 5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "bidbots",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "pabloptimista",
                "lifetime_sbd": 7.5,
                "lifetime_steem": 2.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "thatkidsblack",
                "lifetime_sbd": 1,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "skyleap",
                "lifetime_sbd": 75.11,
                "lifetime_steem": 75,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "gabrielatigger",
                "lifetime_sbd": 2.8,
                "lifetime_steem": 2.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "arunava",
                "lifetime_sbd": 48.18,
                "lifetime_steem": 76.69,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "votemen",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "deadspace",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "celestal",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 115,
                "weekly_sbd": 0,
                "weekly_steem": 30
            },
            {
                "name": "limesoda",
                "lifetime_sbd": 70,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "nissla",
                "lifetime_sbd": 55.5,
                "lifetime_steem": 318,
                "weekly_sbd": 0,
                "weekly_steem": 30
            },
            {
                "name": "luschn",
                "lifetime_sbd": 10,
                "lifetime_steem": 12.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "azizbd",
                "lifetime_sbd": 319.18,
                "lifetime_steem": 1390.39,
                "weekly_sbd": 0,
                "weekly_steem": 72.5
            },
            {
                "name": "berndpfeiffer",
                "lifetime_sbd": 17.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "canburaksimsek",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "weitblicker",
                "lifetime_sbd": 42,
                "lifetime_steem": 195,
                "weekly_sbd": 0,
                "weekly_steem": 8
            },
            {
                "name": "avance",
                "lifetime_sbd": 0,
                "lifetime_steem": 80,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "steemrobot",
                "lifetime_sbd": 0,
                "lifetime_steem": 1.57,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "zulfikar-fx",
                "lifetime_sbd": 0,
                "lifetime_steem": 2.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "mandelsage",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 74.9,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "steem-bootcamp",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "a-k-nirob",
                "lifetime_sbd": 0,
                "lifetime_steem": 14.4,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "seaquester2",
                "lifetime_sbd": 0,
                "lifetime_steem": 0.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "madlenfox",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 70,
                "weekly_sbd": 0,
                "weekly_steem": 6
            },
            {
                "name": "aknirob",
                "lifetime_sbd": 0,
                "lifetime_steem": 7.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "honeydue",
                "lifetime_sbd": 95,
                "lifetime_steem": 91.4,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "oppovote",
                "lifetime_sbd": 0,
                "lifetime_steem": 2.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "muksalmacro",
                "lifetime_sbd": 0,
                "lifetime_steem": 25,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "muliadimacro",
                "lifetime_sbd": 5,
                "lifetime_steem": 25,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "imranroza",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "smartsteemit",
                "lifetime_sbd": 0,
                "lifetime_steem": 2.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "steemitgeek",
                "lifetime_sbd": 0,
                "lifetime_steem": 6.99,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "bengal-triger",
                "lifetime_sbd": 0,
                "lifetime_steem": 2.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "darkline",
                "lifetime_sbd": 3,
                "lifetime_steem": 8.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "dion66",
                "lifetime_sbd": 0,
                "lifetime_steem": 2.3,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "itikna09",
                "lifetime_sbd": 0,
                "lifetime_steem": 2.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "kapitanrejven",
                "lifetime_sbd": 0,
                "lifetime_steem": 2.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "poeticsnake",
                "lifetime_sbd": 5,
                "lifetime_steem": 15,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "sourovafrin",
                "lifetime_sbd": 0,
                "lifetime_steem": 1,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "carnation",
                "lifetime_sbd": 0,
                "lifetime_steem": 2.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "cryptocurator",
                "lifetime_sbd": 6,
                "lifetime_steem": 5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "rivalzzz",
                "lifetime_sbd": 20.5,
                "lifetime_steem": 368.75,
                "weekly_sbd": 0,
                "weekly_steem": 111.25
            },
            {
                "name": "abdulmanan",
                "lifetime_sbd": 0.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "alexsandr",
                "lifetime_sbd": 0,
                "lifetime_steem": 5.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "llfarms",
                "lifetime_sbd": 12,
                "lifetime_steem": 10,
                "weekly_sbd": 12,
                "weekly_steem": 0
            },
            {
                "name": "joseda32",
                "lifetime_sbd": 0,
                "lifetime_steem": 0.2,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "schmidt2015",
                "lifetime_sbd": 0,
                "lifetime_steem": 22.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "thebugiq",
                "lifetime_sbd": 0,
                "lifetime_steem": 10,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "teukumuladi",
                "lifetime_sbd": 0,
                "lifetime_steem": 10,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "rasel5",
                "lifetime_sbd": 0,
                "lifetime_steem": 2.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "yo-yo",
                "lifetime_sbd": 36,
                "lifetime_steem": 106.5,
                "weekly_sbd": 0,
                "weekly_steem": 15
            },
            {
                "name": "louis88",
                "lifetime_sbd": 15.5,
                "lifetime_steem": 67.5,
                "weekly_sbd": 0,
                "weekly_steem": 25
            },
            {
                "name": "kaneni",
                "lifetime_sbd": 0,
                "lifetime_steem": 2.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "denjiro",
                "lifetime_sbd": 0,
                "lifetime_steem": 2.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "sweetsqueenyumi",
                "lifetime_sbd": 0,
                "lifetime_steem": 7.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "wahyurahadiann",
                "lifetime_sbd": 0,
                "lifetime_steem": 2.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "avtoledy",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "oliverschmid",
                "lifetime_sbd": 0,
                "lifetime_steem": 428.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "zikrisetiawan",
                "lifetime_sbd": 0,
                "lifetime_steem": 22.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "susanlo",
                "lifetime_sbd": 19,
                "lifetime_steem": 164.52,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "teukuzikri",
                "lifetime_sbd": 0,
                "lifetime_steem": 12.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "khanza.aulia",
                "lifetime_sbd": 0,
                "lifetime_steem": 2.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "owner99",
                "lifetime_sbd": 0,
                "lifetime_steem": 7.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "teukumuksal",
                "lifetime_sbd": 0,
                "lifetime_steem": 7.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "justaboutart",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "super-em",
                "lifetime_sbd": 17,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "davidke20",
                "lifetime_sbd": 30,
                "lifetime_steem": 2.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "catwomanteresa",
                "lifetime_sbd": 148.5,
                "lifetime_steem": 75,
                "weekly_sbd": 0,
                "weekly_steem": 10
            },
            {
                "name": "nureza",
                "lifetime_sbd": 5,
                "lifetime_steem": 2.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "runicar",
                "lifetime_sbd": 0,
                "lifetime_steem": 2.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "allanagraves",
                "lifetime_sbd": 0,
                "lifetime_steem": 17.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "ladyrebecca",
                "lifetime_sbd": 68.5,
                "lifetime_steem": 20,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "ayuramona",
                "lifetime_sbd": 0,
                "lifetime_steem": 2.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "hafizul",
                "lifetime_sbd": 0,
                "lifetime_steem": 2.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "bobskibob",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "nainaztengra",
                "lifetime_sbd": 581.5,
                "lifetime_steem": 756.69,
                "weekly_sbd": 54,
                "weekly_steem": 32
            },
            {
                "name": "altafalazzam",
                "lifetime_sbd": 1.104,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "midlet",
                "lifetime_sbd": 154.05,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "cryptosharon",
                "lifetime_sbd": 62.5,
                "lifetime_steem": 25,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "fknmayhem",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 30,
                "weekly_sbd": 0,
                "weekly_steem": 10
            },
            {
                "name": "pharesim",
                "lifetime_sbd": 65.5,
                "lifetime_steem": 152,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "yasu",
                "lifetime_sbd": 4.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "tegoshei",
                "lifetime_sbd": 22.5,
                "lifetime_steem": 78.94,
                "weekly_sbd": 0,
                "weekly_steem": 6
            },
            {
                "name": "yanes94",
                "lifetime_sbd": 7.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "tashidelek",
                "lifetime_sbd": 157.5,
                "lifetime_steem": 30,
                "weekly_sbd": 39,
                "weekly_steem": 30
            },
            {
                "name": "rezoanulvibes",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "geekpowered",
                "lifetime_sbd": 297.36,
                "lifetime_steem": 2343.69,
                "weekly_sbd": 0,
                "weekly_steem": 194.74
            },
            {
                "name": "ylich",
                "lifetime_sbd": 5,
                "lifetime_steem": 14,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "fervi",
                "lifetime_sbd": 1.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "justdentist",
                "lifetime_sbd": 22.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "cre47iv3",
                "lifetime_sbd": 36,
                "lifetime_steem": 3,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "kimzwarch",
                "lifetime_sbd": 97,
                "lifetime_steem": 784.6,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "shenchensucc",
                "lifetime_sbd": 23.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "kiwibot",
                "lifetime_sbd": 5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "ahmadmanga",
                "lifetime_sbd": 1.297,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "siucatti",
                "lifetime_sbd": 0,
                "lifetime_steem": 6,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "schamangerbert",
                "lifetime_sbd": 48.5,
                "lifetime_steem": 321.25,
                "weekly_sbd": 0,
                "weekly_steem": 44
            },
            {
                "name": "for91days",
                "lifetime_sbd": 39.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "jpphotography",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "yanyanbebe",
                "lifetime_sbd": 12.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "obvious",
                "lifetime_sbd": 64.95,
                "lifetime_steem": 46,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "itchyfeetdonica",
                "lifetime_sbd": 0,
                "lifetime_steem": 46.06,
                "weekly_sbd": 0,
                "weekly_steem": 13.63
            },
            {
                "name": "alvin0617",
                "lifetime_sbd": 38.79,
                "lifetime_steem": 260.5,
                "weekly_sbd": 0,
                "weekly_steem": 15
            },
            {
                "name": "saafir",
                "lifetime_sbd": 0,
                "lifetime_steem": 5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "whack.science",
                "lifetime_sbd": 0,
                "lifetime_steem": 892,
                "weekly_sbd": 0,
                "weekly_steem": 64
            },
            {
                "name": "mindtrap",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 145.6,
                "weekly_sbd": 0,
                "weekly_steem": 47.6
            },
            {
                "name": "minloulou",
                "lifetime_sbd": 1,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "felander",
                "lifetime_sbd": 0,
                "lifetime_steem": 653,
                "weekly_sbd": 0,
                "weekly_steem": 111
            },
            {
                "name": "oleg326756",
                "lifetime_sbd": 45,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "leotrap",
                "lifetime_sbd": 35,
                "lifetime_steem": 314,
                "weekly_sbd": 0,
                "weekly_steem": 63
            },
            {
                "name": "jasonrussell",
                "lifetime_sbd": 37,
                "lifetime_steem": 136,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "preparedwombat",
                "lifetime_sbd": 0,
                "lifetime_steem": 149.18,
                "weekly_sbd": 0,
                "weekly_steem": 30
            },
            {
                "name": "pauli0606",
                "lifetime_sbd": 1,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "norat23",
                "lifetime_sbd": 0,
                "lifetime_steem": 1,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "minimining",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "gumegxgolgom",
                "lifetime_sbd": 0,
                "lifetime_steem": 2.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "zephalexia",
                "lifetime_sbd": 2.5,
                "lifetime_steem": 10,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "blanchy",
                "lifetime_sbd": 133.93,
                "lifetime_steem": 118.16,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "schubes",
                "lifetime_sbd": 0,
                "lifetime_steem": 8,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "malos10",
                "lifetime_sbd": 0,
                "lifetime_steem": 1,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "angryman",
                "lifetime_sbd": 9,
                "lifetime_steem": 152,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "harkar",
                "lifetime_sbd": 203,
                "lifetime_steem": 2530.59,
                "weekly_sbd": 0,
                "weekly_steem": 163
            },
            {
                "name": "trudeehunter",
                "lifetime_sbd": 176,
                "lifetime_steem": 2512,
                "weekly_sbd": 0,
                "weekly_steem": 192
            },
            {
                "name": "ikarus56",
                "lifetime_sbd": 0.3,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "kaliangel",
                "lifetime_sbd": 0,
                "lifetime_steem": 1.752,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "karja",
                "lifetime_sbd": 362,
                "lifetime_steem": 2220.5,
                "weekly_sbd": 0,
                "weekly_steem": 260
            },
            {
                "name": "aussieninja",
                "lifetime_sbd": 13,
                "lifetime_steem": 99,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "scrooger",
                "lifetime_sbd": 5.57,
                "lifetime_steem": 10,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "lightcaptured",
                "lifetime_sbd": 14.95,
                "lifetime_steem": 1.93,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "torachibi",
                "lifetime_sbd": 1.135,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "saracampero",
                "lifetime_sbd": 5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "kryptik",
                "lifetime_sbd": 12,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "moneybaby",
                "lifetime_sbd": 24.41,
                "lifetime_steem": 108.9,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "jsf",
                "lifetime_sbd": 0.8,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "chetanpadliya",
                "lifetime_sbd": 8,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "sbdbuysellbd",
                "lifetime_sbd": 0.196,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "avirajroy",
                "lifetime_sbd": 0.196,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "lizanomadsoul",
                "lifetime_sbd": 8,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "charitycurator",
                "lifetime_sbd": 0,
                "lifetime_steem": 10,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "tauras",
                "lifetime_sbd": 1,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "manoldonchev",
                "lifetime_sbd": 4,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "silentscreamer",
                "lifetime_sbd": 0,
                "lifetime_steem": 2,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "steeimran",
                "lifetime_sbd": 5,
                "lifetime_steem": 1.26,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "liumei",
                "lifetime_sbd": 2,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "lichtcatchtoby",
                "lifetime_sbd": 8,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "lordbutterfly",
                "lifetime_sbd": 10,
                "lifetime_steem": 12,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "reveur",
                "lifetime_sbd": 10,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "nnnarvaez",
                "lifetime_sbd": 20,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "verhp11",
                "lifetime_sbd": 2,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "reinikaerrant",
                "lifetime_sbd": 0,
                "lifetime_steem": 64,
                "weekly_sbd": 0,
                "weekly_steem": 30
            },
            {
                "name": "holger80",
                "lifetime_sbd": 0,
                "lifetime_steem": 153,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "jrvacation",
                "lifetime_sbd": 35,
                "lifetime_steem": 357,
                "weekly_sbd": 0,
                "weekly_steem": 15
            },
            {
                "name": "steemitfriend",
                "lifetime_sbd": 0,
                "lifetime_steem": 0.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "templo",
                "lifetime_sbd": 6,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "connecteconomy",
                "lifetime_sbd": 159,
                "lifetime_steem": 875,
                "weekly_sbd": 0,
                "weekly_steem": 148
            },
            {
                "name": "veta-less",
                "lifetime_sbd": 24,
                "lifetime_steem": 150,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "ocd",
                "lifetime_sbd": 12,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "freddysanchez",
                "lifetime_sbd": 3.838,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "explorenature",
                "lifetime_sbd": 0,
                "lifetime_steem": 5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "aaronleang",
                "lifetime_sbd": 104,
                "lifetime_steem": 165,
                "weekly_sbd": 0,
                "weekly_steem": 40
            },
            {
                "name": "ocdbfund",
                "lifetime_sbd": 0,
                "lifetime_steem": 1615,
                "weekly_sbd": 0,
                "weekly_steem": 50
            },
            {
                "name": "eveuncovered",
                "lifetime_sbd": 20,
                "lifetime_steem": 260,
                "weekly_sbd": 0,
                "weekly_steem": 25
            },
            {
                "name": "vipnata",
                "lifetime_sbd": 1,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "permaculturedude",
                "lifetime_sbd": 0,
                "lifetime_steem": 21.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "manncpt",
                "lifetime_sbd": 6.52,
                "lifetime_steem": 170.24,
                "weekly_sbd": 0,
                "weekly_steem": 29.23
            },
            {
                "name": "therealwolf",
                "lifetime_sbd": 0,
                "lifetime_steem": 20,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "mvd",
                "lifetime_sbd": 4,
                "lifetime_steem": 759.33,
                "weekly_sbd": 0,
                "weekly_steem": 92
            },
            {
                "name": "piotrgrafik",
                "lifetime_sbd": 0,
                "lifetime_steem": 1025,
                "weekly_sbd": 0,
                "weekly_steem": 135
            },
            {
                "name": "helenoftroy",
                "lifetime_sbd": 7,
                "lifetime_steem": 35,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "vegansofsteemit",
                "lifetime_sbd": 0,
                "lifetime_steem": 168.19,
                "weekly_sbd": 0,
                "weekly_steem": 33
            },
            {
                "name": "evecab",
                "lifetime_sbd": 0,
                "lifetime_steem": 237,
                "weekly_sbd": 0,
                "weekly_steem": 30
            },
            {
                "name": "guchtere",
                "lifetime_sbd": 0,
                "lifetime_steem": 159.97,
                "weekly_sbd": 0,
                "weekly_steem": 16
            },
            {
                "name": "pifc",
                "lifetime_sbd": 0,
                "lifetime_steem": 28,
                "weekly_sbd": 0,
                "weekly_steem": 5
            },
            {
                "name": "askari",
                "lifetime_sbd": 0,
                "lifetime_steem": 1,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "julisavio",
                "lifetime_sbd": 0,
                "lifetime_steem": 1,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "soufiani",
                "lifetime_sbd": 0.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "redrica",
                "lifetime_sbd": 0,
                "lifetime_steem": 126,
                "weekly_sbd": 0,
                "weekly_steem": 28
            },
            {
                "name": "xyzashu",
                "lifetime_sbd": 0,
                "lifetime_steem": 2579.11,
                "weekly_sbd": 0,
                "weekly_steem": 512.71
            },
            {
                "name": "svemirac",
                "lifetime_sbd": 0,
                "lifetime_steem": 5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "mdmostofa",
                "lifetime_sbd": 0,
                "lifetime_steem": 2,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "moshiur",
                "lifetime_sbd": 0,
                "lifetime_steem": 0.5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "delishtreats",
                "lifetime_sbd": 0,
                "lifetime_steem": 109.6,
                "weekly_sbd": 0,
                "weekly_steem": 13.02
            },
            {
                "name": "anmitsu",
                "lifetime_sbd": 0,
                "lifetime_steem": 15,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "swedishdragon",
                "lifetime_sbd": 0,
                "lifetime_steem": 15,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "gibic",
                "lifetime_sbd": 0,
                "lifetime_steem": 11.64,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "keithboone",
                "lifetime_sbd": 0,
                "lifetime_steem": 66.9,
                "weekly_sbd": 0,
                "weekly_steem": 9.79
            },
            {
                "name": "agnikana",
                "lifetime_sbd": 2,
                "lifetime_steem": 6,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "meow99",
                "lifetime_sbd": 30,
                "lifetime_steem": 60,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "erikah",
                "lifetime_sbd": 0,
                "lifetime_steem": 727.04,
                "weekly_sbd": 0,
                "weekly_steem": 125.5
            },
            {
                "name": "shepz1",
                "lifetime_sbd": 12.5,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "syedumair",
                "lifetime_sbd": 0,
                "lifetime_steem": 262,
                "weekly_sbd": 0,
                "weekly_steem": 62
            },
            {
                "name": "beer32",
                "lifetime_sbd": 60,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "el-cr",
                "lifetime_sbd": 0,
                "lifetime_steem": 189,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "fotostef",
                "lifetime_sbd": 0,
                "lifetime_steem": 25.78,
                "weekly_sbd": 0,
                "weekly_steem": 1.1
            },
            {
                "name": "vanessapineda7",
                "lifetime_sbd": 22,
                "lifetime_steem": 46,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "cameraman",
                "lifetime_sbd": 0,
                "lifetime_steem": 128,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "psionic-tremors",
                "lifetime_sbd": 8,
                "lifetime_steem": 30,
                "weekly_sbd": 0,
                "weekly_steem": 10
            },
            {
                "name": "por500bolos",
                "lifetime_sbd": 20,
                "lifetime_steem": 0,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "mrkhabib",
                "lifetime_sbd": 0,
                "lifetime_steem": 50,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "melinda010100",
                "lifetime_sbd": 0,
                "lifetime_steem": 396,
                "weekly_sbd": 0,
                "weekly_steem": 61
            },
            {
                "name": "bengy",
                "lifetime_sbd": 0,
                "lifetime_steem": 85,
                "weekly_sbd": 0,
                "weekly_steem": 30
            },
            {
                "name": "bluemoon",
                "lifetime_sbd": 0,
                "lifetime_steem": 150,
                "weekly_sbd": 0,
                "weekly_steem": 47
            },
            {
                "name": "janton",
                "lifetime_sbd": 0,
                "lifetime_steem": 210,
                "weekly_sbd": 0,
                "weekly_steem": 50
            },
            {
                "name": "ninjavideo",
                "lifetime_sbd": 0,
                "lifetime_steem": 138,
                "weekly_sbd": 0,
                "weekly_steem": 20
            },
            {
                "name": "tibfox",
                "lifetime_sbd": 0,
                "lifetime_steem": 174.53,
                "weekly_sbd": 0,
                "weekly_steem": 30
            },
            {
                "name": "avral",
                "lifetime_sbd": 0,
                "lifetime_steem": 20,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "neokuduk",
                "lifetime_sbd": 0,
                "lifetime_steem": 5,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "steemonboarding",
                "lifetime_sbd": 0,
                "lifetime_steem": 102,
                "weekly_sbd": 0,
                "weekly_steem": 63
            },
            {
                "name": "jeezzle",
                "lifetime_sbd": 0,
                "lifetime_steem": 20,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "summisimeon",
                "lifetime_sbd": 0,
                "lifetime_steem": 3,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "blockxx",
                "lifetime_sbd": 0,
                "lifetime_steem": 653,
                "weekly_sbd": 0,
                "weekly_steem": 393
            },
            {
                "name": "dindar",
                "lifetime_sbd": 0,
                "lifetime_steem": 2,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "nightx",
                "lifetime_sbd": 0,
                "lifetime_steem": 75,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "roadroad",
                "lifetime_sbd": 0,
                "lifetime_steem": 135,
                "weekly_sbd": 0,
                "weekly_steem": 60
            },
            {
                "name": "steemabc",
                "lifetime_sbd": 0,
                "lifetime_steem": 210,
                "weekly_sbd": 0,
                "weekly_steem": 150
            },
            {
                "name": "tenbu",
                "lifetime_sbd": 0,
                "lifetime_steem": 75,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "livinguktaiwan",
                "lifetime_sbd": 0,
                "lifetime_steem": 95,
                "weekly_sbd": 0,
                "weekly_steem": 75
            },
            {
                "name": "tooyoung1",
                "lifetime_sbd": 0,
                "lifetime_steem": 45,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "khatab505",
                "lifetime_sbd": 0,
                "lifetime_steem": 3.918,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "vroh04",
                "lifetime_sbd": 0,
                "lifetime_steem": 3.9,
                "weekly_sbd": 0,
                "weekly_steem": 0
            },
            {
                "name": "changjia",
                "lifetime_sbd": 0,
                "lifetime_steem": 1244,
                "weekly_sbd": 0,
                "weekly_steem": 1106
            },
            {
                "name": "oneonezero",
                "lifetime_sbd": 0,
                "lifetime_steem": 95,
                "weekly_sbd": 0,
                "weekly_steem": 50
            },
            {
                "name": "ghostwang",
                "lifetime_sbd": 0,
                "lifetime_steem": 490,
                "weekly_sbd": 0,
                "weekly_steem": 490
            },
            {
                "name": "speedxx",
                "lifetime_sbd": 0,
                "lifetime_steem": 100,
                "weekly_sbd": 0,
                "weekly_steem": 100
            },
            {
                "name": "miroslavrc",
                "lifetime_sbd": 0,
                "lifetime_steem": 5,
                "weekly_sbd": 0,
                "weekly_steem": 5
            },
            {
                "name": "moonunit",
                "lifetime_sbd": 0,
                "lifetime_steem": 5.5,
                "weekly_sbd": 0,
                "weekly_steem": 5.5
            },
            {
                "name": "marie-jay",
                "lifetime_sbd": 0,
                "lifetime_steem": 6,
                "weekly_sbd": 0,
                "weekly_steem": 6
            },
            {
                "name": "fmbs25",
                "lifetime_sbd": 0,
                "lifetime_steem": 10,
                "weekly_sbd": 0,
                "weekly_steem": 10
            },
            {
                "name": "soyrosa",
                "lifetime_sbd": 0,
                "lifetime_steem": 31,
                "weekly_sbd": 0,
                "weekly_steem": 31
            },
            {
                "name": "melodyrussell",
                "lifetime_sbd": 0,
                "lifetime_steem": 10,
                "weekly_sbd": 0,
                "weekly_steem": 10
            },
            {
                "name": "qira",
                "lifetime_sbd": 0,
                "lifetime_steem": 128,
                "weekly_sbd": 0,
                "weekly_steem": 128
            },
            {
                "name": "boxxxx",
                "lifetime_sbd": 0,
                "lifetime_steem": 100,
                "weekly_sbd": 0,
                "weekly_steem": 100
            },
            {
                "name": "detlev",
                "lifetime_sbd": 0,
                "lifetime_steem": 50,
                "weekly_sbd": 0,
                "weekly_steem": 50
            }
        ]//await bidbot.get_earnings_per_user();

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

            let share = Math.floor(((parseFloat(ocdbfund[0].balance) * share_percentage)-0.001) * 1000) / 1000;

            if (share < 0.001)
                share = 0;

            active_parents[i].share = share;
        }


        for (let i = 0; i < active_parents.length; i++)
        {
            await transfer(process.env.ACCOUNT, active_parents[i].name,  "0.001 STEEM", "gg", process.env.ACTIVE_KEY);
            await power_up(process.env.ACCOUNT, active_parents[i].name,  active_parents[i].share + " STEEM", process.env.ACTIVE_KEY);
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