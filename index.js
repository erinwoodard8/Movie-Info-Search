var display = function (response) {  //This function is responsible for displaying all of the results into their respective containers
    let movieDetails = JSON.parse(response); //turns web server data from a string to a JS object


    let movieImageUrl = movieDetails["image"];
    let movieTitle = movieDetails["title"];
    let movieYear = movieDetails["year"];
    let movieTime = movieDetails["runtimeMins"];
    let movieDirectors = movieDetails["directors"];
    let movieWriters = movieDetails["writers"];
    let movieStars = movieDetails["stars"];
    let movieGenres = movieDetails["genres"];
    let moviePlot = movieDetails["plot"];
    let movieRating = movieDetails["contentRating"];

    document.getElementById("imageBox").innerHTML = "<img src=\"" + movieImageUrl + "\"></img>";
    document.getElementById("titleBox").innerHTML = movieTitle + " "+ "("+ movieYear +")";
    document.getElementById("timeBox").innerHTML = movieTime + "mins";


    document.getElementById("directorsBox").innerHTML = movieDirectors;
    document.getElementById("writersBox").innerHTML = movieWriters;
    document.getElementById("starsBox").innerHTML =  movieStars;
    document.getElementById("genresBox").innerHTML =  movieGenres;
    document.getElementById("plotBox").innerHTML =  moviePlot;
    document.getElementById("ratingBox").innerHTML = movieRating;



};


var myResults = function (response) {
    let apiResp = JSON.parse(response); //turns web server data from a string to a JS object
    let resultArr = apiResp["results"]; //results are returned as an array

    if (resultArr.length > 0) { //if the return contains results, execute the code. When it doesn't return anything the array.length = 0
        document.getElementById("error").setAttribute("class", "hide"); //hides error message   
        document.getElementById("resultBox").setAttribute("class", ""); // unhides the results


        let movieId = resultArr[0]["id"]; //takes the id value from the search() response of the item at position 0
        let detailsReq = new XMLHttpRequest(); //creating a new http request to send to the movie api

        detailsReq.open('GET', 'https://imdb-api.com/en/API/Title/k_7mrq9eci/' + movieId, true); //request to the api using the id value 

        detailsReq.onload = function () {
            if (detailsReq.status == 200) { //make sure the request was successful
                display(this.responseText); //executes display function and passes the responseText of this request as arguments
            } else {
                document.getElementById("error").innerHTML = "Results not found"; //this else statement is for when the request was unsuccessful

            }
        }
        detailsReq.send();
        
    } else {
        //this else statment is for when the array is =< 0
        document.getElementById("error").innerHTML = "Results not found";
        document.getElementById("error").setAttribute("class", ""); //clears the class of hide so that the error message can appear
        document.getElementById("resultBox").setAttribute("class", "hide"); //hides the results if there were results previously on the page
    }
}



// This function is used to search for the movie title so that I may get the id in the return in order to use in the myResults().

function search() {
    let idRequest = new XMLHttpRequest();
    let title = document.getElementById("searchBar").value;

    title = encodeURIComponent(title);  // encodeURICompoment will allow the title to be added to the HTTPS request because spaces can't exist

    document.getElementById("searchBar").value = "";  // clears the search bar


    idRequest.open('GET', 'https://imdb-api.com/en/API/SearchMovie/k_7mrq9eci/' + title, true);  // requesting the movie title from the api so I can get the id

    idRequest.onload = function () {
        
        if (idRequest.status == 200) {
            myResults(this.responseText); //executes the myResults() using the response of the idRequest request.
        } else {
            document.getElementById('error').innerHTML = "Results not found"; //error message fo if this request was unsuccessful 


        }

    }

    idRequest.send();
}
document.getElementById("searchBar").addEventListener("keydown", function (event) { //Allows you to submit the value of the searchBar using the enter key.
    if (event.keyCode === 13) {
      search();
    }
  });

