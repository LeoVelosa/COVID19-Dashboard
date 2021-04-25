var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xml2js = require('xml2js');
var fs = require('fs');

// default class for making generalized xml http requests
class MyXMLHTTPRequest {
    // Sets the default main url (i.e., the place where you get the main database)
    constructor(main_url) {
        this.main_url = main_url;
        this.pubmedUrls = new PubMedURLs();
    };
    // Creates a xml http request based on a url
    // params: sub_url, the sub category (i.e. if main_url is sample.com, then the additional results would be "keyword=34/")
    makeSearchQuest(sub_url) {
        const xhr = new XMLHttpRequest(),
            method = "GET",
            responseType = "document";
        var url = this.main_url + sub_url;
        xhr.open(method, url, false);
        xhr.onload = function() {
            var myDocParser = new DocumentParsers();
            var ids = myDocParser.getIDs(myDocParser.getTextFromXMLHTTPResponse(xhr));
            console.log("Ids", ids);
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
        };
        xhr.send();
    }
    // From a list of search ids gotten from search request, gets the ids for the search result.
    getSearchResults(id_list) {
        const xhr = new XMLHttpRequest(),
            method = "GET",
            responseType = "document";
        var url = this.pubmedUrls.downloadResultFromIDList(id_list, "pubmed");
        xhr.open(method, url, false);
        xhr.onload = function() {
            var my_xml_text = xhr.responseText;
            console.log(my_xml_text);
            new ReadingAndWritingFiles().writeToAnXMLFile(my_xml_text, "search_results.xml");
            console.log(new XMLToJSONParser().parseXml(my_xml_text));
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
    getIDs(my_string) {
        // Create a re object to find the numbers with 8 digits
        let re = /\d{8}/g;
        var numbersFromString = Array.from(my_string.match(re));
        var count = 0;
        var ids = [];
        for (var i = 0; i < numbersFromString.length; i++) {
            var num = numbersFromString[i];
            // If this is a valid id
            if (String(num).startsWith("33")) {
                ids[count] = num;
                count += 1;
            }
            if (count >= 5) {
                break;
            }
        }
        var myFileWriter = new ReadingAndWritingFiles().writeToaFile(ids);
        return ids;
    }
    getTextFromXMLHTTPResponse(xmlhttp){
        console.log("Response text", xmlhttp);
        var txt=xmlhttp.responseText + "";
        txt.replace(/<&#91;^>&#93;*>/g, "");
        //Convert txt into a string so that I can use it
        console.log("Text", txt);
        return txt;
    }

    // given xml text, converts it to a .json
    xmlToJson(xml) {
        function parseXml(xml) {
            var dom = null;
            if (window.DOMParser) {
                try {
                    dom = (new DOMParser()).parseFromString(xml, "text/xml");
                }
                catch (e) { dom = null; }
            }
            else if (window.ActiveXObject) {
                try {
                    dom = new ActiveXObject('Microsoft.XMLDOM');
                    dom.async = false;
                    if (!dom.loadXML(xml)) // parse error ..

                        window.alert(dom.parseError.reason + dom.parseError.srcText);
                }
                catch (e) { dom = null; }
            }
            else
                alert("cannot parse xml string!");
            return dom;
        }
    };
}
class PubMedURLs {
    constructor() {
        this.main_url = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/';
    }
    getIDsforSearchResults(keyword, database) {
        return this.main_url + 'esearch.fcgi?db=' + database + '&term=' + keyword;
    }
    downloadResultFromIDList(id_list, database) {
        return this.main_url + 'esummary.fcgi?db=' + database + '&id=' + id_list;
    }
}

// Functions for reading and writing data
class ReadingAndWritingFiles {
    constructor() {

    }
    // given a file, reads data from it and returns the string array
    // filename = the name of a file stored in data
    readFromAFile(filename) {
        // default filename = data.txt
        filename = __dirname + "/" + filename;
        console.log("Filename", filename);

        try {
            const data = fs.readFileSync(filename, 'utf8')
            console.log("Data", data)
            var data_list = data.split(" ");
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
    // Given an array, writes each element to a file called data.txt
    writeArrayToaFile(my_arr, filename) {
        filename = __dirname + "/" + filename;
        var my_string = "";
        for (var i = 0; i < my_arr.length; i++) {
            my_string += String(my_arr[i]) + " ";
        }
        fs.writeFile("data.txt", my_string, function(err) {
            if (err) return console.log(err);
            console.log("Data > data.txt");
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
            xml2js.parseString(xml, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                    new ReadingAndWritingFiles().writeToaFile(JSON.stringify(result), "covid_search.json");
                }
            });
        });
    }

    processResult(result) {
        console.log("processResult: result: ", result);
        new ReadingAndWritingFiles().writeToaFile(result, "covid_search.json");
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
var my_list = new ReadingAndWritingFiles().readFromAFile("data.txt");
console.log("List of IDs", my_list);
var my_Urls = new PubMedURLs().downloadResultFromIDList(my_list, 'pubmed');
var covid_text = myPubMedSearchResults.getIDsforSearchResults("Covid-19", "pubmed");

*/
var my_list = new ReadingAndWritingFiles().readFromAFile("data.txt");
new MyXMLHTTPRequest().getSearchResults(my_list);