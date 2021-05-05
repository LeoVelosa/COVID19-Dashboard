const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://www.google.com/search?sxsrf=ALeKk01p-6H2nIZYsEs-Dfwiq1ucQ4Wtwg:1620240981977&q=COVID-19&si=AHBsk9vsNMN-5CnKWo3cqxYPWtR4rSuwLYnEEZdxxTCy9atbcIAIuYDq5ucrVvmQU502waZdHLZaapPcpHI_0RXD_QY_aZN1eUJ1WPO0rXG039qFdJ9xJrA%3D&biw=768&bih=720#wptab=s:H4sIAAAAAAAAAONgVuLVT9c3NMwySk6OL8zJecTozS3w8sc9YSmnSWtOXmO04eIKzsgvd80rySypFNLjYoOyVLgEpVB1ajBI8XOhCvHsYuL2SE3MKckILkksKV7EKpicX5Sfl1iWWVRarFAMEgMAoubRkIEAAAA';
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
            p.push($(html).html());//.replace(/\s\s/g,""));
            
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