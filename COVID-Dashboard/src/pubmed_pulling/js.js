// includes a list of functions for getting different parts of pubmed searches
// params: search results, a json object containing the name, author and url
// param: i the index of search results
class getPartsOfPubMedSearches {
  getTitle(search_results, i) {
    return (search_results[i].Item[5]._);
  }
  getFirstAuthor(search_results, i) {
    return (search_results[i].Item[4]._);
  }
  getDOI(search_results, i) {
    return search_results[i].Item[23]._;
  }
}
function getNewsNames(){
  return [
    "TheWhiteHouse",
    "CDC",
    "FEMA"
  ];

}
// returns the document ids
function PubMedSearchDocIDs(db){
  return [
    "lLyiMcd6bSvIkKvuldmi"
  ];

}

async function getAllTweets(firebase){
  //Contains our firebase keys and such to access firebase
  firebaseConfig = {
    apiKey: "AIzaSyD5YuObpl_gksLoKErhPIc9CjdcCuxyWiU",
    authDomain: "covid-dashboard-10efe.firebaseapp.com",
    databaseURL: "https://covid-dashboard-10efe-default-rtdb.firebaseio.com",
    projectId: "covid-dashboard-10efe",
    storageBucket: "covid-dashboard-10efe.appspot.com",
    messagingSenderId: "933584669394",
    appId: "1:933584669394:web:b211b0c35649af42b1fb0b",
    measurementId: "G-XVWT1E6R8B"
  };

  //Initalizes app
  firebase.initializeApp(firebaseConfig);

  //Firebase acesses firestore
  const db = firebase.firestore();

  await getPubMedSearches(db);
}

//This is the way to get the JSON files and make them into html and sends them to card-component.ts
async function getPubMedSearches(db) {
  //Basically creates a storage for all the html. IT NEEDS TO BE THIS WAY OTHERWISE PAGE WILL REFRESH AND THINGS WILL MESS UP
  const searcher=document.getElementById("test")

//  getCountyNames().forEach()((collect)=>{
  var names = getPubMedSearches();
  // Gets the part of the data that corresponds to the initial docsum
  for(var i=0; i<names.length; i++){
    db.collection(names[i]).get().then((pubMedData) => {

      //For every Json file in the collection
      searcher.docs.forEach(doc => {
        // create a list for each item in the database
        var authors = []
        var titles = []
        var dois = []

        // create an object for getting the different parts of the json file
        var PubMedGetter = new getPartsOfPubMedSearches();
        var searches = doc.data().eSummaryResult.DocSum;

        // for each search result from the docsum
        /*
        for (var i = 0; i < searches.length; i++) {
          authors.add(PubMedGetter.getFirstAuthor(searches, i));
          titles.add(PubMedGetter.getTitle(searches, i));
          dois.add(PubMedGetter.getDOI(searches, i));
          */
        for (var i = 0; i < searches.length; i++) {
          searcher.innerHTML += '<a href="' + doi + '"><div class="search_result">' +
            //Adds profile pic, twitter name and handle
            '<p class="text">' + authors[i] + " " + titles[i] + dois[i] </p>';

            //Adds text from tweet
            '<div class="text">' + doc.data().text + '</div>' +

            '</div></a>';
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


        if(doc.data().entities.urls != undefined){

          doc.data().entities.urls.forEach((url) =>{

              if(url.expanded_url.includes('twitter')){link=url.expanded_url}

            }
          )

        }
        if(doc.data().entities.media  != undefined){
          doc.data().entities.media.forEach((media) =>{

              if(media.expanded_url.includes('twitter')){link=media.expanded_url}

            }
          )
        }


        /*
        if(doc.data().entities.urls[doc.data().entities.urls.length-1].expanded_url != undefined){
          link=doc.data().entities.urls[doc.data().entities.urls.length-1].expanded_url
        }
        else if(doc.data().entities.media[doc.data().entities.media.length-1].expanded_url != undefined){
          link=doc.data().entities.media[doc.data().entities.media.length-1].expanded_url
        }
  */
        if(link != undefined) {

          //Gets data from the JSON to make a hyperlink for the box (a) and makes a box (div)
          tweets.innerHTML += '<a href="' + link + '"><div class="tweet">' +
            //Adds profile pic, twitter name and handle
            '<p class="text">' + '<img src=' + doc.data().user.profile_image_url_https + ' class="profile">  ' + doc.data().user.name + '  @' + doc.data().user.screen_name + ' </p>' +

            //Adds text from tweet
            '<div class="text">' + doc.data().text + '</div>' +

            '</div></a>';
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


  for(var i=0; i<names.length; i++){
    db.collection(names[i]+'News').get().then((twitterData) => {

      // Styles the html, cannot use card-component.css to do this, so it must be done here
      tweets.innerHTML += '<style> ' +
        'div.tweet{ width: 300px; border: 3px solid grey; text-align: left;  padding-left: 15px; padding-top: 10px; border-radius: 5px; height: 100%;}' +
        'img.profile {border: 1px solid black; border-radius: 50%;}' +
        'p.text, div.text {color:black;}' +
        '</style>'

      //For every Json file in the collection
      twitterData.docs.forEach(doc => {
        var link;


        if(doc.data().entities.urls != undefined){

          doc.data().entities.urls.forEach((url) =>{

              if(url.expanded_url.includes('twitter')){link=url.expanded_url}

            }
          )

        }
        if(doc.data().entities.media  != undefined){
          doc.data().entities.media.forEach((media) =>{

              if(media.expanded_url.includes('twitter')){link=media.expanded_url}

            }
          )
        }


        /*
        if(doc.data().entities.urls[doc.data().entities.urls.length-1].expanded_url != undefined){
          link=doc.data().entities.urls[doc.data().entities.urls.length-1].expanded_url
        }
        else if(doc.data().entities.media[doc.data().entities.media.length-1].expanded_url != undefined){
          link=doc.data().entities.media[doc.data().entities.media.length-1].expanded_url
        }
  */
        if(link != undefined) {

          //Gets data from the JSON to make a hyperlink for the box (a) and makes a box (div)
          tweets.innerHTML += '<a href="' + link + '"><div class="tweet">' +
            //Adds profile pic, twitter name and handle
            '<p class="text">' + '<img src=' + doc.data().user.profile_image_url_https + ' class="profile">  ' + doc.data().user.name + '  @' + doc.data().user.screen_name + ' </p>' +

            //Adds text from tweet
            '<div class="text">' + doc.data().text + '</div>' +

            '</div></a>';
        }



      })}) ;
  }

}
