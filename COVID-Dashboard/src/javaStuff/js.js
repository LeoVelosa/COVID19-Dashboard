async function getTweets(firebase) {
  var firebaseConfig = {
    apiKey: "AIzaSyDulDJhTOELGvn4zlBB5PFtf05y19T3yjY",
    authDomain: "fir-test-ebd4c.firebaseapp.com",
    projectId: "fir-test-ebd4c",
    storageBucket: "fir-test-ebd4c.appspot.com",
    messagingSenderId: "498339362637",
    appId: "1:498339362637:web:7d99f2f22284507a956904",
    measurementId: "G-1F87Y1K1GB"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  const tweets=document.getElementById("test")
  var stuff = await db.collection('Twitter_Data').get().then((twitterData) => {
    twitterData.docs.forEach(doc => {
      tweets.innerHTML += '<div id="test">'+doc.data().AlachuaCounty.text +'</div>';
    })}) ;
  /*
  const tweets=document.getElementById("twitter")
  tweets.innerHTML = "1";
   */
}
