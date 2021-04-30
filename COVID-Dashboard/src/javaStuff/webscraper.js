const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://www.cdc.gov/coronavirus/2019-ncov/vaccines/different-vaccines/Pfizer-BioNTech.html';
let t = [];
const p = [];
const li = [];
const ul = [];
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
            //p.push($('.col-md-6',html).get(0));//.replace(/\s\s/g,""));
            //li.push($('li',html).text().trim());
            //ul.push($('ul',html).text().trim());
            //console.log(t);
            $('li',html).find('p').each(function (i,e) {
                p.push(e[i].text() + '\n');
            });
            
            console.log(p);
            /*
            db.collection('websites').add({
                text: p
            })
            */
        }).catch(function(err){
            console.log(err);
        })
    }
}
var w = new webscraper();
w.scrape();