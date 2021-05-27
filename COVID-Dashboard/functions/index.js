const functions = require("firebase-functions");
exports.PubMed = require('./pulling_pubmed');
exports.PubMed.CovidVaccineSymptomsStats();
exports.PubMed.Papers();
exports.PubMed.CovidVaccineStats1();
exports.PubMed.CovidVaccineSymptomsStats2();
exports.PubMed.CovidVaccineSymptomsStats3();
exports.PubMed.CovidVaccineSymptomsStats4();
exports.PubMed.CovidVaccineSymptomsStats5();
exports.PubMed.Statistics();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
