
//This is the function you will be calling in card-component.ts, so it puts the data into the id's of
//vaccine-page that have the same id in the <div id=''> in vaccine-page.component.html
function getDatabase(firebase){
  //Contains our firebase keys and such to access firebase
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

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  else {
    firebase.app(); // if already initialized, use that one
  }

  //Firebase acesses firestore
  return firebase.firestore();
}


async function getTweets(firebase, id, name, addToName) {

  var db = getDatabase(firebase);
  //Basically creates a storage for all the html. IT NEEDS TO BE THIS WAY OTHERWISE PAGE WILL REFRESH AND THINGS WILL MESS UP
  if(document.getElementById(id) != null){
  const tweeters=document.getElementById(id)



  //This is what I am using to get the stuff from our database. Its getting a collection and then getting each document in the
  //collection and processing the data into html.
  //Adds avalibility to the end of the county names, to make sure that the eligibility and avalibility tweets do not get mixed up
  await db.collection(name + addToName).get().then((twitterData) => {

    // Styles the html, cannot use card-component.css to do this, so it must be done here
    tweeters.innerHTML += '<style> ' +
      'div.tweet{ width: 300px; border: 3px solid grey; text-align: left;  padding-left: 15px; padding-top: 10px; border-radius: 5px; height: 100%;}' +
      'img.profile {border: 1px solid black; border-radius: 50%;}' +
      'p.text, div.text {color:black;}' +
      '</style>'

    //For every Json file in the collection
    twitterData.docs.forEach(doc => {

      // This is used to either put an html link in a tweet, or skip this data/won't turn this JSON into a tweet
      var link;

      //Makes sure that there is a place that is called urls in the JSON
      if(doc.data().entities.urls != undefined){

        //Checks to see if any of this data contains a twitter link
        doc.data().entities.urls.forEach((url) =>{

            if(url.expanded_url.includes('twitter')){link=url.expanded_url}

          }
        )

      }

      //Makes sure that there is a place that is called urls in the JSON
      if(doc.data().entities.media  != undefined){
        //Checks to see if any of this data contains a twitter link
        doc.data().entities.media.forEach((media) =>{

            if(media.expanded_url.includes('twitter')){link=media.expanded_url}

          }
        )
      }


      //If there is no link, it turn the data into html code, as if this code doesn't have a
      //link, it causes an error, and won't display the rest of the tweets
      if(link != undefined){
        //Gets data from the JSON to make a hyperlink for the box (a) and makes a box (div)
        tweeters.innerHTML += '<a href="' + link + '"><div class="tweet">' +
          //Adds profile pic, twitter name and handle
          '<p class="text">' + '<img src=' + doc.data().user.profile_image_url_https + ' class="profile">  ' + doc.data().user.name + '  @' + doc.data().user.screen_name + ' </p>' +

          //Adds text from tweet
          '<div class="text">' + doc.data().text + '</div>' +

          '</div></a>';
      }


    })}) ;
  }
}

async function getNumOfTweets(firebase, id, name, addToName) {

  var db = getDatabase(firebase);
  //Basically creates a storage for all the html. IT NEEDS TO BE THIS WAY OTHERWISE PAGE WILL REFRESH AND THINGS WILL MESS UP
  var num=0



  //This is what I am using to get the stuff from our database. Its getting a collection and then getting each document in the
  //collection and processing the data into html.
  //Adds avalibility to the end of the county names, to make sure that the eligibility and avalibility tweets do not get mixed up
  await db.collection(name + addToName).get().then((twitterData) => {

    //For every Json file in the collection
    twitterData.docs.forEach(doc => {

      // This is used to either put an html link in a tweet, or skip this data/won't turn this JSON into a tweet
      var link;

      //Makes sure that there is a place that is called urls in the JSON
      if(doc.data().entities.urls != undefined){

        //Checks to see if any of this data contains a twitter link
        doc.data().entities.urls.forEach((url) =>{

            if(url.expanded_url.includes('twitter')){link=url.expanded_url}

          }
        )

      }

      //Makes sure that there is a place that is called urls in the JSON
      if(doc.data().entities.media  != undefined){
        //Checks to see if any of this data contains a twitter link
        doc.data().entities.media.forEach((media) =>{

            if(media.expanded_url.includes('twitter')){link=media.expanded_url}

          }
        )
      }


      //If there is no link, it turn the data into html code, as if this code doesn't have a
      //link, it causes an error, and won't display the rest of the tweets
      if(link != undefined){
        num+=1;
      }


    })}) ;

  if(num==0 ){
    num='No Tweets Avaliable'
  }

  return num;
}

//List of florida counties of which we can get twitter handles from
function getCountyTweets(firebase, id, addToName){
  return [
    {name: "AlachuaCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"BayCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"BrevardCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"BrowardCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"CharlotteCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"CitrusCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"ClayCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"CollierCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"DeSotoCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"DuvalCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"EscambiaCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"FlaglerCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"HernandoCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"HighlandsCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"HillsboroughCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"IndianRiverCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"JacksonCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"LakeCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"LeeCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"LeonCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"LevyCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"ManateeCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"MarionCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"MartinCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"Miami-DadeCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"MonroeCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"NassauCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"OkaloosaCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"OrangeCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"OsceolaCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"PalmBeachCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"PascoCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"PinellasCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"PolkCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"PutnamCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"SantaRosaCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"SarasotaCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"SeminoleCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"St.JohnsCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"St.LucieCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)},
    {name:"VolusiaCounty", tweets:getTweets(firebase, id, name, addToName), num: getNumOfTweets(firebase, id, name, addToName)}

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
