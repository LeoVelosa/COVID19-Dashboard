function getNames(){
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

async function getAllTweets(firebase){
  //Contains our firebase keys and such to access firebase
  var firebaseConfig = {
    apiKey: "AIzaSyDulDJhTOELGvn4zlBB5PFtf05y19T3yjY",
    authDomain: "fir-test-ebd4c.firebaseapp.com",
    projectId: "fir-test-ebd4c",
    storageBucket: "fir-test-ebd4c.appspot.com",
    messagingSenderId: "498339362637",
    appId: "1:498339362637:web:7d99f2f22284507a956904",
    measurementId: "G-1F87Y1K1GB"
  };

  //Initalizes app
  firebase.initializeApp(firebaseConfig);

  //Firebase acesses firestore
  const db = firebase.firestore();

  await getTweetss(db);
  await getTweets(db);
}

//This is the way to get the JSON files and make them into html and sends them to card-component.ts
async function getTweetss(db) {

  //Basically creates a storage for all the html. IT NEEDS TO BE THIS WAY OTHERWISE PAGE WILL REFRESH AND THINGS WILL MESS UP
  const tweeters=document.getElementById("test2")


//  getNames().forEach()((collect)=>{
  var names = getNames();

  console.log(names);

  for(var i=0; i<names.length; i++){
    db.collection(names[i]+'Availability').get().then((twitterData) => {

      // Styles the html, cannot use card-component.css to do this, so it must be done here
      tweeters.innerHTML += '<style> ' +
        'div.tweet{ width: 300px; border: 3px solid grey; text-align: left;  padding-left: 15px; padding-top: 10px; border-radius: 5px; height: 100%;}' +
        'img.profile {border: 1px solid black; border-radius: 50%;}' +
        'p.text, div.text {color:black;}' +
        '</style>'

      //For every Json file in the collection
      twitterData.docs.forEach(doc => {
        var link;

        if(doc.data().entities.urls[doc.data().entities.urls.length-1].expanded_url != undefined){link=doc.data().entities.urls[doc.data().entities.urls.length-1].expanded_url}
        else if(doc.data().entities.media[doc.data().entities.media.length-1].expanded_url != undefined){link=doc.data().entities.media[doc.data().entities.media.length-1].expanded_url}


        //Gets data from the JSON to make a hyperlink for the box (a) and makes a box (div)
        tweeters.innerHTML += '<a href="' + link + '"><div class="tweet">' +
          //Adds profile pic, twitter name and handle
          '<p class="text">' + '<img src=' + doc.data().user.profile_image_url_https + ' class="profile">  ' + doc.data().user.name + '  @' + doc.data().user.screen_name + ' </p>' +

          //Adds text from tweet
          '<div class="text">' + doc.data().text + '</div>' +

          '</div></a>';




      })}) ;
  }

}


//This is the way to get the JSON files and make them into html and sends them to card-component.ts
async function getTweets(db) {

  //Basically creates a storage for all the html. IT NEEDS TO BE THIS WAY OTHERWISE PAGE WILL REFRESH AND THINGS WILL MESS UP
  const tweets=document.getElementById("test")


//  getNames().forEach()((collect)=>{
  var names = getNames();

  console.log(names);

for(var i=0; i<names.length; i++){
  db.collection(names[i]+'Eligibility').get().then((twitterData) => {

    // Styles the html, cannot use card-component.css to do this, so it must be done here
    tweets.innerHTML += '<style> ' +
      'div.tweet{ width: 300px; border: 3px solid grey; text-align: left;  padding-left: 15px; padding-top: 10px; border-radius: 5px; height: 100%;}' +
      'img.profile {border: 1px solid black; border-radius: 50%;}' +
      'p.text, div.text {color:black;}' +
      '</style>'

    //For every Json file in the collection
    twitterData.docs.forEach(doc => {
      var link;
      var skip=false;
      if(doc.data().entities.urls[doc.data().entities.urls.length-1].expanded_url != undefined){link=doc.data().entities.urls[doc.data().entities.urls.length-1].expanded_url}
      else if(doc.data().entities.media[doc.data().entities.media.length-1].expanded_url != undefined){link=doc.data().entities.media[doc.data().entities.media.length-1].expanded_url}


      //Gets data from the JSON to make a hyperlink for the box (a) and makes a box (div)
      tweets.innerHTML += '<a href="' + link + '"><div class="tweet">' +
        //Adds profile pic, twitter name and handle
        '<p class="text">' + '<img src=' + doc.data().user.profile_image_url_https + ' class="profile">  ' + doc.data().user.name + '  @' + doc.data().user.screen_name + ' </p>' +

        //Adds text from tweet
        '<div class="text">' + doc.data().text + '</div>' +

        '</div></a>';




    })}) ;
}

}

