const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Twit = require("twit");
admin.initializeApp();
const db = admin.firestore();


var twit = new Twit({
  consumer_key: 'O5YZLiQex1rUA5aAr1Rj539PK',
  consumer_secret: '8AecHqvhRUCXTlJuxEGBsXKXhnGKplTFulsJasTREtgFXib4Le',
  access_token: '1375638021207363584-Dtz8NuYkO7clHnbhPigDej0k77UO4E',
  access_token_secret: 'piAGbZouPjn2CYD2H0Z4LnWXTHNMr4vp5XlH5EJUnB5sr',
  strictSSL: true,     // optional - requires SSL certificates to be valid.
});



function getTweets(handle){
  return twit.get('statuses/user_timeline', {screen_name: handle, count: 100});
}




async function AvailabilityTweetsTDB(){
  var countyHandles=getCountyTwitterHandles();
  var countyNames=getCountyNames();
  var i=0
  while(i<countyHandles.length) {

    await getTweets(countyHandles[i]).then((twitterData)=> {

      twitterData.data.forEach((tweet) => {

        if((tweet.text.includes("Availab") || tweet.text.includes("availab")) && !tweet.text.includes("RT @") && (tweet.entities.urls[0] != undefined || tweet.entities.media != undefined)) {

          db.collection(countyNames[i] + "Availability").doc(tweet.id.toString()).set(tweet);
        }

      });

    });

    i++
  }

}

async function EligibilityTweetsTDB(){
  var countyHandles=getCountyTwitterHandles();
  var countyNames=getCountyNames();

  var i=0
  while(i<countyHandles.length) {

    await getTweets(countyHandles[i]).then((twitterData)=> {

      twitterData.data.forEach((tweet) => {

        if((tweet.text.includes("eligib") || tweet.text.includes("Eligib")) && !tweet.text.includes("RT @") && (tweet.entities.urls[0] != undefined || tweet.entities.media != undefined)) {
          db.collection(countyNames[i] + "Eligibility").doc(tweet.id.toString()).set(tweet);
        }

      });

    });

    i++
  }
}

async function NewsTweetsTDB(){
  var newsHandles=getNewsTwitterHandles();
  var newsNames=getNewsNames();

  var i=0
  while(i<newsHandles.length) {

    await getTweets(newsHandles[i]).then((twitterData)=> {

      twitterData.data.forEach((tweet) => {

//        if((tweet.text.includes("news") || tweet.text.includes("News") || tweet.text.includes("NEWS")) && (tweet.text.includes("covid") || tweet.text.includes("COVID") || tweet.text.includes("Covid")) && !tweet.text.includes("RT @") && (tweet.entities.urls[0] != undefined || tweet.entities.media != undefined)) {
        if((tweet.text.includes("covid") || tweet.text.includes("COVID") || tweet.text.includes("Covid")) && !tweet.text.includes("RT @") && (tweet.entities.urls[0] != undefined || tweet.entities.media != undefined)) {
          db.collection(newsNames[i] + "News").doc(tweet.id.toString()).set(tweet);
        }

      });

    });

    i++
  }
}

function getCountyNames(){
  return [
    "AlachuaCounty",
    "BayCounty",
    "BrevardCounty",
    "BrowardCounty",
    "CharlotteCounty",
    "CitrusCounty",
    "ClayCounty",
    "CollierCounty",
    "DeSotoCounty",
    "DuvalCounty",
    "EscambiaCounty",
    "FlaglerCounty",
    "HernandoCounty",
    "HighlandsCounty",
    "HillsboroughCounty",
    "IndianRiverCounty",
    "JacksonCounty",
    "LakeCounty",
    "LeeCounty",
    "LeonCounty",
    "LevyCounty",
    "ManateeCounty",
    "MarionCounty",
    "MartinCounty",
    "Miami-DadeCounty",
    "MonroeCounty",
    "NassauCounty",
    "OkaloosaCounty",
    "OrangeCounty",
    "OsceolaCounty",
    "PalmBeachCounty",
    "PascoCounty",
    "PinellasCounty",
    "PolkCounty",
    "PutnamCounty",
    "SantaRosaCounty",
    "SarasotaCounty",
    "SeminoleCounty",
    "St.JohnsCounty",
    "St.LucieCounty",
    "VolusiaCounty"

  ];

}


function getCountyTwitterHandles(){

  return [
    "AlachuaCounty",
    "BOCCPIO",
    "BrevardEOC",
    "FLHealthBroward",
    "CCOEM",
    "FLHealthCitrus",
    "ClayCounty_EM",
    "HealthyCollier",
    "DeSotoCountyEM",
    "FLHealthDuval",
    "HealthyEscambia",
    "FlaglerEOC",
    "HealthyHernando",
    "HighlandsFLBCC",
    "DOHHillsborough",
    "IRCGOV",
    "JCFloridanNews",
    "FLHealthLake",
    "flhealthlee",
    "healthyleonfl",
    "LevyCountyEM",
    "HealthyManatee",
    "FLHealthMarion",
    "GoHealthyMartin",
    "MiamiDadeCovid",
    "monroecounty",
    "NassauEM",
    "OkaloosaCounty",
    "DohOrange",
    "OsceolaCountyFl",
    "pbcgov",
    "HealthyPasco",
    "HealthyPinellas",
    "PolkCountyFL",
    "PutnamCountyEM",
    "SRC_EM",
    "SRQCountyGov",
    "seminolecounty",
    "StJohnsCounty",
    "FDOHStLucie",
    "CountyOfVolusia"
  ];

}

function getNewsNames(){
  return [
    "FEMA",
    "TheWhiteHouse",
    "CDC"
  ];

}


function getNewsTwitterHandles(){

  return [
    "fema",
    "WhiteHouse",
    "CDCgov"
  ];

}

//exports.scheduledFunction = functions.pubsub.schedule('0 0 * * *').onRun((context) => {
exports.AvailabilityTweets = functions.runWith({timeoutSeconds: 539,   memory: '512MB'}).pubsub.schedule('10 * * * *').onRun( async(context) => {
  await AvailabilityTweetsTDB();
});

exports.EligibilityTweets = functions.runWith({timeoutSeconds: 539,   memory: '512MB'}).pubsub.schedule('10 * * * *').onRun( async(context) => {
  await EligibilityTweetsTDB();
});
exports.NewsTweets = functions.runWith({timeoutSeconds: 539,   memory: '512MB'}).pubsub.schedule('10 * * * *').onRun( async(context) => {
  await NewsTweetsTDB();
});
