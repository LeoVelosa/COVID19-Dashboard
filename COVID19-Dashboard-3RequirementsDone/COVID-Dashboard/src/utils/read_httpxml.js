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
        url = this.main_url + sub_url;

        xhr.open(method, url, true);
        xhr.onreadystatechange = function () {
        // In local files, status is 0 upon success in Mozilla Firefox
        if(xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status;
            if (status === 0 || (status >= 200 && status < 400)) {
            // The request has been completed successfully
            console.log(xhr.responseText);
            } else {
            // Oh no! There has been an error with the request!
            }
        }
    };
    xhr.send();
    return xhr.responseText;
    }
}