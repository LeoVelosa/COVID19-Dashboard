//All the imports this needs

const Twit = require("twit");
var firebase = require("firebase/app");

require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyD5YuObpl_gksLoKErhPIc9CjdcCuxyWiU",
  authDomain: "covid-dashboard-10efe.firebaseapp.com",
  databaseURL: "https://covid-dashboard-10efe-default-rtdb.firebaseio.com",
  projectId: "covid-dashboard-10efe",
  storageBucket: "covid-dashboard-10efe.appspot.com",
  messagingSenderId: "933584669394",
  appId: "1:933584669394:web:b211b0c35649af42b1fb0b",
  measurementId: "G-XVWT1E6R8B"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// allows us to use our twitter api
var twit = new Twit({
  consumer_key: 'O5YZLiQex1rUA5aAr1Rj539PK',
  consumer_secret: '8AecHqvhRUCXTlJuxEGBsXKXhnGKplTFulsJasTREtgFXib4Le',
  access_token: '1375638021207363584-Dtz8NuYkO7clHnbhPigDej0k77UO4E',
  access_token_secret: 'piAGbZouPjn2CYD2H0Z4LnWXTHNMr4vp5XlH5EJUnB5sr',
  strictSSL: true,     // optional - requires SSL certificates to be valid.
});


//gets 100 tweets from the twitter handle that was passed into this function and returns this promise
function getTweets(handle){
  return twit.get('statuses/user_timeline', {screen_name: handle, count: 100});
}



//Adds Florida County tweets that have the word avalib in it and puts them into Firebase Firestore
async function AvailabilityTweetsTDB(){

  //Array of Florida County Twitter Handles
  var countyHandles=getCountyTwitterHandles();
  //Array of Florida County Twitter names
  var countyNames=getCountyNames();

  var i=0
  //Gets every string in the Array of Florida County Twitter Handles
  while(i<countyHandles.length) {

    //gets 100 tweets from the Florida County Twitter Handles
    await getTweets(countyHandles[i]).then((twitterData)=> {

      //For each piece of data in twitterData
      twitterData.data.forEach((tweet) => {

        //adds tweets to firestore if it's text contains the word availab
        if((tweet.text.includes("Availab") || tweet.text.includes("availab")) && !tweet.text.includes("RT @") && (tweet.entities.urls[0] != undefined || tweet.entities.media != undefined)) {
          db.collection(countyNames[i] + "Availability").doc(tweet.id.toString()).set(tweet);
        }

      });

    });

    i++
  }

}

//Adds Florida County tweets that have the word eligib in it and puts them into Firebase Firestore
async function EligibilityTweetsTDB(){

  //Array of Florida County Twitter Handles
  var countyHandles=getCountyTwitterHandles();
  //Array of Florida County Twitter names
  var countyNames=getCountyNames();

  var i=0
  //Gets every string in the Array of Florida County Twitter Handles
  while(i<countyHandles.length) {

    //gets 100 tweets from the Florida County Twitter Handles
    await getTweets(countyHandles[i]).then((twitterData)=> {

      //For each piece of data in twitterData
      twitterData.data.forEach((tweet) => {

        //adds tweets to firestore if it's text contains the word eligib
        if((tweet.text.includes("eligib") || tweet.text.includes("Eligib")) && !tweet.text.includes("RT @") && (tweet.entities.urls[0] != undefined || tweet.entities.media != undefined)) {
          db.collection(countyNames[i] + "Eligibility").doc(tweet.id.toString()).set(tweet);
        }

      });

    });

    i++
  }
}

//Adds CDC, WhiteHouse, and FEMA tweets that have the word COVID in it and puts them into Firebase Firestore
async function NewsTweetsTDB(){
  //Array of CDC, WhiteHouse, and FEMA Twitter Handles
  var newsHandles=getNewsTwitterHandles();
  //Array of CDC, WhiteHouse, and FEMA Twitter names
  var newsNames=getNewsNames();

  var i=0
  //Gets every string in the Array of CDC, WhiteHouse, and FEMA Twitter Handles
  while(i<newsHandles.length) {

    //gets 100 tweets from the CDC, WhiteHouse, and FEMA Twitter Handles
    await getTweets(newsHandles[i]).then((twitterData)=> {

      //For each piece of data in twitterData
      twitterData.data.forEach((tweet) => {

        //adds tweets to firestore if it's text contains the word COVID.
//        if((tweet.text.includes("news") || tweet.text.includes("News") || tweet.text.includes("NEWS")) && (tweet.text.includes("covid") || tweet.text.includes("COVID") || tweet.text.includes("Covid")) && !tweet.text.includes("RT @") && (tweet.entities.urls[0] != undefined || tweet.entities.media != undefined)) {
        if((tweet.text.includes("covid") || tweet.text.includes("COVID") || tweet.text.includes("Covid")) && !tweet.text.includes("RT @") && (tweet.entities.urls[0] != undefined || tweet.entities.media != undefined)) {
          db.collection(newsNames[i] + "News").doc(tweet.id.toString()).set(tweet);
        }

      });

    });

    i++
  }
}


//List of florida counties of which we can get twitter handles from
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

//List of florida county twitter handles
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

//Names of CDC, FEMA, WhiteHouse
function getNewsNames(){
  return [
    "FEMA",
    "TheWhiteHouse",
    "CDC"
  ];

}

//List of CDC, FEMA, WhiteHouse twitter handles
function getNewsTwitterHandles(){

  return [
    "fema",
    "WhiteHouse",
    "CDCgov"
  ];

}

AvailabilityTweetsTDB();
EligibilityTweetsTDB();
NewsTweetsTDB();
