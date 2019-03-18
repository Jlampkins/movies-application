//imports
import sayHello from './hello';
sayHello('World');

(function () {
"use strict";


    function searchMovie(movie) {
        let html ='';
        // let search = "https://api.themoviedb.org/3/search/movie?api_key=" + api_key + "&query=" + query;
        fetch("https://api.themoviedb.org/3/search/movie?api_key=" + api_key + "&query=" + movie)
            .then(function(response) { //data is the information you are fetching for.
                response.json()
                    .then(function(movies){
                        console.log(movies);


                        movies.results.forEach(function({title, vote_average, backdrop_path, poster_path, release_date, overview}) {
                            //     let postImage = poster_path;
                            //     for(let i = 0; i<= 19; i++) {
                            console.log(poster_path);
                            html += ("<div><img" + " src=" + "https://image.tmdb.org/t/p/w500" + poster_path + " " + "alt=" + 'movies' + "></div>");
                            // }
                            console.log(html);
                        }) // img src="path" alt="movies"
                        $("#movie-posters").html(html)
                        // $("#movie-posters").html += html;
                    })
            })
    }




    $("#search-btn").off().on("click", function(){
        let movie = $("#search").val();
        searchMovie(movie)
    });







// globals
const {getMovies} = require('./api.js');
let buttons = document.getElementsByClassName('remove');
let editButtons = document.getElementsByClassName('edit');
document.getElementById('submit').addEventListener('click', submit1);

// get movies
getMovies().then((movies) => {
  console.log('Here are all the movies:');
  let output = '<table class="table table-dark table-striped">\n' +
      '            <tr>\n' +
      '                <td>delete,edit</td>\n' +
      '                <td>Title:</td>\n' +
      '                <td>Rating:</td>\n' +
      '            </tr>\n' ;
  movies.forEach(({title, rating, id}) => {
    output += `
            <tr>
                <td>
                    <button class="btn btn-dark btn-outline-secondary remove" id="${id}">Delete</button>
                    <a class="edit" href="#editFrom"><button class="btn btn-dark btn-outline-secondary edit" id="${id}">Edit</button></a>
                </td>
                <td>${title}</td>
                <td>${rating}</td>
            </tr>
        `;
    document.getElementById('output').innerHTML = output;
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', remove);
    }
    for (let i = 0; i < editButtons.length; i++) {
          editButtons[i].addEventListener('click', populateEditForm);
    }
  }); output += '</table>'
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});

 // submit a movie
 function submit1(e) {
   e.preventDefault();
   let movie = document.getElementById('movie').value;
   let rating = document.getElementById('rating').value;

   let data = {
     title: movie,
     rating: rating
   };
     document.getElementById('movie').value = '';
     document.getElementById('rating').value = '';
   fetch('http://localhost:3000/movies', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(data)
   })
       .then((data) => {
         console.log('Request success: ', data);
       })
       .catch((error) => {
         console.log('Request failure: ', error);
       });

     setTimeout(reloadTheObjects, 500);
 }

// delete a movie
function remove(event) {
    fetch('http://localhost:3000/movies/' + event.target.id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

    setTimeout(reloadTheObjects, 500);
}

//re-populate Edit Form
function populateEditForm(event) {
    console.log(event.target);
    getMovies().then((movies) => {
        console.log(movies);
        document.getElementById('postFrom').innerHTML = output;
        for (let i = 0; i < movies.length; i++) {
            if (event.target.id == movies[i].id)
                document.getElementById('postFrom').innerHTML ='<br>' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>' +
                    '<div id="editFrom2">' +
                        '<div class="row">' +
                            '<div class="mx-auto">' +
                                '<form class="">' +
                                    '<label for="editMovie">' + 'Change title for: ' + movies[i].title + '</label>' +  '<br>' +
                                    '<input class="form-control" id="editMovie" placeholder=' + 'title' + '>' + '<br>' +
                                    '<label for="editRating">' + "Change current rating: " + movies[i].rating + '</label>' +  '<br>' +
                                    '<input class="form-control" id="editRating" placeholder=' + 'rating' + '>' +  '<br>' +
                                    '<input class="form-control" id="editId" type="hidden" value=' + movies[i].id + '>' + '<br>' +
                                    '<button class="btn" id="editPostSubmit" type="submit">Edit Movie</button>' + '<br><a class="mr-5" href="" id="backToAdd">back to add</a>' +
                                '</form>' +
                            '</div>' +
                        '</div>' +
                    '</div>'
        }
        document.getElementById("editPostSubmit").addEventListener('click', editMovieObjects);
        document.getElementById('backToAdd').addEventListener('click', backToAdd);
    })
}



//function back to add movie form
function backToAdd(e){
    e.preventDefault();
     let output = '';
     let post = document.getElementById('postFrom');

     output = `<div class="row">
            <div class="mx-auto"><br><br><br><br><br><br><br><br><br>
                <form class="form1" method="post" action="">
                    <div class="form-row">
                        <label  class="mx-auto" for="movie">Movie</label>
                        <input class="form-control" id='movie'>
                        <label class="mx-auto" for="rating">Rating</label>
                        <input class="form-control" id='rating'>
                    </div><br>
                    <a href="#target"><button class="btn" id="submit" type="submit">Add Movie</button></a>
                </form>
            </div>
        </div>`;

        post.innerHTML = output;
}

// reload function
function reloadTheObjects() {
    getMovies().then((movies) => {
        console.log('Here are all the movies:');
        let output = '<table class="table table-dark table-striped">\n' +
            '            <tr>\n' +
            '                <td>delete,edit</td>\n' +
            '                <td>Title:</td>\n' +
            '                <td>Rating:</td>\n' +
            '            </tr>\n' ;
        movies.forEach(({title, rating, id}) => {
            output += `
            <tr>
                <td>
                    <button class="btn btn-dark btn-outline-secondary remove" id="${id}">Delete</button>
                    <a class="edit" href="#editFrom"><button class="btn btn-dark btn-outline-secondary edit" id="${id}">Edit</button></a>
                </td>
                <td>${title}</td>
                <td>${rating}</td>
            </tr>
        `;
            document.getElementById('output').innerHTML = output;
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].addEventListener('click', remove);
            }
            for (let i = 0; i < editButtons.length; i++) {
                editButtons[i].addEventListener('click', populateEditForm);
            }
        }); output += '</table>'
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.')
        console.log(error);
    });
}

// edit function
function editMovieObjects(e) {
    console.log(e);
    e.preventDefault();
    let movie = document.getElementById('editMovie').value;
    let rating = document.getElementById('editRating').value;
    let id = document.getElementById('editId').value;

    console.log(movie);
    console.log(rating);
    console.log(id);

    let data = {
        title: movie,
        rating: rating
    };

    document.getElementById('editMovie').value = '';
    document.getElementById('editRating').value = '';

    fetch('http://localhost:3000/movies/' + id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    });

    setTimeout(reloadTheObjects, 500);
}

})();