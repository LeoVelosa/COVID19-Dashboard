/** Pulling Pubmed
 * @author Melanie McCord
 * **/
const functions = require('firebase-functions');
const admin = require('firebase-admin');
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

// firebase.initializeApp(firebaseConfig);
admin.initializeApp();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xml2js = require('xml2js');
var fs = require('fs');
var firebase = require('firebase');
const {ajax} = require("rxjs/ajax");
/**
 * TODO: integrate it with pubmed_to_firestore so that the data is uploaded directly to Firebase. Currently just saves to a file.
 * */
/**
 * Pubmed2.js
 * Loads a webpage from PubMed Entrez API and runs it
 * Classes = MyXMLHTTPRequest: creates an xml http request based on a main url (the database's main page)
 *          because of asynchronous requests, each xmlhttprequest function creates a different xmlhttprequest object for separate uses
 *          so makeSearchRequest gets the ids and saves them to a file and getSearchResults retrieves the results based on the ids
 * DocumentParsers: parses the xml and gets the data from it (i.e. ids for the search urls)
 * PubMedURLs: creates urls based on input from what you're searching (i.e. Covid from Pubmed database)
 * Reading and Writing Files: different ways to create files depending on their usage (like writing the list of ids to a file
 *                            or writing the xml to a file
 * getSearchResultFromPubMed: deprecated due to asynchronous requests not syncing
 * XMLtoJSONParser: converts the xml file to a json and saves it to a file.
 *
 * To run this code:
 * 1. call MyXMLHTTPRequest.searchQuest() on a url from PubMed search results
 * 2. read in the ids from data.txt as an array and call getSearchResults
 * 3. The json will be saved as a file.
 * Thank you!
 * */
db = firebase.firestore();
class Id {
  constructor(id_list) {
    this.id = id_list;
  }
}
/**
 * Creates an id list to upload the ids to get the search results
 * Need in order to get the xmlhttprequest.
 * */
class IdList {
  constructor(id_array, collection_name, doc_name) {
    this.idList = this.parseIDArray(id_array);
  }
  // creates a json object from the array of ids
  parseIDArray(id_array) {
    var json = {
      "ids" : id_array
    };
    return json;
  }
  async uploadIdsToFirebase(db, collection_name, doc_name) {
    if (collection_name == null) {
      collection_name = "covid_pubmed_search";
    }
    if (doc_name == null) {
      doc_name = doc_name + '_ids';
    }
    await new UploadToFirebase().uploadJSONToFirestore(this.idList, collection_name, doc_name).then(response => {
      console.log("Successfully uploaded to", collection_name);
    }).catch(err => {
      console.log("Error", err);
    });
  }

}
class UploadToFirebase {
  async uploadJSONToFirestore(my_json, collection_name, doc_name) {
    if (collection_name == null && doc_name == null) {
      collection_name = "pubmed_statistics";
      doc_name = "covid_symptoms";
    }
    console.log("Currently uploading the json to Firebase")
    // console.log("JSON", my_json, JSON.stringify(my_json));
    await db.collection(collection_name).doc(doc_name).set(my_json).then(response => {
      console.log("Successfully uploaded the json");
    }).catch(err => {
      console.log(err);
    })
  }

