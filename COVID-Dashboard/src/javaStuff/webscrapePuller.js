async function getScrapes(firebase) {
    
    if(firebase.apps.length==0){
        //console.log(firebase.app.length);
        var firebaseConfigLeo = {
            apiKey: "AIzaSyD5YuObpl_gksLoKErhPIc9CjdcCuxyWiU",
            authDomain: "covid-dashboard-10efe.firebaseapp.com",
            projectId: "covid-dashboard-10efe",
            storageBucket: "covid-dashboard-10efe.appspot.com",
            messagingSenderId: "933584669394",
            appId: "1:933584669394:web:b211b0c35649af42b1fb0b",
            measurementId: "G-XVWT1E6R8B"
        };
        firebase.initializeApp(firebaseConfigLeo);
    }
    //firebase.initializeApp();
    
    const db = firebase.firestore();
    
    const card = document.getElementsByTagName("app-tabcard")[0];
    console.log(card);
    await db.collection('websites').get().then((data) => {
        data.docs.forEach(doc => {
            card.innerHTML += '<div>' + doc.data().text[0] + '</div>';
        })
    });
}