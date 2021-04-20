//This is the way to get the JSON files and make them into html and sends them to card-component.ts
async function getTweets(firebase) {
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
  //Basically creates a storage for all the html. IT NEEDS TO BE THIS WAY OTHERWISE PAGE WILL REFRESH AND THINGS WILL MESS UP
  const tweets=document.getElementById("test")
  // Draws data from database and gets a collection of JSON files from it
  var stuff = await db.collection('Twitter_Data').get().then((twitterData) => {
    // Styles the html, cannot use card-component.css to do this, so it must be done here
    tweets.innerHTML += '<style> ' +
      'div.tweet{ width: 300px; border: 3px solid grey; text-align: left;  padding-left: 15px; padding-top: 10px; border-radius: 5px; height: 100%;}' +
      'img.profile {border: 1px solid black; border-radius: 50%;}' +
      'p.text, div.text {color:black;}' +
      '</style>'
    //For every Json file in the collection
    twitterData.docs.forEach(doc => {
      //Gets data from the JSON to make a hyperlink for the box (a) and makes a box (div)
      tweets.innerHTML += '<a href="https://twitter.com/home"><div class="tweet">' +
        //Adds profile pic, twitter name and handle
        '<p class="text">' + '<img src='+doc.data().AlachuaCounty.user.profile_image_url_https+' class="profile">  ' +doc.data().AlachuaCounty.user.name+'  @'+doc.data().AlachuaCounty.user.screen_name+' </p>' +
        //Adds text from tweet
        '<div class="text">'+doc.data().AlachuaCounty.text +'</div>' +
        '</div></a>';
    })}) ;
  /*
  const tweets=document.getElementById("twitter")
  tweets.innerHTML = "1";
   */
}