  async uploadToFirebase(my_json, test, test2) {
    await this.uploadJSONToFirestore(my_json, test, test2);
  }
}
class PullFromFirebase {

}
class Test {
  uploadIdsToFirebaseFromFile() {
    var ids = new ReadingAndWritingFiles().readFromAFile("ids.txt");
    new IdList(ids, "test", "test").uploadIdsToFirebase(db, "test", "test");
  }
  uploadTestFileToFirebase() {
    var my_json = {
      name: "Melanie"
    }
    new UploadToFirebase().uploadToFirebase(my_json, "test", "test");
  }
}
// default class for making generalized xml http requests
class MyXMLHTTPRequest {
  // Sets the default main url (i.e., the place where you get the main database)
  constructor(main_url) {
    this.main_url = main_url;
    this.pubmedUrls = new PubMedURLs();
  };
  ajax(url /* ,params */, callback, search_query) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = async function () {
      // return if not ready state 4
      if (this.readyState !== 4) {
        return;
      }

      // check for redirect
      if (this.status === 302 || this.status === 301 /* or may any other redirect? */) {
        var location = this.getResponseHeader("Location");
        return ajax.call(this, location /*params*/, callback);
      }

      // return data
      // console.log(this.responseText)
      var data = await new XMLToJSONParser().parseXml(new DocumentParsers().getTextFromXMLHTTPResponse(this)).then(response => {
        console.log(response);
        return response;
      });
      callback && callback(data, "pubmed_statistics", search_query);
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }
  // Creates a xml http request based on a url
  // params: sub_url, the sub category (i.e. if main_url is sample.com, then the additional results would be "keyword=34/")
  makeSearchQuest(sub_url, keyword) {
    if (keyword == null)
      keyword = 'covid';
    const xhr = new XMLHttpRequest(),
      method = "GET",
      responseType = "document";
    var url = this.main_url + sub_url;
    xhr.open(method, url, false);
    xhr.onload = function() {
      var myDocParser = new DocumentParsers();
      var ids = myDocParser.getIDs(myDocParser.getTextFromXMLHTTPResponse(xhr), keyword);
      // ("Ids", ids);
      // console.log("On load!");
      // console.log(this);
      // console.log(this.responseType);
      var txt = xhr.responseText;
    }
    xhr.onreadystatechange = function () {
      // In local files, status is 0 upon success in Mozilla Firefox
      if(xhr.readyState === XMLHttpRequest.DONE) {
        var status = xhr.status;
        if (status === 0 || (status >= 200 && status < 400)) {
          // The request has been completed successfully
        } else {
          // Oh no! There has been an error with the request!
        }
      }
      xhr.onerror = function() {
        console.log("There has been an error with the request");
      }
    };
    xhr.send();
  }
  // Gets the statistics about a search result from pubmed and
  // uploads a json with this information to Firebase.
  async getStatisticsAboutKeyword(search_query, collection_name) {

    /*const xhr = new XMLHttpRequest(),
      method = "GET",
      responseType = "document";
    var url = this.pubmedUrls.getSearchStatistics(search_query);
    function handleEvent(e) {
      log.textContent = log.textContent + `${e.type}: ${e.loaded} bytes transferred\n`;
    }
    xhr.addEventListener('error', handleEvent);
    console.log("Url I'm searching for", this.main_url + url);
    xhr.open(method, this.main_url + url, false);
    xhr.onload = async function () {
      console.log(xhr.status);
      console.log("Retrieving results")
      var my_xml_text = xhr.responseText;
      console.log("Results", xhr.responseText);
      console.assert(xhr.responseText !== null);
      // console.log(my_xml_text);
      // new ReadingAndWritingFiles().writeToAnXMLFile(my_xml_text, "search_results.xml");
      var my_json = new XMLToJSONParser().parseXml(my_xml_text).then(response => {
        console.log("Successfully created a json of the search results", response);
        new UploadToFirebase().uploadJSONToFirestore(response, "covid_pubmed_search", search_query);
        // console.log("JSON of Results", my_json);
      }).catch(err => {
        console.log(err);
      });
    }
    xhr.send();
     */
    this.ajax(this.main_url + (new PubMedURLs().getSearchStatistics(search_query)),
      new UploadToFirebase().uploadJSONToFirestore, search_query);
  }

  async uploadSearchResultsToFirestore(search_query, collection_name) {
    if (collection_name == null) {
      collection_name = "covid_pubmed_search";
    }
    // gets the ids and uploads them to Firebase
    this.makeSearchQuest(this.pubmedUrls.getIDsforSearchResults(search_query, "pubmed"), search_query);
    // console.log(search_query + "_ids");
    var searchRef = db.collection(collection_name).doc(search_query + '_ids');
    // [START get_document]
    // [START firestore_data_get_as_map]
    console.log("Getting the document from the search results");
    var ids =await searchRef.get(search_query + '_ids').then(response => {
      response = (response.data());
      // console.log("Got this document here" + response);
      var ids = response.ids;
      console.log("Successfully retrieved", ids);
      return ids;
    }).catch(err => {
      console.log(err);
    });
    console.log(ids);
    var id_list = ids;
    console.log("Id List", id_list)
    await this.getSearchResults(id_list, search_query).then(response => {
      console.log("Success!");
    }).catch(err => {
      console.log(err);
    });
  }
  // From a list of search ids gotten from search request, gets the ids for the search result.
  async getSearchResults(id_list, doc_name) {
    const xhr = new XMLHttpRequest(),
      method = "GET",
      responseType = "document";
    var url = this.pubmedUrls.downloadResultFromIDList(id_list, "pubmed");
    console.log("Url I'm searching for", this.main_url + url);
    xhr.open(method, this.main_url + url, false);
    xhr.onload = async function () {
      console.log("Retrieving results")
      var my_xml_text = xhr.responseText;
      // console.log(my_xml_text);
      // new ReadingAndWritingFiles().writeToAnXMLFile(my_xml_text, "search_results.xml");
      var my_json = new XMLToJSONParser().parseXml(my_xml_text).then(response => {
        console.log("Successfully created a json of the search results.");
        new UploadToFirebase().uploadJSONToFirestore(response, "covid_pubmed_search", doc_name);
        // console.log("JSON of Results", my_json);
      });


    }
    xhr.onreadystatechange = function () {
      // In local files, status is 0 upon success in Mozilla Firefox
      if(xhr.readyState === XMLHttpRequest.DONE) {
        var status = xhr.status;
        if (status === 0 || (status >= 200 && status < 400)) {
          // The request has been completed successfully
        } else {
          // Oh no! There has been an error with the request!

        }
      }
    };
    xhr.send();
  }
}

