const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://www.cdc.gov/coronavirus/2019-ncov/vaccines/different-vaccines/Pfizer-BioNTech.html';
const text = [];
var db;

class FirebaseLeo{

    constructor(){
        this.firebase = require("firebase/app");
        require("firebase/firestore");
        this.firebaseConfigLeo = {
            apiKey: "AIzaSyD5YuObpl_gksLoKErhPIc9CjdcCuxyWiU",
            authDomain: "covid-dashboard-10efe.firebaseapp.com",
            projectId: "covid-dashboard-10efe",
            storageBucket: "covid-dashboard-10efe.appspot.com",
            messagingSenderId: "933584669394",
            appId: "1:933584669394:web:b211b0c35649af42b1fb0b",
            measurementId: "G-XVWT1E6R8B"
        };

        this.firebase.initializeApp(this.firebaseConfigLeo);
    }
    getDB(){
        return this.firebase.firestore();
    }
}

class webscraper{
    
    constructor(){
        db = new FirebaseLeo().getDB();
    }

    async scrape(){
        await rp(url).then(function(html){
            text.push($('.col-md-6',html).text().replace(/\n/g,""));
            console.log(text);
            db.collection('websites').add({
                text: text
            })
        }).catch(function(err){
            console.log(err);
        })
    }
}
var w = new webscraper();
w.scrape();