const { xml } = require('cheerio');
var firebase = require('firebase/app');
var firebase_auth = require('firebase/auth');
var firebase_tools = require('firebase-tools');
require('firebase/firestore')
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  

  firebaseConfig = {
    apiKey: "AIzaSyD5YuObpl_gksLoKErhPIc9CjdcCuxyWiU",
    authDomain: "covid-dashboard-10efe.firebaseapp.com",
    databaseURL: "https://covid-dashboard-10efe-default-rtdb.firebaseio.com",
    projectId: "covid-dashboard-10efe",
    storageBucket: "covid-dashboard-10efe.appspot.com",
    messagingSenderId: "933584669394",
    appId: "1:933584669394:web:b211b0c35649af42b1fb0b",
    measurementId: "G-XVWT1E6R8B"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("True");
    } else {
      // No user is signed in.
      console.log("False");
    }
  });
var db = firebase.firestore();
var covid_search_results = {"eSummaryResult":{"DocSum":[{"Id":["33858023"],"Item":[{"_":"2021 Apr","$":{"Name":"PubDate","Type":"Date"}},{"_":"2021 Apr 15","$":{"Name":"EPubDate","Type":"Date"}},{"_":"Rehabilitation (Stuttg)","$":{"Name":"Source","Type":"String"}},{"$":{"Name":"AuthorList","Type":"List"},"Item":[{"_":"Leibbrand B","$":{"Name":"Author","Type":"String"}},{"_":"Seifart U","$":{"Name":"Author","Type":"String"}}]},{"_":"Seifart U","$":{"Name":"LastAuthor","Type":"String"}},{"_":"[Oncological Rehabilitation and Development of Strategies in Crisis Situations Using the Example of the Covid 19 Pandemic in 2020 by Using a Patient and Staff Survey Results of Pandemic Care].","$":{"Name":"Title","Type":"String"}},{"_":"60","$":{"Name":"Volume","Type":"String"}},{"_":"2","$":{"Name":"Issue","Type":"String"}},{"_":"142-151","$":{"Name":"Pages","Type":"String"}},{"$":{"Name":"LangList","Type":"List"},"Item":[{"_":"German","$":{"Name":"Lang","Type":"String"}}]},{"_":"0401273","$":{"Name":"NlmUniqueID","Type":"String"}},{"_":"0034-3536","$":{"Name":"ISSN","Type":"String"}},{"_":"1439-1309","$":{"Name":"ESSN","Type":"String"}},{"$":{"Name":"PubTypeList","Type":"List"},"Item":[{"_":"Journal Article","$":{"Name":"PubType","Type":"String"}}]},{"_":"PubMed - indexed for MEDLINE","$":{"Name":"RecordStatus","Type":"String"}},{"_":"ppublish+epublish","$":{"Name":"PubStatus","Type":"String"}},{"$":{"Name":"ArticleIds","Type":"List"},"Item":[{"_":"33858023","$":{"Name":"pubmed","Type":"String"}},{"_":"10.1055/a-1361-5017","$":{"Name":"doi","Type":"String"}},{"_":"33858023","$":{"Name":"rid","Type":"String"}},{"_":"33858023","$":{"Name":"eid","Type":"String"}}]},{"_":"10.1055/a-1361-5017","$":{"Name":"DOI","Type":"String"}},{"$":{"Name":"History","Type":"List"},"Item":[{"_":"2021/04/15 20:30","$":{"Name":"entrez","Type":"Date"}},{"_":"2021/04/16 06:00","$":{"Name":"pubmed","Type":"Date"}},{"_":"2021/04/20 06:00","$":{"Name":"medline","Type":"Date"}}]},{"$":{"Name":"References","Type":"List"}},{"_":"1","$":{"Name":"HasAbstract","Type":"Integer"}},{"_":"0","$":{"Name":"PmcRefCount","Type":"Integer"}},{"_":"Die Rehabilitation","$":{"Name":"FullJournalName","Type":"String"}},{"_":"doi: 10.1055/a-1361-5017","$":{"Name":"ELocationID","Type":"String"}},{"_":"2021 Apr;60(2):142-151","$":{"Name":"SO","Type":"String"}}]},{"Id":["33857976"],"Item":[{"_":"2021 May 1","$":{"Name":"PubDate","Type":"Date"}},{"$":{"Name":"EPubDate","Type":"Date"}},{"_":"Anesth Analg","$":{"Name":"Source","Type":"String"}},{"$":{"Name":"AuthorList","Type":"List"},"Item":[{"_":"Saadat H","$":{"Name":"Author","Type":"String"}}]},{"_":"Saadat H","$":{"Name":"LastAuthor","Type":"String"}},{"_":"Effect of Inadequate Sleep on Clinician Performance.","$":{"Name":"Title","Type":"String"}},{"_":"132","$":{"Name":"Volume","Type":"String"}},{"_":"5","$":{"Name":"Issue","Type":"String"}},{"_":"1338-1343","$":{"Name":"Pages","Type":"String"}},{"$":{"Name":"LangList","Type":"List"},"Item":[{"_":"English","$":{"Name":"Lang","Type":"String"}}]},{"_":"1310650","$":{"Name":"NlmUniqueID","Type":"String"}},{"_":"0003-2999","$":{"Name":"ISSN","Type":"String"}},{"_":"1526-7598","$":{"Name":"ESSN","Type":"String"}},{"$":{"Name":"PubTypeList","Type":"List"},"Item":[{"_":"Journal Article","$":{"Name":"PubType","Type":"String"}}]},{"_":"PubMed - in process","$":{"Name":"RecordStatus","Type":"String"}},{"_":"ppublish","$":{"Name":"PubStatus","Type":"String"}},{"$":{"Name":"ArticleIds","Type":"List"},"Item":[{"_":"33857976","$":{"Name":"pubmed","Type":"String"}},{"_":"10.1213/ANE.0000000000005369","$":{"Name":"doi","Type":"String"}},{"_":"00000539-202105000-00021","$":{"Name":"pii","Type":"String"}},{"_":"33857976","$":{"Name":"rid","Type":"String"}},{"_":"33857976","$":{"Name":"eid","Type":"String"}}]},{"_":"10.1213/ANE.0000000000005369","$":{"Name":"DOI","Type":"String"}},{"$":{"Name":"History","Type":"List"},"Item":[{"_":"2021/04/15 20:30","$":{"Name":"entrez","Type":"Date"}},{"_":"2021/04/16 06:00","$":{"Name":"pubmed","Type":"Date"}},{"_":"2021/04/16 06:00","$":{"Name":"medline","Type":"Date"}}]},{"$":{"Name":"References","Type":"List"}},{"_":"1","$":{"Name":"HasAbstract","Type":"Integer"}},{"_":"0","$":{"Name":"PmcRefCount","Type":"Integer"}},{"_":"Anesthesia and analgesia","$":{"Name":"FullJournalName","Type":"String"}},{"_":"doi: 10.1213/ANE.0000000000005369","$":{"Name":"ELocationID","Type":"String"}},{"_":"2021 May 1;132(5):1338-1343","$":{"Name":"SO","Type":"String"}}]},{"Id":["33857958"],"Item":[{"_":"2021 May 1","$":{"Name":"PubDate","Type":"Date"}},{"$":{"Name":"EPubDate","Type":"Date"}},{"_":"Anesth Analg","$":{"Name":"Source","Type":"String"}},{"$":{"Name":"AuthorList","Type":"List"},"Item":[{"_":"Meleties A","$":{"Name":"Author","Type":"String"}},{"_":"Morikawa N","$":{"Name":"Author","Type":"String"}},{"_":"Tanaka CY","$":{"Name":"Author","Type":"String"}},{"_":"Choice C","$":{"Name":"Author","Type":"String"}},{"_":"Berger J","$":{"Name":"Author","Type":"String"}}]},{"_":"Berger J","$":{"Name":"LastAuthor","Type":"String"}},{"_":"Lessons Learned From the Rapid Expansion of Intensive Care Unit Care to the Operating Room During the Coronavirus Disease 2019 Pandemic.","$":{"Name":"Title","Type":"String"}},{"_":"132","$":{"Name":"Volume","Type":"String"}},{"_":"5","$":{"Name":"Issue","Type":"String"}},{"_":"1179-1181","$":{"Name":"Pages","Type":"String"}},{"$":{"Name":"LangList","Type":"List"},"Item":[{"_":"English","$":{"Name":"Lang","Type":"String"}}]},{"_":"1310650","$":{"Name":"NlmUniqueID","Type":"String"}},{"_":"0003-2999","$":{"Name":"ISSN","Type":"String"}},{"_":"1526-7598","$":{"Name":"ESSN","Type":"String"}},{"$":{"Name":"PubTypeList","Type":"List"},"Item":[{"_":"Comment","$":{"Name":"PubType","Type":"String"}},{"_":"Editorial","$":{"Name":"PubType","Type":"String"}}]},{"_":"PubMed - indexed for MEDLINE","$":{"Name":"RecordStatus","Type":"String"}},{"_":"ppublish","$":{"Name":"PubStatus","Type":"String"}},{"$":{"Name":"ArticleIds","Type":"List"},"Item":[{"_":"33857958","$":{"Name":"pubmed","Type":"String"}},{"_":"10.1213/ANE.0000000000005497","$":{"Name":"doi","Type":"String"}},{"_":"00000539-202105000-00001","$":{"Name":"pii","Type":"String"}},{"_":"33857958","$":{"Name":"rid","Type":"String"}},{"_":"33857958","$":{"Name":"eid","Type":"String"}}]},{"_":"10.1213/ANE.0000000000005497","$":{"Name":"DOI","Type":"String"}},{"$":{"Name":"History","Type":"List"},"Item":[{"_":"2021/04/15 20:30","$":{"Name":"entrez","Type":"Date"}},{"_":"2021/04/16 06:00","$":{"Name":"pubmed","Type":"Date"}},{"_":"2021/04/22 06:00","$":{"Name":"medline","Type":"Date"}}]},{"$":{"Name":"References","Type":"List"},"Item":[{"_":"Anesth Analg. 2021 May 1;132(5):1182-1190. PMID: 33136661","$":{"Name":"Comment on","Type":"String"}}]},{"_":"0","$":{"Name":"HasAbstract","Type":"Integer"}},{"_":"0","$":{"Name":"PmcRefCount","Type":"Integer"}},{"_":"Anesthesia and analgesia","$":{"Name":"FullJournalName","Type":"String"}},{"_":"doi: 10.1213/ANE.0000000000005497","$":{"Name":"ELocationID","Type":"String"}},{"_":"2021 May 1;132(5):1179-1181","$":{"Name":"SO","Type":"String"}}]},{"Id":["33857940"],"Item":[{"_":"2021 Apr 15","$":{"Name":"PubDate","Type":"Date"}},{"_":"2021 Apr 15","$":{"Name":"EPubDate","Type":"Date"}},{"_":"Blood Purif","$":{"Name":"Source","Type":"String"}},{"$":{"Name":"AuthorList","Type":"List"},"Item":[{"_":"Peerapornratana S","$":{"Name":"Author","Type":"String"}},{"_":"Sirivongrangson P","$":{"Name":"Author","Type":"String"}},{"_":"Tungsanga S","$":{"Name":"Author","Type":"String"}},{"_":"Tiankanon K","$":{"Name":"Author","Type":"String"}},{"_":"Kulvichit W","$":{"Name":"Author","Type":"String"}},{"_":"Putcharoen O","$":{"Name":"Author","Type":"String"}},{"_":"Kellum JA","$":{"Name":"Author","Type":"String"}},{"_":"Srisawat N","$":{"Name":"Author","Type":"String"}}]},{"_":"Srisawat N","$":{"Name":"LastAuthor","Type":"String"}},{"_":"Endotoxin Adsorbent Therapy in Severe COVID-19 Pneumonia.","$":{"Name":"Title","Type":"String"}},{"$":{"Name":"Volume","Type":"String"}},{"$":{"Name":"Issue","Type":"String"}},{"_":"1-8","$":{"Name":"Pages","Type":"String"}},{"$":{"Name":"LangList","Type":"List"},"Item":[{"_":"English","$":{"Name":"Lang","Type":"String"}}]},{"_":"8402040","$":{"Name":"NlmUniqueID","Type":"String"}},{"_":"0253-5068","$":{"Name":"ISSN","Type":"String"}},{"_":"1421-9735","$":{"Name":"ESSN","Type":"String"}},{"$":{"Name":"PubTypeList","Type":"List"},"Item":[{"_":"Journal Article","$":{"Name":"PubType","Type":"String"}}]},{"_":"PubMed - as supplied by publisher","$":{"Name":"RecordStatus","Type":"String"}},{"_":"aheadofprint","$":{"Name":"PubStatus","Type":"String"}},{"$":{"Name":"ArticleIds","Type":"List"},"Item":[{"_":"33857940","$":{"Name":"pubmed","Type":"String"}},{"_":"000515628","$":{"Name":"pii","Type":"String"}},{"_":"10.1159/000515628","$":{"Name":"doi","Type":"String"}},{"_":"33857940","$":{"Name":"rid","Type":"String"}},{"_":"33857940","$":{"Name":"eid","Type":"String"}}]},{"_":"10.1159/000515628","$":{"Name":"DOI","Type":"String"}},{"$":{"Name":"History","Type":"List"},"Item":[{"_":"2020/08/18 00:00","$":{"Name":"received","Type":"Date"}},{"_":"2021/03/02 00:00","$":{"Name":"accepted","Type":"Date"}},{"_":"2021/04/15 20:29","$":{"Name":"entrez","Type":"Date"}},{"_":"2021/04/16 06:00","$":{"Name":"pubmed","Type":"Date"}},{"_":"2021/04/16 06:00","$":{"Name":"medline","Type":"Date"}}]},{"$":{"Name":"References","Type":"List"}},{"_":"1","$":{"Name":"HasAbstract","Type":"Integer"}},{"_":"0","$":{"Name":"PmcRefCount","Type":"Integer"}},{"_":"Blood purification","$":{"Name":"FullJournalName","Type":"String"}},{"_":"doi: 10.1159/000515628","$":{"Name":"ELocationID","Type":"String"}},{"_":"2021 Apr 15;:1-8","$":{"Name":"SO","Type":"String"}}]},{"Id":["33857916"],"Item":[{"_":"2021 Apr 2","$":{"Name":"PubDate","Type":"Date"}},{"_":"2021 Apr 2","$":{"Name":"EPubDate","Type":"Date"}},{"_":"J Mycol Med","$":{"Name":"Source","Type":"String"}},{"$":{"Name":"AuthorList","Type":"List"},"Item":[{"_":"Khatri A","$":{"Name":"Author","Type":"String"}},{"_":"Chang KM","$":{"Name":"Author","Type":"String"}},{"_":"Berlinrut I","$":{"Name":"Author","Type":"String"}},{"_":"Wallach F","$":{"Name":"Author","Type":"String"}}]},{"_":"Wallach F","$":{"Name":"LastAuthor","Type":"String"}},{"_":"Mucormycosis after Coronavirus disease 2019 infection in a heart transplant recipient - Case report and review of literature.","$":{"Name":"Title","Type":"String"}},{"_":"31","$":{"Name":"Volume","Type":"String"}},{"_":"2","$":{"Name":"Issue","Type":"String"}},{"_":"101125","$":{"Name":"Pages","Type":"String"}},{"$":{"Name":"LangList","Type":"List"},"Item":[{"_":"English","$":{"Name":"Lang","Type":"String"}}]},{"_":"9425651","$":{"Name":"NlmUniqueID","Type":"String"}},{"_":"1156-5233","$":{"Name":"ISSN","Type":"String"}},{"_":"1773-0449","$":{"Name":"ESSN","Type":"String"}},{"$":{"Name":"PubTypeList","Type":"List"}},{"_":"PubMed - as supplied by publisher","$":{"Name":"RecordStatus","Type":"String"}},{"_":"aheadofprint","$":{"Name":"PubStatus","Type":"String"}},{"$":{"Name":"ArticleIds","Type":"List"},"Item":[{"_":"33857916","$":{"Name":"pubmed","Type":"String"}},{"_":"S1156-5233(21)00015-9","$":{"Name":"pii","Type":"String"}},{"_":"10.1016/j.mycmed.2021.101125","$":{"Name":"doi","Type":"String"}},{"_":"PMC8017948","$":{"Name":"pmc","Type":"String"}},{"_":"33857916","$":{"Name":"rid","Type":"String"}},{"_":"33857916","$":{"Name":"eid","Type":"String"}},{"_":"pmc-id: PMC8017948;","$":{"Name":"pmcid","Type":"String"}}]},{"_":"10.1016/j.mycmed.2021.101125","$":{"Name":"DOI","Type":"String"}},{"$":{"Name":"History","Type":"List"},"Item":[{"_":"2020/12/15 00:00","$":{"Name":"received","Type":"Date"}},{"_":"2021/02/22 00:00","$":{"Name":"revised","Type":"Date"}},{"_":"2021/02/23 00:00","$":{"Name":"accepted","Type":"Date"}},{"_":"2021/04/16 06:00","$":{"Name":"pubmed","Type":"Date"}},{"_":"2021/04/16 06:00","$":{"Name":"medline","Type":"Date"}},{"_":"2021/04/15 20:28","$":{"Name":"entrez","Type":"Date"}}]},{"$":{"Name":"References","Type":"List"}},{"_":"1","$":{"Name":"HasAbstract","Type":"Integer"}},{"_":"0","$":{"Name":"PmcRefCount","Type":"Integer"}},{"_":"Journal de mycologie medicale","$":{"Name":"FullJournalName","Type":"String"}},{"_":"doi: 10.1016/j.mycmed.2021.101125","$":{"Name":"ELocationID","Type":"String"}},{"_":"2021 Apr 2;31(2):101125","$":{"Name":"SO","Type":"String"}}]}]}};
console.log(covid_search_results);
db.collection("covid_pubmed_search").add(covid_search_results);

  /*
  db.collection("covid_pubmed_search") {
    eSummaryResult = obj.eSummaryResult;
    DocSum = obj.DocSum;
    Id = obj.Id;
    Item = obj.Item;
    Name = obj.Name;
    PubDate = obj.PubDate;
    Type = obj.PubDate;
    date = obj.Date;
    string = obj.String;
    */ 