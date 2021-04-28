// TODO: Remove temporary id and make this a single searchable one
const id_for_pubmed = 'lLyiMcd6bSvIkKvuldmi';
// TODO: Incorporate all the search results from data pulled from PubMed
function getSearchNames(){
  return [
    "Covid"
  ];

}

async function getAllSearches(firebase){
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

  await getSearchesFromDocument(db);
}

//This is the way to get the JSON files and make them into html and sends them to card-component.ts
async function getSearchesFromDocument(db) {

  //Basically creates a storage for all the html. IT NEEDS TO BE THIS WAY OTHERWISE PAGE WILL REFRESH AND THINGS WILL MESS UP
  const pubmeds=document.getElementById("pubmed_searches")
  pubmeds.innerHTML += <p> A</p>;

/*
//  getCountyNames().forEach()((collect)=>{
  var names = getCountyNames();


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

        if(doc.data().entities.urls != undefined){

          doc.data().entities.urls.forEach((url) =>{

              if(url.expanded_url.includes('twitter')){link=url.expanded_url}

            }
  }
*/
}
