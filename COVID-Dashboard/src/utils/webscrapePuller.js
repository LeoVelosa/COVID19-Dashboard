async function getScrapes(firebase) {
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

    const db = firebase.firestore();

    const cards = document.getElementsByClassName("tab-card mat-elevation-z4");

    var docs = await db.collection('websites').get().then((data) => {
        data.docs.forEach(doc => {
            cards.innerHTML += '<div>' + doc.data().text + '</div>';
        })
    })
}