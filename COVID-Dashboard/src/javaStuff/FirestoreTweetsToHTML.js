
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


async function getTweets(firebase, id, name, addToName, reset) {

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
    //MAKE SURE THAT THIS AND THE STYLE AT AROUND LINE 100 ARE THE SAME!!!!!!
    tweeters.innerHTML += '<style> ' +
      'div.tweet{white-space: pre-line; font-size:min(1em,2vh); line-height: min(1em,2vh); width: 100%; border: 0.3em solid grey; text-align: left; padding-left: 3%; padding-top: 2%; padding-bottom: 2%; padding-right:3%; border-radius: 10px; height: 100%;}' +
      'img.profile {border: 0.1em solid black; border-radius: 50%;   float: left;}' +
      'p.break{line-height: min(1em,2vh);}' +
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
          '<img src=' + doc.data().user.profile_image_url_https + ' class="profile" width="17%" height="auto">  <p class="text">\n \n &nbsp;&nbsp;' + doc.data().user.name + ' &nbsp;@' + doc.data().user.screen_name + ' \n</p>' +

          //Adds text from tweet
          ' <div class="text">\n ' + doc.data().text + '</div>  <div class="text">\n \n Source:' +

        '<a href="' + link + '" style="word-wrap: break-word;" target="_blank">'+ link

        + '</a></div></div>';
      }


    })}) ;
  }

  //MAKE SURE THAT THIS AND THE STYLE AT AROUND LINE 40 ARE THE SAME!!!!!!
  if(document.getElementById(id).innerHTML== '<style> ' +
    'div.tweet{white-space: pre-line; font-size:min(1em,2vh); line-height: min(1em,2vh); width: 100%; border: 0.3em solid grey; text-align: left; padding-left: 3%; padding-top: 2%; padding-bottom: 2%; padding-right:3%; border-radius: 10px; height: 100%;}' +
    'img.profile {border: 0.1em solid black; border-radius: 50%;   float: left;}' +
    'p.break{line-height: min(1em,2vh);}' +
    '</style>'){
    document.getElementById(id).innerHTML ='<div style="border-radius: 10px; font-size:2.75vmin;   line-height: 140%; display: flex;  justify-content: center; align-items: center; text-align: center; border: 0.3em solid grey ;">There Are No Tweets Available For This County</div>';
  }

}




function getNumOfTweets(firebase, id, name, addToName) {
  var db = getDatabase(firebase);
  return db.collection(name + addToName);
}

/*
async function getNumOfTweets(firebase, id, name, addToName) {
  document.getElementById(id).innerHTML='';
  var htmlUsedToGetTweetNumbers='<div></div>';
  var db = getDatabase(firebase);
  await db.collection(name + addToName).get().then((twitterData) => {
    const tweeters=document.getElementById(id)
    twitterData.docs.forEach(doc => {
      var link;
      if(doc.data().entities.urls != undefined){doc.data().entities.urls.forEach((url) =>{if(url.expanded_url.includes('twitter')){link=url.expanded_url}})}
      if(doc.data().entities.media  != undefined){doc.data().entities.media.forEach((media) =>{if(media.expanded_url.includes('twitter')){link=media.expanded_url}})}

      if(link != undefined){
        tweeters.innerHTML+='<div></div>';
      }


    })}) ;

}
*/
//List of florida counties of which we can get twitter handles from