class DocumentParsers {
  constructor() {}
  // From a string object, loops through
  getIDs(my_string, keyword) {
    if (keyword == null) {
      keyword = 'covid';
    }
    // Create a re object to find the numbers with 8 digits
    let re = /<Id>(.*?)<\/Id>/g
    var numbersFromString = Array.from(my_string.match(re));
    var count = 0;
    var ids = [];
    for (var i = 0; i < numbersFromString.length; i++) {
      var num = numbersFromString[i];
      let re = "\\b\\d{8}\\b";
      ids[count] = parseInt(num.match(re));
      count += 1;
      if (count >= 5) {
        break;
      }
    }
    console.log("Initial id list", ids);
    var myIDs = new IdList(ids, "covid_pubmed_search", keyword+ '_ids');
    console.assert(db != null);
    myIDs.uploadIdsToFirebase(db, "covid_pubmed_search", keyword + '_ids');
    // new ReadingAndWritingFiles().writeToaFile(ids, "ids.txt");
    return ids;
  }
  // Parses the response text into a format that the json parser can read
  getTextFromXMLHTTPResponse(xmlhttp){
    // console.log("Response text", xmlhttp);
    var txt=xmlhttp.responseText + "";
    txt.replace(/<&#91;^>&#93;*>/g, "");
    //Convert txt into a string so that I can use it
    // console.log("Text", txt);
    return txt;
  }
}
class PubMedURLs {
  constructor() {
    this.main_url = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/';
    this.apiKey = '/api_key=da3f695a22cf95ba939d5c477fe843a6e508';
    this.lang = '+AND+English[language]'

  }
  getIDsforSearchResults(keyword, database) {
    return 'esearch.fcgi?db=' + database + '&term=' + keyword + this.lang + this.apiKey;
  }
  downloadResultFromIDList(id_list, database) {
    console.log(id_list.toString());
    var url = 'esummary.fcgi?db=' + database + '&id=' + id_list + this.apiKey;
    console.log(this.main_url + url);
    return url;
  }
  // Searches the entire database for Covid
  getSearchStatistics(keyword) {
    var url =  'egquery.fcgi?term=' + keyword + this.apiKey;
    console.log(this.main_url + url);
    return url;
  }
}

// Functions for reading and writing data
class ReadingAndWritingFiles {
  constructor() {

  }
  // given a file, reads data from it and returns the string array
  // filename = the name of a file stored in data
  readFromAFile(filename) {
    // default filename = ids.txt
    filename = __dirname + "/" + filename;
    console.log("Filename", filename);

    try {
      const data = fs.readFileSync(filename, 'utf8')
      console.log("Data", data)
      var data_list = data.split(",");
      console.log(data_list);
      return data_list;
    } catch (err) {
      console.error(err)
    }
  }
  // Given xml data, writes it to an xml data file
  writeToAnXMLFile(xml_data, filename) {
    console.log('Data', xml_data);
    filename = __dirname + "/" + filename;
    fs.writeFile(filename, xml_data, function(err) {
      if (err) return console.log(err);
      console.log("Data >" + filename);
    });
  }
  // Given an array, writes each element to a file called ids.txt
  writeArrayToaFile(my_arr, filename) {
    filename = __dirname + "/" + filename;
    var my_string = "";
    for (var i = 0; i < my_arr.length; i++) {
      my_string += String(my_arr[i]) + " ";
    }
    fs.writeFile("ids.txt", my_string, function(err) {
      if (err) return console.log(err);
      console.log("Data >", filename);
    });
  }
  writeToaFile(data, filename) {
    filename = __dirname + "/" + filename;
    var my_string = String(data);
    fs.writeFile(filename, my_string, function(err) {
      if (err) return console.log(err);
      console.log(data, "Data >", filename);
    });
  }
}

class getSearchResultFromPubMed {
  constructor() {
    // The main search url from PubMed.
    this.pubMedXMLrequests = new MyXMLHTTPRequest("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/");
    this.pubMedUrls = new PubMedURLs();
  }
  // gets the ids for search results from a particular database
  // default is pubmed
  getIDsforSearchResults(keyword, database) {
    if (database == null) {
      database = "pubmed";
    }
    var my_url = this.pubMedUrls.getIDsforSearchResults(keyword, database);
    console.log(my_url);
    let re = /\d+/;
    console.log(re);
    var my_string = "<Id>33858023</Id>";
    console.log("Matches with", my_string, "=", my_string.match(re));
    my_string = '<Id>9</Id>';
    console.log("Matches with", my_string, my_string.match(re));
    // console.log('url ' + my_url);
    var pubmedSearchResult = this.pubMedXMLrequests.makeSearchQuest(my_url);
    return pubmedSearchResult;
  }
  // returns a list of search results matching the first id
  // search ids = an array of search ids, e.g. [909090, 787878, 909090]
  downloadResults(search_ids) {
    var my_result = this.pubMedXMLrequests.makeSearchQuest('efetch.fcgi?db=pubmed&id=' + search_ids + '&rettyperettype=fasta&retmode=text');
    // console.log(this.pubMedXMLrequests.main_url + ('efetch.fcgi?db=pubmed&id=' + search_ids + '&rettyperettype=fasta&retmode=text'));
    // console.log(my_result);
    return my_result;
    // return this.pubMedXMLrequests.makeSearchQuest('efetch.fcgi?db=pubmed&id=' + search_ids + '&rettyperettype=fasta&retmode=text')
  }
}
class XMLToJSONParser {
  parseXml(xml) {
    return new Promise((resolve, reject) => {
      xml2js.parseString(xml, { mergeAttrs: true }, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
          // new ReadingAndWritingFiles().writeToaFile(JSON.stringify(result), "covid_search.json");
        }
      });
    });
  }

  processResult(result) {
    // console.log("processResult: result: ", result);
    // new ReadingAndWritingFiles().writeToaFile(result, "covid_search.json");
  }

  async testXmlParse(xml) {
    try {
      let result = await parseXml(xml);
      // Now that you have the result you can do further processing, write to file etc.
      processResult(result);
    } catch (err) {
      console.error("parseXml failed: ", err);
    }
  }
}


