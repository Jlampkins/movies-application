/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');


    let api_key = "d9da3de54d4606f9585acbfd5290ef64"
    let base_url = "http://api.themoviedb.org/3/";
    let images_url = "http://image.tmdb.org/t/p/";
    let url = "https://api.themoviedb.org/3/configuration?api_key=d9da3de54d4606f9585acbfd5290ef64";
    let timeout = 2000;
    let query = document.getElementById('movie').value;




// fetch(url)
//     .then(function(response) { //data is the information you are fetching for.
//        response.json()
//           .then(function (object) {
//         console.log(object.results);
//       })
//     });

function searchMovie(query) {
    let movie = ""
  // let search = "https://api.themoviedb.org/3/search/movie?api_key=" + api_key + "&query=" + query;
  fetch("https://api.themoviedb.org/3/search/movie?api_key=" + api_key + "&query=" + query)
      .then(function(response) { //data is the information you are fetching for.
        return response.json()
          .then(function(movies){
          movies.results.forEach(function({title, vote_average, backdrop_path, poster_path, release_date, overview}) {
              console.log(poster_path);
              movie += ("<img" + "src=" + poster_path + " " + "alt=" + 'movies' + ">");
              document.getElementById("movie-poster").innerHTML = movie
          })
          })
        })
      }



// document.getElementById('submit').addEventListener('click', submit1);

      document.getElementById("search-btn").addEventListener("click", function(e){
        let query = document.getElementById("search").value;

        searchMovie(query)
      });



      //.json() will return a js object that we can interact with.

    // .then((data) => { //now we can reach the data as an object
    //   console.log(data);
    //   return data.filter((event) =>{
    //     return event.type === "PushEvent";
    //   })
    // })
    // .then((data) => {
    //   console.log(data);
    //   return (data[0].created_at);
    // })

/**
 * require style imports
 */
const {getMovies} = require('./api.js');
let buttons = document.getElementsByClassName('remove');

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  var output = '';
  movies.forEach(({title, rating, id}) => {
    output += `<button class="remove" id="${id}">Delete</button>${title} - rating: ${rating}<br>`;
    document.getElementById('output').innerHTML = output;
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', remove);
    }
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});


 document.getElementById('submit').addEventListener('click', submit1);

 function submit1(e) {
   e.preventDefault();
   let movie = document.getElementById('movie').value;
   let rating = document.getElementById('rating').value;

   let data = {
     title: movie,
     rating: rating
   };
   fetch('http://localhost:3000/movies', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(data)
   })
       .then((data) => {
         reloaded();
         console.log('Request success: ', data);
       })
       .catch((error) => {
         console.log('Request failure: ', error);
       });
 }

 function reloaded() {
   fetch('http://localhost:3000/movies').then((response) => {
     let data = response.json().then((data) => {
       let output = '';
       for(let i = 0; i < data.length; i++) {
         output += data[i].title + ' ' + data[i].rating + '<br>';
       }
       document.getElementById('output').innerHTML = output;
     })
   })
 }



 function test () {
   console.log("test");
 }

function remove(event) {
    fetch('http://localhost:3000/movies/' + event.target.id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
}







