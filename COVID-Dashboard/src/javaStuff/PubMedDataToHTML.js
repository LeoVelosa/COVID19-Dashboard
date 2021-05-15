function getDatabase(firebase) {
  if(firebase.apps.length==0){
    //console.log(firebase.app.length);
    var firebaseConfig = {
      apiKey: "AIzaSyD5YuObpl_gksLoKErhPIc9CjdcCuxyWiU",
      authDomain: "covid-dashboard-10efe.firebaseapp.com",
      projectId: "covid-dashboard-10efe",
      storageBucket: "covid-dashboard-10efe.appspot.com",
      messagingSenderId: "933584669394",
      appId: "1:933584669394:web:b211b0c35649af42b1fb0b",
      measurementId: "G-XVWT1E6R8B"
    };
    firebase.initializeApp(firebaseConfig);
  }
    var db = firebase.firestore();
}
async function getSearches(firebase, id, name, addToName, reset) {

  if(reset){document.getElementById(id).innerHTML='';}

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
        'div.tweet{ width: 100%; border: 3px solid grey; text-align: left; padding-left: 15px; padding-top: 10px; border-radius: 10px; height: 100%;}' +
        'img.profile {border: 1px solid black; border-radius: 50%;   float: left;}' +
        'p.text, div.text {text-size-adjust: auto; color:black;}' +
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
            '<img src=' + doc.data().user.profile_image_url_https + ' class="profile" width="14.4%"; height="24%";> <br> <p class="text"> &nbsp;&nbsp;' + doc.data().user.name + ' &nbsp;@' + doc.data().user.screen_name + ' </p>' +

            //Adds text from tweet
            '<br> <div class="text">' + doc.data().text + '</div> <br> <div class="text">Source:' +
            '<a href="' + link + '" style="word-wrap: break-word;" target="_blank">'+ link
            + '</a></div></div>';
        }


      })}) ;
  }
  if(document.getElementById(id).innerHTML== '<style> ' +
    'div.tweet{ width: 100%; border: 3px solid grey; text-align: left; padding-left: 15px; padding-top: 10px; border-radius: 10px; height: 100%;}' +
    'img.profile {border: 1px solid black; border-radius: 50%;   float: left;}' +
    'p.text, div.text {text-size-adjust: auto; color:black;}' +
    '</style>'){
    document.getElementById(id).innerHTML ='<div style="border-radius: 10px; font-size:2.75vmin;   line-height: 140%; display: flex;  justify-content: center; align-items: center; text-align: center; border: 3px solid grey ;">There Are No Tweets Available For This County</div>';
  }

}
