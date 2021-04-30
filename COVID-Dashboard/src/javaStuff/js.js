
//This is the function you will be calling in card-component.ts, so it puts the data into the id's of
//vaccine-page that have the same id in the <div id=''> in vaccine-page.component.html
async function getAllTweets(firebase){
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
  const db = firebase.firestore();
  //gets all tweets that have to do with the avalibility of the COVID vaccine in the counties of florida twitters we have
  await getAvailabilityTweets(db);
  //gets all tweets that have to do with the eligibility of the COVID vaccine in the counties of florida twitters we have
  await getEligibilityTweets(db);
  //gets all tweets that have to do with the news stories about COVID in the twitters accounts we have for that
  await getNewsTweets(db);
}

//This is the way to get the JSON files and make them into html and sends them to card-component.ts
async function getAvailabilityTweets(db) {

  //Basically creates a storage for all the html. IT NEEDS TO BE THIS WAY OTHERWISE PAGE WILL REFRESH AND THINGS WILL MESS UP
  const tweeters=document.getElementById("test")


//  getCountyNames().forEach()((collect)=>{
  var names = getCountyNames();

 // for every county name that we have
  for(var i=0; i<names.length; i++){

    //This is what I am using to get the stuff from our database. Its getting a collection and then getting each document in the
    //collection and processing the data into html.
    //Adds avalibility to the end of the county names, to make sure that the eligibility and avalibility tweets do not get mixed up
    db.collection(names[i]+'Availability').get().then((twitterData) => {

      // Styles the html, cannot use card-component.css to do this, so it must be done here
      tweeters.innerHTML += '<style> ' +
        'div.tweet{border: 3px solid grey; text-align: left;  padding-left: 15px; padding-right: 15px; padding-bottom: 15px; padding-top: 10px; border-radius: 5px; height: 100%;}' +
        'img.profile {border: 1px solid black; border-radius: 50%;}' +
        'p.text, div.text {color:black; font-size: 13px;}' +
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
          tweeters.innerHTML += '<div class="tweet">' +
            //Adds profile pic, twitter name and handle
            '<p class="text">' + '<img src=' + doc.data().user.profile_image_url_https + ' class="profile">  ' + doc.data().user.name + '  @' + doc.data().user.screen_name + ' </p>' +

            //Adds text from tweet
            '<div class="text">' + doc.data().text + '</div><div class="text">Source:' +

            '<a href="' + link + '" style="word-wrap: break-word;">'+ link
            + '</a></div></div>';
        }


      })}) ;
  }

}


//This is the way to get the JSON files and make them into html and sends them to card-component.ts
async function getEligibilityTweets(db) {

  //Basically creates a storage for all the html. IT NEEDS TO BE THIS WAY OTHERWISE PAGE WILL REFRESH AND THINGS WILL MESS UP
  const tweets=document.getElementById("test2")


//  getCountyNames().forEach()((collect)=>{
  var names = getCountyNames();

  // for every county name that we have
  for(var i=0; i<names.length; i++){

  //This is what I am using to get the stuff from our database. Its getting a collection and then getting each document in the
  //collection and processing the data into html.
  //Adds avalibility to the end of the county names, to make sure that the eligibility and avalibility tweets do not get mixed up
  db.collection(names[i]+'Eligibility').get().then((twitterData) => {

    // Styles the html, cannot use card-component.css to do this, so it must be done here
    tweets.innerHTML += '<style> ' +
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
      if(link != undefined) {

        //Gets data from the JSON to make a hyperlink for the box (a) and makes a box (div)
        tweets.innerHTML += '<div class="tweet">' +
          //Adds profile pic, twitter name and handle
          '<p class="text">' + '<img src=' + doc.data().user.profile_image_url_https + ' class="profile">  ' + doc.data().user.name + '  @' + doc.data().user.screen_name + ' </p>' +

          //Adds text from tweet
          '<div class="text">' + doc.data().text + '</div><div class="text">Source:' +

          '<a href="' + link + '" style="word-wrap: break-word;">'+ link
          + '</a></div></div>';
      }



    })}) ;
}

}


//This is the way to get the JSON files and make them into html and sends them to card-component.ts
async function getNewsTweets(db) {

  //Basically creates a storage for all the html. IT NEEDS TO BE THIS WAY OTHERWISE PAGE WILL REFRESH AND THINGS WILL MESS UP
  const tweets=document.getElementById("test3")


//  getCountyNames().forEach()((collect)=>{
  var names = getNewsNames();

  // for every county name that we have
  for(var i=0; i<names.length; i++){

    //This is what I am using to get the stuff from our database. Its getting a collection and then getting each document in the
    //collection and processing the data into html.
    //Adds avalibility to the end of the county names, to make sure that the eligibility and avalibility tweets do not get mixed up
    db.collection(names[i]+'News').get().then((twitterData) => {

      // Styles the html, cannot use card-component.css to do this, so it must be done here
      tweets.innerHTML += '<style> ' +
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
        if(link != undefined) {

          //Gets data from the JSON to make a hyperlink for the box (a) and makes a box (div)
          tweets.innerHTML += '<div class="tweet">' +
            //Adds profile pic, twitter name and handle
            '<p class="text">' + '<img src=' + doc.data().user.profile_image_url_https + ' class="profile">  ' + doc.data().user.name + '  @' + doc.data().user.screen_name + ' </p>' +

            //Adds text from tweet
            '<div class="text">' + doc.data().text + '</div><div class="text">Source:' +

            '<a href="' + link + '" style="word-wrap: break-word;">'+ link
            + '</a></div></div>';
        }



      })}) ;
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










