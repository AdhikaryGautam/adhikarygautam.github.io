let userInput = document.querySelector('#search');
let searchBtn = document.querySelector('.btn');
let body = document.querySelector('body');
let searchText = document.querySelector('.searchText');
let row = document.querySelector('.cardRow');
let movieText = document.querySelector('.movieText');

//===================================
// Update the content of movie details
//===================================

let imgDetail = document.querySelector('.imgDetail');
let movieTitle = document.querySelector('.movieTitle');
let date = document.querySelector('.date');
let movieLength = document.querySelector('.movieLength');
let genre = document.querySelector('.genre');
let plot = document.querySelector('.plot');
let number = document.querySelector('.number');

let displayContent = function(returnedVal,i){
    toggleCard();
    toggleContainer();
    secondRequest(returnedVal[i].imdbID);
}


//==============================
// Switch Container based on data
//==============================

let cardContainer = document.querySelector('.card-container');
let contentContainer = document.querySelector('.content-container');


let toggleCard = function(){
    if (cardContainer.classList.contains('d-none'))
    {
        searchText.classList.remove('d-none');
        movieText.classList.remove('d-none');
        cardContainer.classList.remove('d-none');
    }
    else{
        movieText.classList.add('d-none');
        searchText.classList.add('d-none');
        cardContainer.classList.add('d-none');
    }
}
let displayCard = function(){
    if (cardContainer.classList.contains('d-none'))
    {
        searchText.classList.remove('d-none');
        movieText.classList.remove('d-none');
        cardContainer.classList.remove('d-none');
    }
};
let toggleContainer = function(){
    if (contentContainer.classList.contains('d-none'))
    {
        contentContainer.classList.remove('d-none');
    }
    else{
        contentContainer.classList.add('d-none');
    }
}

cardContainer.classList.add('d-none');
contentContainer.classList.add('d-none');

//==============================
// Add fetched movies to the list
//==============================

let button = [];

let dataProcess = function(data){
    displayCard();
    contentContainer.classList.add('d-none');
    receivedDetails = data.Search;
    const returnedVal = data.Search;
    returnedVal.forEach((el,index) => {
        let mainDiv = document.createElement('div');
        let img = document.createElement('img');
        let paragraph = document.createElement('p');
        button[index] = document.createElement('button');

        img.className='card-img-top';
        img.alt = 'Some text';
        img.src = el.Poster;

        paragraph.textContent = el.Title;
        paragraph.className = 'text-center my-3';

        button[index].textContent = 'See More';

        mainDiv.appendChild(img);
        mainDiv.appendChild(paragraph);
        mainDiv.appendChild(button[index]);
        mainDiv.className = 'main h-100';

        let column = document.createElement('div');
        column.className = 'col-12 col-md-6 col-lg-4 mt-4';

        column.appendChild(mainDiv);

        row.appendChild(column);
    });
    searchText.classList.add('d-none');
    button.forEach((el,index)=>{
        el.addEventListener('click',()=>{
            displayContent(returnedVal,index);
        });
    });
}


//===================
// Request data to API
//===================


userInput.addEventListener('keyup',(event)=>{
    if(event.key==='Enter'){
        button.length = 0;
        row.innerHTML = null;
        if(button.length!=0){
            button.length=0;
        }
        let userValue = userInput.value;
        movieText.textContent = `Movies related to ${userValue}`;
        const api = `https://www.omdbapi.com/?s=${userValue}&apikey=5b0d2165`;
        console.log(api);
        fetch(api)
        .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
            return response.json();
            } else {
            throw Error(response.statusText);
            }
        })
        .then((data) => {
            console.log(data);
            


            let myPromise = new Promise(function(myResolve, myReject) {
                if(data.Response==='True'){           
                    myResolve(data); // when successful
                }
                else{
                    myReject();  // when error
                }
            });
            
            // "Consuming Code" (Must wait for a fulfilled Promise)
            myPromise.then(
                function(value) {
                    dataProcess(value);
                },
                function(error) { 
                    alert('Please enter a valid movie name');
                }
            );



            // dataProcess (data);
        }).catch((error) => {
            console.log(error);
        });
        userInput.value = '';
    }
});






//===============================
//SEND ANOTHER REQUEST TO THE API
//===============================

let secondRequest = function(userValue){
    const api = `https://www.omdbapi.com/?i=${userValue}&apikey=5b0d2165`;
    console.log(api);
    fetch(api)
    .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
        return response.json();
        } else {
        throw Error(response.statusText);
        }
    })
    .then((data) => {
        secondDataProcess (data);
        // console.log(data);
    }).catch((error) => {
        console.log(error);
    });
    userInput.value = '';
}

let secondDataProcess = function(data){
    imgDetail.src = data.Poster;
    movieTitle.textContent = data.Title;
    date.textContent = data.Year;    
    movieLength.textContent = data.Runtime;
    genre.textContent = data.Genre;
    plot.textContent = data.Plot;
    number.textContent = data.imdbRating;
}

