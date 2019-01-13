const dsteem = require('dsteem');
const utils = require("./utils");
const config = require("./config");
const is_url = require("is-url");

const client = new dsteem.Client('https://api.steemit.com');

const main_account = "ocdb";
const iterate_nb = 500;





function get_transactions() {
    return new Promise(async resolve => {

        let transactions = [];
        let start = 0;
        let highest_tx = await utils.get_highest_tx(main_account);

        do {

            let data = await client.database.call("get_account_history", [main_account, start + iterate_nb, iterate_nb]);
            let newest_tx = 0;

            for (let i = 0; i < data.length; i++) {
                let tx = data[i][1];
                if (tx.op[0] === "transfer" && tx.op[1].memo !== "" && is_url(tx.op[1].memo) === true) {
                    let custom_transaction = tx.op[1];

                    custom_transaction.timestamp = data[i][1].timestamp
                    transactions.push(custom_transaction);
                }
            }

            newest_tx = data[data.length - 1][0];
            start = newest_tx;
        } while (highest_tx - start !== 0);
        return resolve(transactions);
    })
}

async function get_earnings_per_user()
{
    console.log("Grabbing All ocdb transfers...");
    let transactions = [
        {
            "from": "anomadsoul",
            "to": "ocdb",
            "amount": "0.100 SBD",
            "memo": "https://steemit.com/busy/@anomadsoul/my-one-year-anniversary-on-steemit-is-coming-or-what-would-you-like-to-know-about-me",
            "timestamp": "2018-04-22T02:36:54"
        },
        {
            "from": "gmuxx",
            "to": "ocdb",
            "amount": "0.500 STEEM",
            "memo": "https://steemit.com/fiction/@gmuxx/sir-muxxy-rides-again",
            "timestamp": "2018-04-23T16:48:51"
        },
        {
            "from": "gmuxx",
            "to": "ocdb",
            "amount": "0.500 STEEM",
            "memo": "https://steemit.com/fiction/@gmuxx/sir-muxxy-rides-again",
            "timestamp": "2018-04-23T16:51:09"
        },
        {
            "from": "m31",
            "to": "ocdb",
            "amount": "0.100 SBD",
            "memo": "https://steemit.com/photography/@m31/moss",
            "timestamp": "2018-04-23T17:01:51"
        },
        {
            "from": "jeanpi1908",
            "to": "ocdb",
            "amount": "0.300 STEEM",
            "memo": "https://steemit.com/art/@jeanpi1908/my-10-favorite-artworks-from-dominaria-mtg",
            "timestamp": "2018-04-23T17:07:54"
        },
        {
            "from": "guyfawkes4-20",
            "to": "ocdb",
            "amount": "0.100 STEEM",
            "memo": "https://steemit.com/philosophy/@guyfawkes4-20/good-and-evil",
            "timestamp": "2018-04-23T17:11:27"
        },
        {
            "from": "elteamgordo",
            "to": "ocdb",
            "amount": "0.100 SBD",
            "memo": "https://steemit.com/spanish/@elteamgordo/recordando-a-los-amigos-espaoles-en-100--2018-04-22-00-05-25",
            "timestamp": "2018-04-23T17:17:45"
        },
        {
            "from": "guyfawkes4-20",
            "to": "ocdb",
            "amount": "0.100 STEEM",
            "memo": "https://steemit.com/japanese/@koganekaeru/google-chrome#@fukako/re-koganekaeru-google-chrome-20180422t101131446z",
            "timestamp": "2018-04-23T17:20:51"
        },
        {
            "from": "elteamgordo",
            "to": "ocdb",
            "amount": "0.200 SBD",
            "memo": "https://steemit.com/spanish/@mauriciovite/weecmbrm",
            "timestamp": "2018-04-23T17:24:45"
        },
        {
            "from": "elteamgordo",
            "to": "ocdb",
            "amount": "0.490 SBD",
            "memo": "https://steemit.com/spanish/@elteamgordo/festin-latinoamericano-con-un-patacon-feijoada-y-un-ceviche-peruano",
            "timestamp": "2018-04-23T17:28:39"
        },
        {
            "from": "elteamgordo",
            "to": "ocdb",
            "amount": "0.350 SBD",
            "memo": "https://steemit.com/spanish/@elteamgordo/festin-latinoamericano-con-un-patacon-feijoada-y-un-ceviche-peruano",
            "timestamp": "2018-04-23T17:31:27"
        },
        {
            "from": "elteamgordo",
            "to": "ocdb",
            "amount": "0.270 SBD",
            "memo": "https://steemit.com/spanish/@elteamgordo/recordando-a-los-amigos-espaoles-en-100--2018-04-22-00-05-25",
            "timestamp": "2018-04-23T17:34:33"
        },
        {
            "from": "jeanpi1908",
            "to": "ocdb",
            "amount": "0.300 STEEM",
            "memo": "https://steemit.com/art/@jeanpi1908/my-10-favorite-artworks-from-dominaria-mtg",
            "timestamp": "2018-04-23T17:46:33"
        },
        {
            "from": "futurethinker",
            "to": "ocdb",
            "amount": "0.100 SBD",
            "memo": "https://steemit.com/ians/@gmuxx/introduce-a-new-steemian-share",
            "timestamp": "2018-04-23T18:35:27"
        },
        {
            "from": "jeanpi1908",
            "to": "ocdb",
            "amount": "0.100 STEEM",
            "memo": "https://steemit.com/steemnova/@steemnova/steemnova---2018-04-22-daily-alliance-shares-and-player-rewards",
            "timestamp": "2018-04-23T20:31:39"
        },
        {
            "from": "jeanpi1908",
            "to": "ocdb",
            "amount": "0.100 STEEM",
            "memo": "https://steemit.com/steemnova/@steemnova/steemnova---2018-04-21-daily-alliance-shares-and-player-rewards",
            "timestamp": "2018-04-23T20:31:54"
        },
        {
            "from": "jeanpi1908",
            "to": "ocdb",
            "amount": "0.100 STEEM",
            "memo": "https://steemit.com/steemnova/@steemnova/steemnova---2018-04-20-daily-alliance-shares-and-player-rewards",
            "timestamp": "2018-04-23T20:32:09"
        },
        {
            "from": "jeanpi1908",
            "to": "ocdb",
            "amount": "0.300 STEEM",
            "memo": "https://steemit.com/art/@jeanpi1908/my-10-favorite-artworks-from-dominaria-mtg",
            "timestamp": "2018-04-23T20:33:03"
        },
        {
            "from": "jeanpi1908",
            "to": "ocdb",
            "amount": "0.200 STEEM",
            "memo": "https://steemit.com/art/@jeanpi1908/my-10-favorite-artworks-from-dominaria-mtg",
            "timestamp": "2018-04-23T20:33:51"
        },
        {
            "from": "jeanpi1908",
            "to": "ocdb",
            "amount": "0.100 STEEM",
            "memo": "https://steemit.com/busy/@anomadsoul/it-s-over-9-000-or-a-vegeta-follower-milestone-and-a-cave-exploration",
            "timestamp": "2018-04-23T20:36:48"
        },
        {
            "from": "dianna1",
            "to": "ocdb",
            "amount": "0.100 SBD",
            "memo": "https://steemit.com/tr/@dianna1/sanal-para-duenyasi-yuekselise-gecti-son-rakamlar-nelerdir-48cfe97dd525b",
            "timestamp": "2018-04-23T21:09:09"
        },
        {
            "from": "theaustrianguy",
            "to": "ocdb",
            "amount": "0.100 STEEM",
            "memo": "https://steemit.com/deutsch/@theaustrianguy/8-virtuelles-meetup-montag-7-05-ab-19-uhr-im-d-a-ch-discordserver",
            "timestamp": "2018-04-24T06:22:54"
        },
        {
            "from": "theaustrianguy",
            "to": "ocdb",
            "amount": "0.100 STEEM",
            "memo": "https://steemit.com/deutsch/@theaustrianguy/fachhochschule-limesoda-theaustrianguy-steem-it-blockchain",
            "timestamp": "2018-04-24T12:23:15"
        },
        {
            "from": "saywha",
            "to": "ocdb",
            "amount": "0.250 SBD",
            "memo": "https://steemit.com/comics/@saywha/start-your-collection-today-cheap-ish-comic-reads-for-people-who-aren-t-comic-collectors-yet",
            "timestamp": "2018-04-24T18:47:33"
        },
        {
            "from": "saywha",
            "to": "ocdb",
            "amount": "0.250 SBD",
            "memo": "https://steemit.com/pokemon/@saywha/my-pokemon-holo-card-collection-nostalgia-101",
            "timestamp": "2018-04-24T18:48:03"
        },
        {
            "from": "saywha",
            "to": "ocdb",
            "amount": "0.250 SBD",
            "memo": "https://steemit.com/comics/@saywha/classic-deadpool-marvel-legend",
            "timestamp": "2018-04-24T18:48:33"
        },
        {
            "from": "saywha",
            "to": "ocdb",
            "amount": "0.250 SBD",
            "memo": "https://steemit.com/comics/@saywha/starlord-and-ego-marvel-legends",
            "timestamp": "2018-04-24T18:48:54"
        },
        {
            "from": "saywha",
            "to": "ocdb",
            "amount": "0.150 SBD",
            "memo": "https://steemit.com/pokemon/@saywha/my-pokemon-holo-card-collection-nostalgia-101",
            "timestamp": "2018-04-24T18:53:42"
        },
        {
            "from": "saywha",
            "to": "ocdb",
            "amount": "0.150 SBD",
            "memo": "https://steemit.com/comics/@saywha/starlord-and-ego-marvel-legends",
            "timestamp": "2018-04-24T22:05:21"
        },
        {
            "from": "saywha",
            "to": "ocdb",
            "amount": "0.200 SBD",
            "memo": "https://steemit.com/comics/@saywha/let-me-buy-you-some-comics-seriously",
            "timestamp": "2018-04-27T03:53:57"
        },
        {
            "from": "saywha",
            "to": "ocdb",
            "amount": "0.250 SBD",
            "memo": "https://steemit.com/comics/@saywha/thanos-demands-your-silence-aka-don-t-be-a-jerk",
            "timestamp": "2018-04-28T04:54:24"
        },
        {
            "from": "jeanpi1908",
            "to": "ocdb",
            "amount": "0.180 STEEM",
            "memo": "https://steemit.com/deutsch/@jeanpi1908/mein-top-10-der-artworks-aus-dominaria-mtg",
            "timestamp": "2018-04-29T11:32:18"
        },
        {
            "from": "saywha",
            "to": "ocdb",
            "amount": "0.300 SBD",
            "memo": "https://steemit.com/comics/@saywha/the-tale-of-2-cables-date-day",
            "timestamp": "2018-04-29T17:03:42"
        },
        {
            "from": "djynn",
            "to": "ocdb",
            "amount": "0.200 SBD",
            "memo": "https://steemit.com/art/@djynn/learning-to-draw-patterns-with-suminyan10-butterfly-3-with-suminyan10-3",
            "timestamp": "2018-05-01T01:52:12"
        },
        {
            "from": "yasu24",
            "to": "ocdb",
            "amount": "0.100 SBD",
            "memo": "https://steemit.com/dlive/@yasu24/my2018-a-contest-for-those-who-have-never-posted-articles-on-steemit-using-dlive-dlive-steemit",
            "timestamp": "2018-05-01T04:16:57"
        },
        {
            "from": "anomadsoul",
            "to": "ocdb",
            "amount": "0.400 SBD",
            "memo": "https://steemit.com/dlive/@anomadsoul/7494dff0-4d7b-11e8-aa5b-83da28bb4ae3",
            "timestamp": "2018-05-02T16:35:33"
        },
        {
            "from": "anomadsoul",
            "to": "ocdb",
            "amount": "0.030 SBD",
            "memo": "https://steemit.com/busy/@anomadsoul/sndbox-summer-camp-art-quest-intro",
            "timestamp": "2018-05-02T16:41:51"
        },
        {
            "from": "sardrt",
            "to": "ocdb",
            "amount": "0.400 SBD",
            "memo": "https://steemit.com/petals/@petals/petals-to-remind-you-of-the-petals-contest-rules-and-recommendations",
            "timestamp": "2018-05-02T16:47:06"
        },
        {
            "from": "theaustrianguy",
            "to": "ocdb",
            "amount": "0.400 SBD",
            "memo": "https://steemit.com/deutsch/@theaustrianguy/fachkraeftemangel-in-oesterreich",
            "timestamp": "2018-05-02T16:48:27"
        },
        {
            "from": "theaustrianguy",
            "to": "ocdb",
            "amount": "0.400 SBD",
            "memo": "https://steemit.com/steemit/@theaustrianguy/university-limesoda-theaustrianguy-steem-it-blockchain-english-version",
            "timestamp": "2018-05-02T16:48:48"
        },
        {
            "from": "jackjohanneshemp",
            "to": "ocdb",
            "amount": "0.800 SBD",
            "memo": "https://steemit.com/quote/@jackjohanneshemp/thought-of-the-day-gedachte-van-de-dag-02-may-2018",
            "timestamp": "2018-05-02T17:31:27"
        },
        {
            "from": "sardrt",
            "to": "ocdb",
            "amount": "0.400 SBD",
            "memo": "https://steemit.com/petals/@sardrt/4fvnrt-lamprocapnos-spectabilis-photos-by-sard-rt",
            "timestamp": "2018-05-02T17:43:09"
        },
        {
            "from": "jackjohanneshemp",
            "to": "ocdb",
            "amount": "0.800 SBD",
            "memo": "https://steemit.com/quote/@jackjohanneshemp/thought-of-the-day-gedachte-van-de-dag-02-may-2018",
            "timestamp": "2018-05-02T17:56:39"
        },
        {
            "from": "jackjohanneshemp",
            "to": "ocdb",
            "amount": "0.800 SBD",
            "memo": "https://steemit.com/quote/@jackjohanneshemp/thought-of-the-day-gedachte-van-de-dag-02-may-2018",
            "timestamp": "2018-05-02T18:10:06"
        },
        {
            "from": "saywha",
            "to": "ocdb",
            "amount": "0.400 SBD",
            "memo": "https://steemit.com/comics/@saywha/ghost-rider-marvel-legends-ultimate-figure",
            "timestamp": "2018-05-02T18:22:12"
        },
        {
            "from": "yasu24",
            "to": "ocdb",
            "amount": "0.100 SBD",
            "memo": "https://steemit.com/steemit/@yasu24/jpn-eng-exceeded-6-000-posts-and-700-followers-in-steemit-steemit-7-000-600",
            "timestamp": "2018-05-02T23:32:06"
        },
        {
            "from": "yasu24",
            "to": "ocdb",
            "amount": "0.100 SBD",
            "memo": "https://steemit.com/japanese/@yasu24/meetup-the-tax-relations-of-the-crypto-currency",
            "timestamp": "2018-05-02T23:36:27"
        },
        {
            "from": "djynn",
            "to": "ocdb",
            "amount": "0.400 SBD",
            "memo": "https://steemit.com/art/@djynn/monster-under-the-sheet",
            "timestamp": "2018-05-03T00:52:36"
        },
        {
            "from": "yasu24",
            "to": "ocdb",
            "amount": "0.200 SBD",
            "memo": "https://steemit.com/japanese/@yasu24/the-fish-i-have-known-for-the-first-time",
            "timestamp": "2018-05-03T10:38:36"
        },
        {
            "from": "yasu24",
            "to": "ocdb",
            "amount": "0.400 SBD",
            "memo": "https://steemit.com/art/@yasu24/i-drew-3d-steem-banana-3d-steem-banana",
            "timestamp": "2018-05-03T23:36:09"
        },
        {
            "from": "jackjohanneshemp",
            "to": "ocdb",
            "amount": "0.400 SBD",
            "memo": "https://steemit.com/quote/@jackjohanneshemp/thought-of-the-day-gedachte-van-de-dag-03-may-2018",
            "timestamp": "2018-05-03T23:47:03"
        },
        {
            "from": "saywha",
            "to": "ocdb",
            "amount": "0.300 SBD",
            "memo": "https://steemit.com/free/@blewitt/contest-time-who-wants-some-free-comics-and-a-funko-pop",
            "timestamp": "2018-05-04T03:25:03"
        },
        {
            "from": "saywha",
            "to": "ocdb",
            "amount": "0.300 SBD",
            "memo": "https://steemit.com/comics/@saywha/could-secret-wars-be-the-plot-of-avengers-4-no-spoilers",
            "timestamp": "2018-05-04T03:50:30"
        },
        {
            "from": "yasu24",
            "to": "ocdb",
            "amount": "0.400 SBD",
            "memo": "https://steemit.com/bitcoin/@yasu24/bitcoin-and-barber",
            "timestamp": "2018-05-04T22:50:18"
        },
        {
            "from": "jga",
            "to": "ocdb",
            "amount": "0.100 SBD",
            "memo": "https://steemit.com/smartphonephotography/@jznsamuel/the-boat-on-top",
            "timestamp": "2018-05-05T06:32:06"
        },
        {
            "from": "yasu24",
            "to": "ocdb",
            "amount": "0.400 SBD",
            "memo": "https://steemit.com/japanese/@yasu24/false-transmission-i-sent-steem-to-the-address-of-sbd-sbd-steem",
            "timestamp": "2018-05-05T10:39:33"
        },
        {
            "from": "saywha",
            "to": "ocdb",
            "amount": "0.311 SBD",
            "memo": "https://steemit.com/movies/@saywha/standard-vs-3d-movies",
            "timestamp": "2018-05-06T00:35:18"
        },
        {
            "from": "saywha",
            "to": "ocdb",
            "amount": "0.317 SBD",
            "memo": "https://steemit.com/comics/@saywha/free-comic-book-day-haul-5-5-18",
            "timestamp": "2018-05-06T14:23:48"
        },
        {
            "from": "djynn",
            "to": "ocdb",
            "amount": "0.400 SBD",
            "memo": "https://steemit.com/art/@djynn/learning-to-draw-patterns-with-suminyan10-butterfly-4-with-suminyan10-4",
            "timestamp": "2018-05-07T00:14:33"
        },
        {
            "from": "yasu24",
            "to": "ocdb",
            "amount": "0.400 SBD",
            "memo": "https://steemit.com/japanese/@yasu24/5-8-steemit-tokyo-meetup-yesterday-i-sent-24-sbd-to-steemit-jp-steemit-jp-sbd",
            "timestamp": "2018-05-07T03:57:00"
        },
        {
            "from": "yasu24",
            "to": "ocdb",
            "amount": "0.400 SBD",
            "memo": "https://steemit.com/japanese/@yasu24/starbucks-coffee-3-from-amblog-amblog-3",
            "timestamp": "2018-05-07T16:01:15"
        },
        {
            "from": "jeanpi1908",
            "to": "ocdb",
            "amount": "0.274 SBD",
            "memo": "https://steemit.com/deutsch/@jeanpi1908/ein-kochkurs-in-sasbachwalden-mit-der-familie-und-promikoch-klaus-werner-wagner",
            "timestamp": "2018-05-08T22:04:51"
        },
        {
            "from": "djynn",
            "to": "ocdb",
            "amount": "0.400 SBD",
            "memo": "https://steemit.com/drawing/@djynn/ballpoint-pen-fan-art-yuno",
            "timestamp": "2018-05-09T02:29:36"
        },
        {
            "from": "yasu24",
            "to": "ocdb",
            "amount": "0.400 SBD",
            "memo": "https://steemit.com/steemit/@yasu24/ned-on-bloomberg-ned-bloomberg",
            "timestamp": "2018-05-09T10:13:42"
        },
        {
            "from": "yasu24",
            "to": "ocdb",
            "amount": "0.400 SBD",
            "memo": "https://steemit.com/japanese/@yasu24/i-got-goose-bumps-by-reading-maenao-s-first-article-maenao",
            "timestamp": "2018-05-09T15:29:30"
        },
        {
            "from": "djynn",
            "to": "ocdb",
            "amount": "0.400 SBD",
            "memo": "https://steemit.com/art/@djynn/entry-for-minimalist-drawing-contest-3d-kitty-3d",
            "timestamp": "2018-05-09T16:10:48"
        },
        {
            "from": "erodedthoughts",
            "to": "ocdb",
            "amount": "0.500 SBD",
            "memo": "https://steemit.com/toys/@saywha/sga7e67f",
            "timestamp": "2018-05-09T17:06:36"
        },
        {
            "from": "yasu24",
            "to": "ocdb",
            "amount": "0.400 SBD",
            "memo": "https://steemit.com/japanese/@yasu24/ned-came-to-japan-may-8th-steemit-tokyo-meet-up-5-8-steemit-tokyo-meetup",
            "timestamp": "2018-05-10T13:17:30"
        },
        {
            "from": "djynn",
            "to": "ocdb",
            "amount": "0.400 SBD",
            "memo": "https://steemit.com/art/@djynn/pattern-art-whale",
            "timestamp": "2018-05-11T00:16:48"
        },
        {
            "from": "gniksivart",
            "to": "ocdb",
            "amount": "0.500 SBD",
            "memo": "https://steemit.com/crypto/@gniksivart/using-cointracking-info-for-tracking-binance-trades",
            "timestamp": "2018-05-11T21:27:54"
        },
        {
            "from": "yasu24",
            "to": "ocdb",
            "amount": "0.400 SBD",
            "memo": "https://steemit.com/japanese/@yasu24/mnsk0619-ippon-grand-prix-was-introduced-at-steemit-tokyo-meetup-ippon-steemit-tokyo-meetup",
            "timestamp": "2018-05-11T22:11:12"
        },
        {
            "from": "saywha",
            "to": "ocdb",
            "amount": "0.350 SBD",
            "memo": "https://steemit.com/comics/@saywha/toy-hunting-aka-this-is-what-insanity-looks-like",
            "timestamp": "2018-05-12T03:51:51"
        },
        {
            "from": "yasu24",
            "to": "ocdb",
            "amount": "0.400 SBD",
            "memo": "https://steemit.com/japanese/@yasu24/i-was-able-to-post-articles-to-steemit-for-236-consecutive-day-236-steemit",
            "timestamp": "2018-05-12T15:28:39"
        },
        {
            "from": "djynn",
            "to": "ocdb",
            "amount": "0.400 SBD",
            "memo": "https://steemit.com/art/@djynn/pencil-drawing-goldfish",
            "timestamp": "2018-05-13T02:10:57"
        },
        {
            "from": "yasu24",
            "to": "ocdb",
            "amount": "0.400 SBD",
            "memo": "https://steemit.com/japanese/@yasu24/if-i-had-not-received-a-comment-on-that-day-i-might-not-have-continued-steemit-steemit",
            "timestamp": "2018-05-13T13:46:36"
        },
        {
            "from": "yasu24",
            "to": "ocdb",
            "amount": "0.400 SBD",
            "memo": "https://steemit.com/japanese/@yasu24/planning-a-300-letters-contest-300",
            "timestamp": "2018-05-14T13:46:09"
        },
        {
            "from": "djynn",
            "to": "ocdb",
            "amount": "0.400 SBD",
            "memo": "https://steemit.com/drawing/@djynn/ballpoint-pen-fan-art-gray-fullbuster",
            "timestamp": "2018-05-15T07:08:39"
        },
        {
            "from": "yasu24",
            "to": "ocdb",
            "amount": "0.400 SBD",
            "memo": "https://steemit.com/japanese/@yasu24/1-300-letters-contest-announcement-1-300",
            "timestamp": "2018-05-15T13:19:00"
        },
        {
            "from": "yasu24",
            "to": "ocdb",
            "amount": "0.400 SBD",
            "memo": "https://steemit.com/japanese/@yasu24/mother-s-day-gift",
            "timestamp": "2018-05-16T12:47:54"
        },
        {
            "from": "saywha",
            "to": "ocdb",
            "amount": "0.300 SBD",
            "memo": "https://steemit.com/comics/@saywha/marvel-legends-black-suit-spiderman",
            "timestamp": "2018-05-17T01:09:45"
        },
        {
            "from": "yasu24",
            "to": "ocdb",
            "amount": "0.400 SBD",
            "memo": "https://steemit.com/japanese/@yasu24/maruka-udon",
            "timestamp": "2018-05-17T13:42:39"
        }
    ]//await get_transactions();

    let users = [];

    for (let i = 0; i < transactions.length; i++)
    {

        let amount_sbd = 0;
        let amount_steem = 0;

        if (transactions[i].amount.indexOf("SBD"))
            amount_sbd = parseFloat(transactions[i].amount);
        else
            amount_steem = parseFloat(transactions[i].amount);


        let user = users.find(x => x.name === transactions[i].from);

        if (user === undefined) {
            user = {
                name: transactions[i].from,
                lifetime_sbd: amount_sbd,
                lifetime_steem: amount_steem
            };
            users.push(user);

        } else {
            let index = users.indexOf(user);

            user.lifetime_sbd = Math.floor((amount_sbd + user.lifetime_sbd)*100)/100;
            user.lifetime_steem = Math.floor((amount_steem + user.lifetime_steem)*100)/100;

            users[index] = user;

        }


    }

    console.log("Finished saving new refs")
}


module.exports = {
    get_earnings_per_user,
    get_transactions
};