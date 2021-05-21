async function getDocument(db, collection_name, doc_id) {
  var searchRef = db.collection(collection_name).doc(doc_id);
  // [START get_document]
  // [START firestore_data_get_as_map]
  console.log("Getting the document from the search results");
  var doc = await searchRef.get().then(response => {
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
}
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
      return response;
    });
    const MAX_PAPERS = 5;
    var num_papers = 0;
    const MAX_AUTHORS = 4;
    for (var i = 0; i < data.length; i++) {
      console.log("The data here is", data[i]);
      var title = JSON.stringify(data[i].Item[5]._).replaceAll("\"", '').replaceAll("[",).replace("]", '');
      var author_list = data[i].Item[3].Item;
      var authors = "";
      if (author_list == null) {
        continue;
      }
      for (var j = 0; j < author_list.length; j++) {
        if (j >= MAX_AUTHORS) {
          authors += ' et al.'
          break;
        }
        authors += JSON.stringify(author_list[j]._).replaceAll("\"", "");
        if (j === author_list.length - 2) {
          authors += ' & '
        } else if (j !== author_list.length - 1) {
          authors += ',';
        }
        authors += ' ';
      }

      console.log(authors);

      var doi_with_label = JSON.stringify(data[i].Item[23]._).toString();
      if (doi_with_label == null) {
        continue;
      }
      console.log(doi_with_label);
      // Extracts the link starting at the index of the end of the doi and ending with the character before the quotes.
      var link = 'https://doi.org/' + doi_with_label.substring(doi_with_label.indexOf('doi') + 5, doi_with_label.length - 1);

      console.log(link, doi_with_label);
      console.log("Pubdate", data[i].Item[0]._);
      var pubdate = JSON.stringify(data[i].Item[0]._) //.replaceAll('\"', '');
      console.log("Periodical", data[i].Item[2]._);
      var periodical = JSON.stringify(data[i].Item[2]._) //.replaceAll("\"", "");
      console.log(data[i].Item[6]._);
      console.log("Issue number", data[i].Item[6]._);
      var issue_number = JSON.stringify(data[i].Item[6]._);
      console.log("Issue number and volume", JSON.stringify(data[i].Item[6]));
      abstracts.innerHTML +=
        authors +
        " (" + pubdate + ") " + '<a href=' + link + '>' + ' ' + title + '</a>' + ' ' +
        periodical + " (" + issue_number + ") " + '<a href=' + link + '>' + ' ' + doi_with_label + '</a>' + '<p></p>';
      num_papers += 1;
      // If there are more than the max papers, stop.
      if (num_papers >= MAX_PAPERS) {
        break;
      }
    }

  }
