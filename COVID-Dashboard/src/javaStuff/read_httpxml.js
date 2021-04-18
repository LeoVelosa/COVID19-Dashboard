var Twit = require('twit')

var T = new Twit({
  consumer_key:         'O5YZLiQex1rUA5aAr1Rj539PK',
  consumer_secret:      '8AecHqvhRUCXTlJuxEGBsXKXhnGKplTFulsJasTREtgFXib4Le',
  access_token:         '1375638021207363584-Dtz8NuYkO7clHnbhPigDej0k77UO4E',
  access_token_secret:  'piAGbZouPjn2CYD2H0Z4LnWXTHNMr4vp5XlH5EJUnB5sr',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})


T.get('statuses/user_timeline', {screen_name: 'fema', count: 1}, (err, tweet) => {
  var firebase = require("firebase/app");
  require("firebase/firestore");

  var firebaseConfig = {
    apiKey: "AIzaSyDulDJhTOELGvn4zlBB5PFtf05y19T3yjY",
    authDomain: "fir-test-ebd4c.firebaseapp.com",
    projectId: "fir-test-ebd4c",
    storageBucket: "fir-test-ebd4c.appspot.com",
    messagingSenderId: "498339362637",
    appId: "1:498339362637:web:7d99f2f22284507a956904",
    measurementId: "G-1F87Y1K1GB"
  };
// Intialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  db.collection('form_data').add({twitter:"please"});
  db.collection('form_data').add({twitter:tweet});
  console.log(tweet[0].text)
    });
// return allData
