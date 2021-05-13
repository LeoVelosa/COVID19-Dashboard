const my_keywords = [
  'covid+vaccine',
  'covid+vaccine+symptoms',
  'covid+vaccine+immunological',
  'covid+vaccine+molecular+epidemiology',
  'covid+vaccine+clinical'
]
function convertSearchStatisticsIntoAGraph(firebase) {
  if (firebase.apps.length == 0) {
    //console.log(firebase.app.length);
    var firebaseConfig = {
      apiKey: "AIzaSyD5YuObpl_gksLoKErhPIc9CjdcCuxyWiU",
      authDomain: "covid-dashboard-10efe.firebaseapp.com",
      projectId: "covid-dashboard-10efe",
      storageBucket: "covid-dashboard-10efe.appspot.com",
      messagingSenderId: "933584669394",
      appId: "1:933584669394:web:b211b0c35649af42b1fb0b",
      measurementId: "G-XVWT1E6R8B"
    };
    firebase.initializeApp(firebaseConfig);
  }
 // Creates an array of arrays that will be used to get the keywords and search stats
  var tuple = [my_keywords]
  // For each keyword
  for (var k in my_keywords) {

  }
}
