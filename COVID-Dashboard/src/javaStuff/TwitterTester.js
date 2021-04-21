
class Counties{

  getNames(){
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


  getTwitterHandles(){

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


}


class FirebaseServer{
  constructor(){

    this.firebase = require("firebase/app");

    require("firebase/firestore");

    this.firebaseConfig = {
      apiKey: "AIzaSyDulDJhTOELGvn4zlBB5PFtf05y19T3yjY",
      authDomain: "fir-test-ebd4c.firebaseapp.com",
      projectId: "fir-test-ebd4c",
      storageBucket: "fir-test-ebd4c.appspot.com",
      messagingSenderId: "498339362637",
      appId: "1:498339362637:web:7d99f2f22284507a956904",
      measurementId: "G-1F87Y1K1GB"

    };

    this.firebase.initializeApp(this.firebaseConfig);
  }
  getFirestoreDB(){
    return this.firebase.firestore();
  }

}


class twitterHandle{
  constructor() {
    this.Twit = require('twit')
  }
  getTwitterHandle(){
    return new this.Twit({
      consumer_key: 'O5YZLiQex1rUA5aAr1Rj539PK',
      consumer_secret: '8AecHqvhRUCXTlJuxEGBsXKXhnGKplTFulsJasTREtgFXib4Le',
      access_token: '1375638021207363584-Dtz8NuYkO7clHnbhPigDej0k77UO4E',
      access_token_secret: 'piAGbZouPjn2CYD2H0Z4LnWXTHNMr4vp5XlH5EJUnB5sr',
      timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
      strictSSL: true,     // optional - requires SSL certificates to be valid.
    });
  }
}

class ExtractTweets{

  constructor() {
    this.twitter= new twitterHandle().getTwitterHandle();
  }

  getTweets(handle){
    return this.twitter.get('statuses/user_timeline', {screen_name: handle, count: 100});
  }

//q:'availability OR available'
}


/*

    this.twitter.get('statuses/user_timeline', {screen_name: screenName, count: 3}, (err, twitterData) => {

      twitterData.forEach((tweet)=> {

        this.db.collection(county).add(tweet);

      });});

*/



class CountyTweetsToDatabase{

  constructor() {
   this.tweetExtractor = new ExtractTweets();
   this.db = new FirebaseServer().getFirestoreDB();
   this.countyNames = new Counties().getNames();
   this.countyHandles = new Counties().getTwitterHandles();
  }

  async AvailabilityTweetsTDB(){
    var i=0
    while(i<this.countyHandles.length) {

      await this.tweetExtractor.getTweets(this.countyHandles[0]).then((twitterData)=> {

        twitterData.data.forEach((tweet) => {

          if((tweet.text.includes("Availab") || tweet.text.includes("availab")) && !tweet.text.includes("RT @")) {
            this.db.collection(this.countyNames[i] + "Availability").add(tweet);
          }

        });

      });

      i++
    }

  }

  async EligibilityTweetsTDB(){
    var i=0
    while(i<this.countyHandles.length) {

      await this.tweetExtractor.getTweets(this.countyHandles[0]).then((twitterData)=> {

        twitterData.data.forEach((tweet) => {

          if((tweet.text.includes("eligib") || tweet.text.includes("Eligib")) && !tweet.text.includes("RT @")) {
            this.db.collection(this.countyNames[i] + "Eligibility").add(tweet);
          }

        });

      });

      i++
    }
  }

}


new CountyTweetsToDatabase().EligibilityTweetsTDB();
