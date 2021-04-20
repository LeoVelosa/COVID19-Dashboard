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
    tweets.innerHTML += '<style> ' +
      'div.tweet{ width: 300px; border: 3px solid grey; text-align: left;  padding-left: 15px; padding-top: 10px; border-radius: 5px; height: 100%;}' +
      'img.profile {border: 1px solid black; border-radius: 50%;}' +
      'p.text, div.text {color:black;}' +
      '</style>'
    twitterData.docs.forEach(doc => {
      tweets.innerHTML += '<a href="https://www.w3schools.com/html/html_css.asp"><div class="tweet">' +
        '<p class="text">' + '<img src='+doc.data().AlachuaCounty.user.profile_image_url_https+' class="profile">  ' +doc.data().AlachuaCounty.user.name+'  @'+doc.data().AlachuaCounty.user.screen_name+' </p>' +
        '<div class="text">'+doc.data().AlachuaCounty.text +'</div>' +
        '</div></a>';
    })}) ;
  /*
  const tweets=document.getElementById("twitter")
  tweets.innerHTML = "1";
   */
}
