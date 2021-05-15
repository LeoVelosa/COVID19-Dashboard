/**
 * Deprecated. See pulling_pubmed.js for the pulling pubmed.
 * @author Melanie McCord.
 * */
require('./read_httpxml.js');
class getSearchResultFromPubMed {
    constructor() {
        // The main search url from PubMed.
        this.pubMedXMLrequests = MyXMLHTTPRequest("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/");
    }
    // gets the IDs for the search results from the lit covid database
    getIDsforSearchResultsLitCovid(keyword) {
        return this.getIDsforSearchResults(keyword, "LitCovid");
    }
    getIDsforSearchResults(keyword, database) {
        IDsXMLRequest = this.pubMedXMLrequests.makeSearchQuest('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=' + database + '&term=' + keyword)
        return IDsXMLRequest.responseText;
    }
    // searches for a keyword in the default database (in this case, LitCovid)
    searchforKeyWord(keyword) {
        sub_url_for_searching = "esearch.fcgi?db=LitCovid&term=<query>&usehistory=y"
    }
}
