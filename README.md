# COVID19-Dashboard

Welcome to the COVID19-Dashboard! This is a dashboard that contains various forms of information relating to COVID Vaccines. This ranges from tweets about COVID vaccine availability in Florida counties to articles about COVID vaccines from PubMed. We made this dashboard because:
1. There is a lot of confusion surrounding COVID19 vaccines, ranging from what they do, to where to get them.
2. There is a lot of misinformation surrounding COVID19 vaccines
4. It can be incredibly difficult and tedious to find information about COVID19 vaccines
Our dashboard intends to solve these problems by hosting this information, with reliable and accurate resources, in one easy to find website. With a simple click of a button, you can now find all of the information you need.

# How was this made?
We used the following to make the website:
1. Angular
2. HTML
3. CSS
4. Typescript
5. Javascript
6. Firebase
7. Twitter API
8. Pubmed Entrez API

Most of our work is in the COVID-Dashboard file. In that file you will find many files. However, the main ones you will be looking at is src and functions.

# What is the src file?
The src file contains all the things used to make the website. It uses a mixture of html, css, javascript, typescript, and angular. The main files you would want to look at here is app and javaStuff.

## App file
App contains the html, css, and typescript of the website. App mostly contains either cards, graphs, or pages on the website. Pages will host multiple cards or a single website, and cards just hold some form of information. Cards will typically draw some form of information from somewhere, the most common place being firebase firestore. If a card or webpage is drawing data from somewhere (dynamically) you can look in the FILENAME.component.ts file, where there will be a declare function at the top of the page. This declare function is getting a function from a file in javaStuff and calling it from within the typescript file. The FILENAME.component.css contains CSS, which is what is used to format things on the page or card. FILENAME.component.html contains the HTML of the page, which is code which is used to make the page itself. FILENAME.component.spec.ts files are for unit tests for individual components. There are 15 individual files: avalibilityDropDownCard, card, eligibilityDropDownCard, jand-j, listof-comorbidities, moderna, nav, pfizer, publications, pubmed-drop-down-card, pubmeddata, pubmeddropdown, vaccine-page, vaccinedata, and vaccinetypedata.

### AvalibilityDropDownCard 
This is a card that has a drop down menu for the vaccine availability tweets in Florida counties. This is hosted on the vaccine-page. Drop down cards were made separately for formatting the drop down itself, as it wasn't working well by putting it into Card.
### Card
This is a generic card that we use to put whatever data in. This includes, tweets, graphs and youtube videos. This is a card that is hosted on vaccine-page and on publications.
### EligibilityDropDownCard
This is a card that has a drop down menu for the vaccine eligibility tweets in Florida counties. This is hosted on the vaccine-page. Drop down cards were made seperately for formatting the drop down itself, as it wasn't working well by putting it into Card.
### Jand-j
This is a page. More specifically, it hosts this link: https://www.cdc.gov/coronavirus/2019-ncov/vaccines/different-vaccines/janssen.html. As with all pages, it is on the Nav bar.
### Listof-comorbidities
This is a page. More specifically, it hosts this link:https://www.cdc.gov/coronavirus/2019-ncov/need-extra-precautions/people-with-medical-conditions.html. As with all pages, it is on the Nav bar.
### Moderna
This is a page. More specifically, it hosts this link: https://www.cdc.gov/coronavirus/2019-ncov/vaccines/different-vaccines/Moderna.html. As with all pages, it is on the Nav bar.
### Nav
A menu bar which hosts links to all other pages, so you can go between pages. Commonly referred to as the Nav bar.
### Pfizer
This is a page. More specifically, it hosts this link: https://www.cdc.gov/coronavirus/2019-ncov/vaccines/different-vaccines/Pfizer-BioNTech.html. As with all pages, it is on the Nav bar.
### Publications
This is a page which hosts the cards Pubmeddata and pubmeddropdown. As with all pages, it is on the Nav bar.
### Pubmed-drop-down-card
This is a prototype of pubmeddropdown. Not actually used in the final product.
### Pubmeddata
This hosts a graph which shows data relating to what words appear in PubMed articles. Is put in Card and is hosted on publications.
### Pubmeddropdown 
This is a card which contains articles about COVID from PubMed. This is hosted on publications. Drop down cards were made separately for formatting the drop down itself, as it wasn't working well by putting it into Card.
### Vaccine-page
This is a page which hosts various cards, including EligibilityDropDownCard, Card, Vaccinedata, Vaccinetypedata and AvalibilityDropDownCard. Has graphs, tweets, and a youtube video. This is the first page you see when you open up the website. As with all pages, it is on the Nav bar.
### Vaccinedata
This is a graph which contains information about how many people in the USA are vaccinated. Is put in Card and is hosted on vaccine-page.
### Vaccinetypedata
This is a graph which contains information about how many people have gotten which type of COVID vaccine. Is put in Card and is hosted on vaccine-page.


## JavaStuff
JavaStuff is a file that contains code that will get data from a place, commonly firebase, and is used in conjunction with the files in app to make a dynamic website. 

# What is the functions file?
Functions is the file which uploads functions to firebase functions. This contains only a few files, of which you will only need to know TwitterToFirestore.js and pulling_pubmed.js.
## TwitterToFirestore.js
TwitterToFirestore.js uses the Twit API to gather tweets from twitter and store them in firebase firestore, by using the Twit API in conjunction with Firebase.
## Pulling_pubmed.js
Pulling_pubmed.js Pubmed Entrez API to gather tweets from twitter and store them in firebase firestore, by using the Pubmed Entrez API API in conjunction with Firebase.

