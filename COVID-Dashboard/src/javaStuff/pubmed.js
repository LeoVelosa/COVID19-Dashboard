// var jssoup = require('jssoup');
 var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// default class for making generalized xml http requests
class MyXMLHTTPRequest {
    // Sets the default main url (i.e., the place where you get the main database)
    constructor(main_url) {
        this.main_url = main_url;
    };
    // Creates a xml http request based on a url
    // params: sub_url, the sub category (i.e. if main_url is sample.com, then the additional results would be "keyword=34/")
    makeSearchQuest(sub_url) {
        const xhr = new XMLHttpRequest(),
        method = "GET",
        responseType = "document";
        var url = this.main_url + sub_url;

        xhr.open(method, url, false);
        xhr.onreadystatechange = function () {
        // In local files, status is 0 upon success in Mozilla Firefox
        if(xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status;
            if (status === 0 || (status >= 200 && status < 400)) {
            // The request has been completed successfully
            console.log(xhr.keys);
            console.log(xhr.response.IdList);
            console.log(xhr.response.search_ids);
            } else {
            // Oh no! There has been an error with the request!
            }
        }
    };
    xhr.send();
    return xhr;
    }
}
class PubMedURLs {
    constructor() {
        this.main_url = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/';
    }
    idsforSearchResults(keyword, database) {
        my_url = this.pubMedXMLrequests.makeSearchQuest(this.main_url + database + '&term=' + keyword);
        ids = my_url.ids;
        return ids;
    }
}
class getSearchResultFromPubMed {
    constructor() {
        // The main search url from PubMed.
        this.pubMedXMLrequests = new MyXMLHTTPRequest("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/");
    }
    // gets the ids for search results from a particular database
    // default is pubmed
    getIDsforSearchResults(keyword, database, callback) {
        if (database == null) {
            database = "pubmed";
        }
        var my_url = this.pubMedXMLrequests.main_url + 'esearch.fcgi?db=' + database + '&term=' + keyword;
        console.log('url ' + my_url);
//      console.log(this.pubMedXMLrequests.makeSearchQuest('esearch.fcgi?db=' + database + '&term=' + keyword).UNSENT);
//      console.log(this.pubMedXMLrequests.makeSearchQuest('esearch.fcgi?db=' + database + '&term=' + keyword));
      return this.pubMedXMLrequests.makeSearchQuest('esearch.fcgi?db=' + database + '&term=' + keyword).responseText;
    }
    downloadResults(search_ids) {
        return this.pubMedXMLrequests.makeSearchQuest('efetch.fcgi?db=pubmed&id=' + search_ids + '&rettype=<retrieval_type>&retmode=<retrieval_mode>')
    }
}
myPubMedSearchResults = new getSearchResultFromPubMed();
covid_results = myPubMedSearchResults.getIDsforSearchResults("Covid", "pubmed");
console.log(covid_results);
