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
  return db;
}

async function getDocument(db, collection_name, doc_id) {
  var searchRef = db.collection(collection_name).doc(doc_id);
  console.log("Getting the document from the search results");
  var doc = await searchRef.get().then(response => {
    console.log("Got this document here" + response.data());
    console.log("Document data", response.data());
    console.log("Successfully retrieved", search_results);
    return search_results;
  }).catch(err => {
    console.log(err);
  });
  console.log(doc);
  return doc;
}

  async function getSearches(firebase, id, keyword, reset) {
    // Default name: currently abstracts are stored in covid pubmed search
    const collection_name = "covid_pubmed_search";
    if (reset) {
      document.getElementById(id).innerHTML = '';
    }
    if (keyword == null) {
      keyword = "covid+vaccine";
    }

    var db = getDatabase(firebase);
    var data = await getDocument(db, collection_name, keyword).then(response => {
      return response.Result;
    });

    for (var i = 0; i < data.length; i++) {
      var title = JSON.stringify(data[i].Item[5]._).replaceAll("\"", '').replaceAll("[",).replace("]", '');
      var author_list = data[i].Item[3].Item;
      var authors = "";
      for (var j = 0; j < author_list.length; j++) {
        authors += JSON.stringify(author_list[j]._).replaceAll("\"", "");
        if (j === author_list.length - 2) {
          authors += ' & '
        } else if (j !== author_list.length - 1) {
          authors += ',';
        }
        authors += ' ';
      }
      console.log(authors);

      var link = 'https://doi.org/' + JSON.stringify(data[0].Item[23]._).substring(6).replaceAll("\"", "");
      var doi_with_label = JSON.stringify(data[0].Item[23]._).replaceAll("\"", '');
      var pubdate = JSON.stringify(data[0].Item[0]._).replaceAll('\"', '');
      var periodical = JSON.stringify(data[0].Item[2]._).replaceAll("\"", "");
      var issue_number = JSON.stringify(data[0].Item[6]._);
      console.log("Issue number and volume", JSON.stringify(data[0].Item[6]));
      abstracts.innerHTML +=
        authors +
        " (" + pubdate + ") " + '<a href=' + link + '>' + ' ' + title + '</a>' + ' ' +
        periodical + " (" + issue_number + ") " + '<a href=' + link + '>' + ' ' + doi_with_label + '</a>' + '<p></p>';

    }
  }
