async function initializeFirebase(firebase) {
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
  firebase.initializeApp(firebaseConfig);
  db = firebase.firestore();
  await getAllSearches(db);
}
async function getDocument(db, collection_name, doc_id) {
  var searchRef = db.collection(collection_name).doc(doc_id);
  // [START get_document]
  // [START firestore_data_get_as_map]
  console.log("Getting the document from the search results");
  var doc =await searchRef.get().then(response => {
    console.log("Got this document here" + response.data());
    console.log("Document data", response.data().eSummaryResult.DocSum);
    var search_results = response.data().eSummaryResult.DocSum;
    console.log("Successfully retrieved", search_results);
    return search_results;
  }).catch(err => {
    console.log(err);
  });
  console.log(doc);
  return doc;
  /*
  if (!doc.exists) {
    console.log('No such document');
    return null;
  } else {
    // This is the array of search results
    console.log("Document data", doc.data().eSummaryResult.DocSum);
    var search_results = doc.data().eSummaryResult.DocSum;
    return search_results;
  }
*/

  /*
  for (var i = 0; i < 5; i++)
    console.log("Entry at", i, " is", doc.data().eSummaryResult.DocSum[i]);
  */
  // This is the author's name

  // This is the url
}

async function test() {
  try {
    var document_part = document.getElementById("test");
    document_part.innerHTML += '<p>' + "A" + '</p>';
  } catch(err) {
    console.log(err);
  }

}


async function getAllSearches(db) {
  console.log("Preparing to add the document to the search results")
  var abstracts = document.getElementById("covid_pubmed_search");
  console.log("Abstracts in top", abstracts);
  var data = await getDocument(db, "covid_pubmed_search", 'lLyiMcd6bSvIkKvuldmi').then(response => {
    console.log("Abstracts in getDocument", abstracts);
    console.log("I got this response", data, response);
    console.log("Response" + response);
    for (var ele in response) {

    }
    abstracts.innerHTML += '<div class="covid_search_results"><p>' + response[0].Item[5]._, response[0][4]._, response[0][23]._ + '</p></div>';
  }).catch(err => {
    console.log(err);
  });
  return data;

}

// console.log(getDocument(db, "covid_pubmed_search", 'lLyiMcd6bSvIkKvuldmi'));