function getCountyNames(){
  return [
    {name:"AlachuaCounty", color:'color: #000000', disabled:false},
    {name:"BakerCounty", color:'color: #cccccc', disabled:true},
    {name:"BayCounty", color:'color: #000000', disabled:false},
    {name:"BradfordCounty", color:'color: #cccccc', disabled:true},
    {name:"BrevardCounty", color:'color: #000000', disabled:false},
    {name:"BrowardCounty", color:'color: #000000', disabled:false},
    {name:"CalhounCounty", color:'color: #cccccc', disabled:true},
    {name:"CharlotteCounty", color:'color: #000000', disabled:false},
    {name:"CitrusCounty", color:'color: #000000', disabled:false},
    {name:"ClayCounty", color:'color: #000000', disabled:false},
    {name:"CollierCounty", color:'color: #000000', disabled:false},
    {name:"ColumbiaCounty", color:'color: #cccccc', disabled:true},
    {name:"DeSotoCounty", color:'color: #000000', disabled:false},
    {name:"DixieCounty", color:'color: #cccccc', disabled:true},
    {name:"DuvalCounty", color:'color: #000000', disabled:false},
    {name:"EscambiaCounty", color:'color: #000000', disabled:false},
    {name:"FlaglerCounty", color:'color: #000000', disabled:false},
    {name:"FranklinCounty", color:'color: #cccccc', disabled:true},
    {name:"GadsdenCounty", color:'color: #cccccc', disabled:true},
    {name:"GilchristCounty", color:'color: #cccccc', disabled:true},
    {name:"GladesCounty", color:'color: #cccccc', disabled:true},
    {name:"GulfCounty", color:'color: #cccccc', disabled:true},
    {name:"HamiltonCounty", color:'color: #cccccc', disabled:true},
    {name:"HardeeCounty", color:'color: #cccccc', disabled:true},
    {name:"HendryCounty", color:'color: #cccccc', disabled:true},
    {name:"HernandoCounty", color:'color: #000000', disabled:false},
    {name:"HighlandsCounty", color:'color: #000000', disabled:false},
    {name:"HillsboroughCounty", color:'color: #000000', disabled:false},
    {name:"HolmesCounty", color:'color: #cccccc', disabled:true},
    {name:"IndianRiverCounty", color:'color: #000000', disabled:false},
    {name:"JacksonCounty", color:'color: #000000', disabled:false},
    {name:"JeffersonCounty", color:'color: #cccccc', disabled:true},
    {name:"LafayetteCounty", color:'color: #cccccc', disabled:true},
    {name:"LakeCounty", color:'color: #000000', disabled:false},
    {name:"LeeCounty", color:'color: #000000', disabled:false},
    {name:"LeonCounty", color:'color: #000000', disabled:false},
    {name:"LevyCounty", color:'color: #000000', disabled:false},
    {name:"LibertyCounty", color:'color: #cccccc', disabled:true},
    {name:"MadisonCounty", color:'color: #cccccc', disabled:true},
    {name:"ManateeCounty", color:'color: #000000', disabled:false},
    {name:"MarionCounty", color:'color: #000000', disabled:false},
    {name:"MartinCounty", color:'color: #000000', disabled:false},
    {name:"Miami-DadeCounty", color:'color: #000000', disabled:false},
    {name:"MonroeCounty", color:'color: #000000', disabled:false},
    {name:"NassauCounty", color:'color: #000000', disabled:false},
    {name:"OkaloosaCounty", color:'color: #000000', disabled:false},
    {name:"OkeechobeeCounty", color:'color: #cccccc', disabled:true},
    {name:"OrangeCounty", color:'color: #000000', disabled:false},
    {name:"OsceolaCounty", color:'color: #000000', disabled:false},
    {name:"PalmBeachCounty", color:'color: #000000', disabled:false},
    {name:"PascoCounty", color:'color: #000000', disabled:false},
    {name:"PinellasCounty", color:'color: #000000', disabled:false},
    {name:"PolkCounty", color:'color: #000000', disabled:false},
    {name:"PutnamCounty", color:'color: #000000', disabled:false},
    {name:"SantaRosaCounty", color:'color: #000000', disabled:false},
    {name:"SarasotaCounty", color:'color: #000000', disabled:false},
    {name:"SeminoleCounty", color:'color: #000000', disabled:false},
    {name:"St.JohnsCounty", color:'color: #000000', disabled:false},
    {name:"St.LucieCounty", color:'color: #000000', disabled:false},
    {name:"SumterCounty", color:'color: #cccccc', disabled:true},
    {name:"SuwanneeCounty", color:'color: #cccccc', disabled:true},
    {name:"TaylorCounty", color:'color: #cccccc', disabled:true},
    {name:"UnionCounty", color:'color: #cccccc', disabled:true},
    {name:"VolusiaCounty", color:'color: #000000', disabled:false},
    {name:"WakullaCounty", color:'color: #cccccc', disabled:true},
    {name:"WaltonCounty", color:'color: #cccccc', disabled:true},
    {name:"WashingtonCounty", color:'color: #cccccc', disabled:true}
  ];

}
/*
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
*/


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