/*
myPubMedSearchResults = new getSearchResultFromPubMed();
// console.log(myPubMedSearchResults.downloadResults('33858023').responseText);
myPubMedSearchResults.getIDsforSearchResults("Covid-19", "pubmed");
my_arr = [1,2,3,4];
var my_list = new ReadingAndWritingFiles().readFromAFile("ids.txt");
console.log("List of IDs", my_list);
var my_Urls = new PubMedURLs().downloadResultFromIDList(my_list, 'pubmed');
var covid_text = myPubMedSearchResults.getIDsforSearchResults("Covid-19", "pubmed");
var my_list = new ReadingAndWritingFiles().readFromAFile("ids.txt");
new MyXMLHTTPRequest().getSearchResults(my_list, "covid");
*/
const pubmedKeywords = [
  'covid+vaccine',
  'covid+vaccine+symptoms',
  'covid+vaccine+immunological',
  'covid+vaccine+molecular+epidemiology',
  'covid+vaccine+clinical'
]
console.log(new PubMedURLs().getSearchStatistics('covid+symptoms'));
/*
var keyword = 'covid,symptoms';
new MyXMLHTTPRequest(new PubMedURLs().main_url).uploadSearchResultsToFirestore(keyword, "covid_pubmed_search");
new MyXMLHTTPRequest(new PubMedURLs().main_url).getStatisticsAboutKeyword(keyword);
*/

// new MyXMLHTTPRequest(new PubMedURLs().main_url).getStatisticsAboutKeyword(pubmedKeywords[4], "pubmed_statistics");
async function getAllPapersOnpubmedKeywords() {
  for (var i = 0; i < pubmedKeywords.length; i++) {
    var keyword = pubmedKeywords[i];
    console.log(keyword);
    await new MyXMLHTTPRequest(new PubMedURLs().main_url).uploadSearchResultsToFirestore(keyword, "covid_pubmed_search");
  }
}
async function getAllStatisticsOnpubmedKeywords() {
  for (var i = 0; i < pubmedKeywords.length; i++) {
    await new MyXMLHTTPRequest(new PubMedURLs().main_url).getStatisticsAboutKeyword(keyword, "pubmed_statistics");
  }
}

//Uploads all statistics on the pubmedKeywords every 5 days at 3am
exports.Statistics = functions.runWith({timeoutSeconds: 539}).pubsub.schedule('every 5 days').onRun( async(context) => {
  await getAllStatisticsOnpubmedKeywords().then(response => {
    console.log("Success!");
  }).catch(err => {
    console.log(err);
  })
});

// Uploads all papers by keyword every 5 days
exports.Papers = functions.runWith({timeoutSeconds: 539}).pubsub.schedule('every 5 days').onRun( async(context) => {
  await getAllPapersOnpubmedKeywords().then(response => {
    console.log("Success!");
  }).catch(err => {
    console.log(err);
  })
});
