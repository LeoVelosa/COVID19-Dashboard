var firebase = require('firebase');

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
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();
  async function getDocument(db, collection_name, doc_id) {
    var searchRef = db.collection(collection_name).doc(doc_id);
    // [START get_document]
    // [START firestore_data_get_as_map]
    var doc = await searchRef.get();
    if (!doc.exists) {
      console.log('No such document');
      return null;
    } else {
      console.log("Document data", doc.data());
      console.log(doc.data().Id)
      return doc.data();
    }
  }
  var data = getDocument(db, "covid_pubmed_search", "KrFZZdQN6mmYI3u9cexd");
  console.log(data);
  