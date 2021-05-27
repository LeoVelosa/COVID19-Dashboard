// import firebase from "firebase";
// import {Chart} from "chart.js";
/**
 * @author Melanie McCord
 * */
const pubmedKeywords = [
  'covid+vaccine+symptoms',
  'covid+vaccine+immunological',
  'covid+vaccine+molecular+epidemiology',
  'covid+vaccine+clinical',
  'covid+vaccine',
]
function getpubmedKeywords() {
  return pubmedKeywords;
}
function getKeywordsForHTML() {
  var pubmedKeywords2 = pubmedKeywords;
  for (let i = 0; i < pubmedKeywords.length; i++)
    pubmedKeywords2[i] = pubmedKeywords2[i].replaceAll('+', ' ');
  return pubmedKeywords2;
}
// Where each pubmed statistic is stored
const statistics_collection = 'pubmed_statistics';
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
  var db = firebase.firestore();
  await getAllSearches(db, 'covid');
}
async function createChartVisualization(firebase, Chart) {
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
  const chart_data = await getSearchStatisticsDataFromFirebase(firebase).then(response => {
    console.log("Retrieved", response);
    return response;
  });
  Chart.defaults.font.size = 16;
  const pubmedChart = new Chart('pubmedChart', {
    type: 'bar',
    data: {
      labels: chart_data[0],
      datasets: [{
        label: 'Papers Published On Covid Vaccine By Keyword',
        data: chart_data[1],
        backgroundColor: 'rgba(0,255,0,0.2)',
        borderWidth: 2,

        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1

      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  const chartElement = document.getElementById("pubmedChart");

}
async function getSearchStatisticsDataFromFirebase(firebase) {
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
  // Creates a list of both pubmedKeywords and statistics
  var tuple = []
  var num_entries = []
  var new_key_words = []
  for (var i = 0; i < pubmedKeywords.length; i++) {
    var key = pubmedKeywords[i];
    var temp = pubmedKeywords[i];
    console.log("Keyword", key, "Replaced in graph with", temp);
    if (key === 'covid+vaccine') {
      temp = 'Total'
    } else {
      console.log("Key is not total");
      temp = temp.replaceAll('covid+vaccine', '');
      temp = temp.replaceAll('+', ' ');
      console.log(temp);
    }
    new_key_words.push(temp)
    var data = await getStatsDocument(db, statistics_collection, key).then(response => {
      // console.log(response.data().Result);
      return response.data();
    }).catch(err => {
      console.log(err);
    });
    console.log(data.Result.eGQueryResult[0].ResultItem[0].Count[0]);

    num_entries.push(data.Result.eGQueryResult[0].ResultItem[1].Count[0]);
  }
  tuple.push(new_key_words, num_entries);
  return tuple;
}

async function getStatsDocument(db, collection_name, doc_id) {
    var searchRef = db.collection(collection_name).doc(doc_id);
    console.log(collection_name, doc_id);
    // [START get_document]
    // [START firestore_data_get_as_map]
    // console.log("Getting the document from the search results");
    var doc =await searchRef.get().then(response => {
      // console.log("Got this document here" + response.data());
      // console.log("Document data", response.data());
      var search_results = response;
      // console.log("Successfully retrieved", search_results);
      return search_results;
    }).catch(err => {
      console.log(err);
    });
    console.log(doc);
    return doc;
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

/*
async function getSearch(db, search_query) {
  print(search_query)
  console.log("Preparing to add the document to the search results")
  const abstracts = document.getElementById("papers_by_keyword");
  console.log("Abstracts in top", abstracts);
  var data = await getDocument(db, "covid_pubmed_search", search_query).then(response => {
    return response;
  }).catch(err => {
    console.log(err);
  });
  /*
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
  /*
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

  }

}
   */
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

async function getResultDocument(db, collection_name, doc_id) {
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
    console.log(response);
    return response;
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
async function getAllSearches(db) {
  var search_query = pubmedKeywords[0];
  print(search_query)
  console.log("Preparing to add the document to the search results")
  const abstracts = document.getElementById("covid_pubmed_search");
  console.log("Abstracts in top", abstracts);
  var data = await getDocument(db, "covid_pubmed_search", search_query).then(response => {
    console.log(response);
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


  for (var i = 0; i < data.length; i++) {
    console.log(data[i]);
    console.log("We're getting the", i, "th paper");
    var title = JSON.stringify(data[i].Item[5]._).replaceAll("\"", '').replaceAll("[",).replace("]", '');
    var author_list = data[i].Item[3].Item;
    console.log(JSON.stringify(author_list));
    var authors = "";
    if (author_list !== null) {
      for (var j = 0; j < author_list.length; j++) {
        authors += JSON.stringify(author_list[j]._).replaceAll("\"", "");
        if (j === author_list.length - 2) {
          authors += ' & '
        } else if (j !== author_list.length - 1) {
          authors += ',';
        }
        authors += ' ';
      }
    } else {
      authors = "Test";
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
async function getStatsByMonthForEachKeyword(firebase, pubmedKeywords) {
  console.log("Preparing to upload the number of stats per month for each keyword");
  if (pubmedKeywords == null) {
    pubmedKeywords = getpubmedKeywords();
  }
  let labels = []
  let data = []
  for (let i = 0; i < pubmedKeywords.length; i++) {
    console.log("Currently getting the statistics on", pubmedKeywords[i]);
    let months_by_data = await getStatisticsByMonth(pubmedKeywords[i], firebase).then(response => {
      console.log('Got this months by data', response);
      return response;
    }).catch(err => {
      console.log(err);
    });
    console.log("Updating the labels and data")
    if (i === 0)
      labels = months_by_data[0];
    data.push(months_by_data[1]);
  }

  var tuple = [labels, data];
  console.log(tuple[0]);
  console.log(tuple[1]);
  return tuple;

}
  async function createChartVisualizationByMonth(firebase, Chart, pubmed_keywords) {
    if (pubmed_keywords === null) {
      pubmed_keywords = getpubmedKeywords();
    }
    if (firebase.apps.length == 0) {
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
    /*
    var months_by_data = await getStatisticsByMonth(pubmed_keywords[0], firebase).then(response => {
      console.log('Months by data', response);
      return response;
    }).catch(err => {
      console.log(err);
    });
     */
    const data_and_labels = await getStatsByMonthForEachKeyword(firebase, pubmedKeywords);
    console.log("Returned", data_and_labels);
    const labels = data_and_labels[0];
    const my_datasets = data_and_labels[1];
    console.log("Datasets", my_datasets);
    const CHART_ELEMENT = 'keywordsByMonth';
    var db = firebase.firestore();
    var ctx = document.getElementById(CHART_ELEMENT);
    var myChart = new Chart(CHART_ELEMENT, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: pubmedKeywords[0],
          data: my_datasets[0],
          backgroundColor: 'rgba(0,255,30,1)',
          fill: false,
          showLine: true,
          pointRadius: 5,
          borderWidth: 2,
        },
          {
            label: pubmedKeywords[1],
            data: my_datasets[1],
            backgroundColor: 'rgba(123, 0, 255,1)',
            fill: false,
            showLine: true,
            pointRadius: 5,
            borderWidth: 2,
          },
          {
            label: pubmedKeywords[2],
            data: my_datasets[2],
            backgroundColor: 'rgba(255,0,0,1)',
            fill: false,
            showLine: true,
            pointRadius: 5,
            borderWidth: 2,
          },
          {
            label: pubmedKeywords[3],
            data: my_datasets[3],
            backgroundColor: 'rgba(255,150,30,1)',
            fill: false,
            showLine: true,
            pointRadius: 5,
            borderWidth: 2,
          },
          {
            label: pubmedKeywords[4],
            data: my_datasets[4],
            backgroundColor: 'rgba(0,255,255,1)',
            fill: false,
            showLine: true,
            pointRadius: 5,
            borderWidth: 2,
          }],
        options: {
          scales: {
            y: {
              beginAtZero: false
            }
          },
          plugins: {
            legend: {
              onClick(e) {
                
              }
            }
          }
        }
      }
    });
    ctx.onclick = function(e) {
      var slice = myChart.getElementAtEvent(e);
      if (!slice.length) {
        return;
      }
      var label = slice[0]._model.label;
      window.open('https://www.ncbi.nlm.nih.gov/pubmed?term=' + label);

    }
    console.log(myChart.datasets);
    for (var i = 0; i < myChart.datasets.length; i++) {
      var points = myChart.datasets[i].points;
      for (var j = 0; i < points.length; j++) {
        points[j].onClick = function(e) {
          window.open('https://www.ncbi.nlm.nih.gov/pubmed?term=' + pubmed_keywords[i]);
        }
        // window.open('https://www.ncbi.nlm.nih.gov/pubmed?term=' + pubmed_keywords[i]);
      }
    }
}
async function getStatisticsByMonth(my_keyword, firebase) {
  console.log("Getting the statistics by month")
  const db = getDatabase(firebase);
  var keyword_ref = db.collection(my_keyword);
  const snapshot = await keyword_ref.get().then(response => {
    console.log("Success!");
    console.log("Got the data from the keywords", response);
    return response;
  })
  console.log("Snapshot", snapshot);
  var months_and_data = [];
  var months = [];
  var data = [];
  months = [0, 15, 7, 23, 5];
  data = [5,4,89,0,24245];
  console.log("Testing the sorting function");
  console.log("Items", months, "Data", data);
  console.log(sortBy2(months, data));
  months = []
  data = []
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data().eSearchResult.Count[0]);
    months.push(new Date(doc.id));
    data.push(doc.data().eSearchResult.Count[0]);
  });
  months_and_data.push(months);
  months_and_data.push(data);
  months_and_data = sortBy2(months, data);

  months = months_and_data[0];
  for (let i = 0; i < months.length; i++) {
    let current_month = months[i]
    months[i] = current_month.getMonth() + 1 + '/' + current_month.getFullYear();
  }
  months_and_data[0] = months;
  data = months_and_data[1];
  console.log("Months by data", months, data);
  console.log(months_and_data);
  return months_and_data;
}// https://www.guru99.com/quicksort-in-javascript.html

function sortBy2(arr, arr_to_follow) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        temp = arr_to_follow[i];
        arr_to_follow[i] = arr_to_follow[j];
        arr_to_follow[j] = temp;

      }
    }
  }
  var result = []
  result.push(arr, arr_to_follow)
  return result;

}
async function getPapersByMonthFromFirebase(firebase) {
  var db = getDatabase(firebase);

}

// console.log(getDocument(db, "covid_pubmed_search", 'lLyiMcd6bSvIkKvuldmi'));
