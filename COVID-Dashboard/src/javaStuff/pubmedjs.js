async function initializeFirebase(firebase) {
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
<<<<<<< Updated upstream


=======
async function getAllStatistics(db) {
  console.log("Preparing to get the statistics from pubmed");
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
  console.log("Preparing to add the document to the search results")
  // const abstracts = document.getElementById("covid_pubmed_search");
  // console.log("Abstracts in top", abstracts);
  var searchRef = db.collection("pubmed_statistics").doc("covid");
  // [START get_document]
  // [START firestore_data_get_as_map]
  console.log("Getting the document from the search results");
  var doc =await searchRef.get().then(response => {
    console.log("Got this document here" + response.data());
    console.log("Document data", response.data().Result);
    var search_results = response.data();
    console.log("Successfully retrieved", search_results);
    console.log("Search Results", search_results.Result.eGQueryResult[0].ResultItem[0].Count);
    console.log("Term", search_results.Result.Term)
    return search_results;
  }).catch(err => {
    console.log(err);
  });
  console.log(doc);
  return doc;
}
getKeyWordStats = async function() {
  var db = firebase.firestore();
  var tuple = []
  var doc = await getAllStatistics(db);
  var term = doc.Result.Term;
  var count = search_results.Result.eGQueryResult[0].ResultItem[0].Count;
  tuple.push(new KeyWordStats(term, count));
  return tuple;
}
class KeyWordStats {
  constructor(term, count) {
    this.term = term;
    this.count = parseInt(count);
  }
}
>>>>>>> Stashed changes
async function getAllSearches(db) {
  console.log("Preparing to add the document to the search results")
  const abstracts = document.getElementById("covid_pubmed_search");
  console.log("Abstracts in top", abstracts);
  var data = await getDocument(db, "covid_pubmed_search", 'lLyiMcd6bSvIkKvuldmi').then(response => {
    return response;
  }).catch(err => {
    console.log(err);
  });
  // data = JSON.stringify(data);
  console.log('Link: https://doi.org/' + JSON.stringify(data[0].Item[23]._).substring(6));
  /*abstracts.innerHTML += '<style> table {\n font-family: arial, sans-serif; border-collapse: collapse;width: 100%;}'+
  'td, th {border: 1px solid #dddddd;text-align: left;padding: 8px;}' +
    'tr:nth-child(odd)' +
  '{background-color: #dddddd;}</style>';
abstracts.innerHTML += '<table>';
  for (var i = 0; i < data.length; i++) {

    var title = JSON.stringify(data[i].Item[5]._).replace("\"", "").replace("[","").replace("]", "");
    var author = JSON.stringify(data[i].Item[4]._).replace("\"", "");
    var link = 'https://doi.org/' + JSON.stringify(data[0].Item[23]._).substring(6).replace("\"","");
    var doi_with_label = JSON.stringify(data[0].Item[23]._);
    /*
    // console.log(<a href='+ link + '>' + doi_with_label +'</a>');
    abstracts.innerHTML += '<div id=search_result><p class="text"><div class="text">' +
    '<h3>' + '<a href='+ link + '>' + title +'</a>' + '</h3>' + author +
      doi_with_label + '</p></div></div>';

    abstracts.innerHTML +=
      // adds title, author, doi
      '<tr> <h3>' + '<a href='+ link + '>' + title +'</a>' + '</h3>' + author + doi_with_label + '</tr>';
  }
  abstracts.innerHTML += '</table>';
   */
  console.log(abstracts);

  abstracts.innerHTML += '<style> ' +
    'div.title, p.title {color:black;}' +
    'div.author, p.author {color:black}' +
    '</style>';

    for (var i = 0; i < data.length; i++) {

      var title = JSON.stringify(data[i].Item[5]._).replace("\"", "").replace("[", "").replace("]", "");
      var author = JSON.stringify(data[i].Item[4]._).replace("\"", "");
      var link = 'https://doi.org/' + JSON.stringify(data[0].Item[23]._).substring(6).replace("\"", "");
      var doi_with_label = JSON.stringify(data[0].Item[23]._);


      abstracts.innerHTML += '<div id="paper">' +
        "<div id='title'>" + '<a href=' + link + '>' + title + '</a>' + ' </div>' + "<div id='author'>" +
        author + "</div>" + "<div id='link'>" + doi_with_label + '</div>';
      abstracts.innerHTML += '<tr><td>' +
        '<h3>' + '<a href=' + link + '>' + title + '</a>' + '</h3>' + author +
        doi_with_label + '</tr></td>';
    }
    abstracts.innerHTML += '</table>';

}
// console.log(getDocument(db, "covid_pubmed_search", 'lLyiMcd6bSvIkKvuldmi'));
