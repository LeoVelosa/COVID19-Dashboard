/** Pulling Pubmed
 * @author Melanie McCord
 * **/
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xml2js = require('xml2js');
var fs = require('fs');
var firebase = require('firebase');
const {ajax} = require("rxjs/ajax");
var moment = require('moment');
/**
 * pulling_pubmed.js
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
  ajax(url /* ,params */, callback, search_query, collection_name) {
    if (collection_name == null) {
      collection_name = "pubmed_statistics";
    }
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
      callback && callback(data, collection_name, search_query);
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
  async getStatisticsAboutKeywordByMonth(search_query) {
    const NUM_MONTHS = 17
    var search_stats_by_month = new PubMedURLs().getSearchStatisticsByMonth(search_query, NUM_MONTHS)
    for (var i = 0; i < NUM_MONTHS; i++) {
      this.ajax(search_stats_by_month[i],
        new UploadToFirebase().uploadJSONToFirestore, 'month' + (i).toString(), search_query);
    }
  }
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
    const NUM_MONTHS = 17
    this.ajax(this.main_url + (new PubMedURLs().getSearchStatistics(search_query)),
      new UploadToFirebase().uploadJSONToFirestore, search_query);
    var search_stats_by_month = new PubMedURLs().getSearchStatisticsByMonth(search_query, NUM_MONTHS)
    for (var i = 0; i < NUM_MONTHS; i++) {
      this.ajax(search_stats_by_month[i],
        new UploadToFirebase().uploadJSONToFirestore, search_query + 'month' + (i).toString());
    }

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
  async getSearchStatisticsByMonth(keyword) {
    const urls_bydate = this.pubmedUrls.getSearchStatisticsByMonth(keyword);
    const dates = urls_bydate[1];
    const urls = urls_bydate[0];
    console.log(urls, dates);

    for (var i = 0; i < dates.length; i++) {
      console.log("Uploading", dates[i], "in the collection", keyword, "to Firebase");
      await this.uploadDatesToFirebase(urls[i], dates[i], keyword);
    }

  }
  async uploadDatesToFirebase(my_url, date, my_keyword) {
    console.log("Preparing to upload to Firebase");
    const xhr = new XMLHttpRequest(),
      method = "GET",
      responseType = "document";
    xhr.open(method, my_url, true);
    xhr.onerror = function() {
      console.log("Oh no! There has been an error with the request!");
    }
    xhr.onload = async function() {
      console.log(date, my_keyword);
      console.log(xhr.responseText);
      const date_array = date.split(' ');
      const month = date_array[0];
      const year = date_array[1];
      date = month + ' ' + year;
      console.log(date);
      console.log(date, "is being uploaded to", my_keyword);
      let my_text = new DocumentParsers().getTextFromXMLHTTPResponse(xhr);
      const my_json = await new XMLToJSONParser().parseXml(my_text);
      await new UploadToFirebase().uploadJSONToFirestore(my_json, my_keyword, date).then(response => {
        console.log("Successfully uploaded to Firebase!");
      }).catch(err => {
        console.log("Oh no! There has been an error with the upload!", err);
      });
      await new MyXMLHTTPRequest().sleep(2000);
    }
    xhr.send();
  }
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
    this.apiKey = '&api_key=da3f695a22cf95ba939d5c477fe843a6e508';
    this.lang = '+AND+English[language]'

  }
  // Gets the urls by date and returns an array with the dates and urls for searching
  getSearchStatisticsByMonth(keyword) {
    console.log("Url I'm requesting");
    const myDateParser = new DateParsing();
    // the tuple of both urls and dates to return
    var urls_by_date = [];
    var urls = []
    // the start dates for each entry
    var dates_to_return = []
    var all_dates = myDateParser.createAllDatesFromStartDate(myDateParser.getStartOfPandemic());
    var dates_urls = all_dates[0];
    var dates_for_firebase = all_dates[1];
    for (let i = 1; i < dates_for_firebase.length; i++) {
      let my_date_url = (this.main_url + this.getIDsforSearchResults(keyword, 'pubmed') + '&datetype=pdat&mindate=' + dates_urls[i-1] + "&maxdate=" + dates_urls[i]) + this.apiKey;
      // console.log(my_date_url);
      // console.log(my_date_url, dates[i-1]);
      urls.push(my_date_url)
      dates_to_return.push(dates_for_firebase[i-1]);
    }
    urls_by_date.push(urls);
    urls_by_date.push(dates_for_firebase);
    return urls_by_date;
  }

  getIDsforSearchResults(keyword, database) {
    var url = 'esearch.fcgi?db=' + database + '&term=' + keyword + this.apiKey;
    // console.log("URL:", this.main_url + url);
    return url;
  }
  downloadResultFromIDList(id_list, database) {
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
// validating data from firebase
class DataValidation {
  constructor() {

  }
  // checks the collection for each piece of data not in the collection
  // by default, uploads only the m
  async checkMostRecentDateInDatabase(my_keyword, date_list) {
    var keywordRef = db.collection(my_keyword);
    var keywords_to_update = [];
    for (let i = 0; i < date_list.length - 1; i++) {
      var doc = await keywordRef.get(date_list[i]).then(response => {
        console.log("This data is in the reference list");
      }).catch(err => {
        console.log("There was an error", err);
        keywords_to_update.push(date_list[i]);
      })
    }
    // Always update the most recent month
    keywords_to_update.push(date_list[date_list.length - 1]);
    return keywords_to_update;
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
class DateParsing {
  constructor() {
    this.years = ['2020', '2021'];
    this.namedMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }
  getAllNamedMonths() {
    return this.namedMonths;
  }
  getAllYears() {
    return this.years;
  }
  createAllDatesFromStartDate(startDate) {
    if (startDate == null)
      startDate = this.getStartOfPandemic();
    // the start of the pandemic, i.e. January 1st, 2020
    // today
    var endDate = moment();
    var dates_for_pubmed = []
    var results = [];
    var dates_strings = []
    if (endDate.isBefore(startDate)) {
      throw "End date must be greater than start date."
    }

    while (startDate.isBefore(endDate)) {
      dates_for_pubmed.push(startDate.format("YYYY/MM/DD"));
      let date_string = (this.namedMonths[startDate.month()] + ' ' + startDate.year());
      console.log(date_string);
      dates_strings.push(date_string);
      startDate.add(1, 'month');
    }
    dates_for_pubmed.push(endDate.format('YYYY/MM/DD'))
    results.push(dates_for_pubmed);
    results.push(dates_strings);
    return results;
  }
  getStartOfPandemic() {
    return moment("2020/01/01");
  }

}
const pubmedKeywords = [
  'covid+vaccine',
  'covid+vaccine+symptoms',
  'covid+vaccine+immunological',
  'covid+vaccine+molecular+epidemiology',
  'covid+vaccine+clinical'
]



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
// Getting the different keywords from PubMed
// Due to PubMed API pull limits, only doing one at a time
exports.CovidVaccineStats = functions.runWith().pubsub.schedule('0 3 * * *').onRun(async(context) => {
  await new MyXMLHTTPRequest(new PubMedURLs().main_url).getSearchStatisticsByMonth(pubmedKeywords[0]).then(response => {
    console.log("Success!");
  }).catch(err => {
    console.log(err);
  })
});
exports.CovidVaccineSymptomsStats = functions.runWith().pubsub.schedule('2 3 * * *').onRun(async(context) => {
  await new MyXMLHTTPRequest(new PubMedURLs().main_url).getSearchStatisticsByMonth(pubmedKeywords[1]).then(response => {
    console.log("Success!");
  }).catch(err => {
    console.log(err);
  })
});
exports.CovidVaccineSymptomsStats = functions.runWith().pubsub.schedule('4 3 * * *').onRun(async(context) => {
  await new MyXMLHTTPRequest(new PubMedURLs().main_url).getSearchStatisticsByMonth(pubmedKeywords[2]).then(response => {
    console.log("Success!");
  }).catch(err => {
    console.log(err);
  })
});
exports.CovidVaccineSymptomsStats = functions.runWith().pubsub.schedule('6 3 * * *').onRun(async(context) => {
  await new MyXMLHTTPRequest(new PubMedURLs().main_url).getSearchStatisticsByMonth(pubmedKeywords[3]).then(response => {
    console.log("Success!");
  }).catch(err => {
    console.log(err);
  })
});
exports.CovidVaccineSymptomsStats = functions.runWith().pubsub.schedule('8 3 * * *').onRun(async(context) => {
  await new MyXMLHTTPRequest(new PubMedURLs().main_url).getSearchStatisticsByMonth(pubmedKeywords[4]).then(response => {
    console.log("Success!");
  }).catch(err => {
    console.log(err);
  })
});
