/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');
let buttons = document.getElementsByClassName('remove');
let editButtons = document.getElementsByClassName('edit');

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  var output = '';
  movies.forEach(({title, rating, id}) => {
    output += `
        <table class="table table-dark table-striped">
            <tr>
                <td>delete,edit</td>
                <td>title</td>
                <td>rating</td>
            </tr>
            <tr>
                <td>
                    <button class="btn btn-dark btn-outline-secondary remove" id="${id}">Delete</button>
                    <a class="edit" href="#editFrom"><button class="btn btn-dark btn-outline-secondary edit" id="${id}">Edit</button></a>
                </td>
                <td>${title}</td>
                <td>${rating}</td>
            </tr>
        </table>`;
    document.getElementById('output').innerHTML = output;
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', remove);
    }
    for (var i = 0; i < editButtons.length; i++) {
          editButtons[i].addEventListener('click', populateEditForm);
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
         console.log('Request success: ', data);
       })
       .catch((error) => {
         console.log('Request failure: ', error);
       });

     setTimeout(reloadTheObjects, 500);
 }

 // function reloaded() {
 //   fetch('http://localhost:3000/movies').then((response) => {
 //     let data = response.json().then((data) => {
 //       let output = '';
 //       for(let i = 0; i < data.length; i++) {
 //         output += data[i].title + ' ' + data[i].rating + '<br>';
 //       }
 //       document.getElementById('output').innerHTML = output;
 //     })
 //   })
 // }

function remove(event) {
    fetch('http://localhost:3000/movies/' + event.target.id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

    setTimeout(reloadTheObjects, 500);
}


function populateEditForm(event) {
    console.log(event.target);
    let html = '';
    getMovies().then((movies) => {
        console.log(movies);
        var output = '';
        document.getElementById('postFrom').innerHTML = output;
        for (let i = 0; i < movies.length; i++) {
            if (event.target.id == movies[i].id)
                document.getElementById('postFrom').innerHTML ='<br>' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>' + '<br>' +
                    '<div class="container">' +
                        '<div class="row">' +
                            '<div class="mx-auto">' +
                                '<form class="form-control">' +
                                    '<label for="editMovie">' + 'Change title for: ' + movies[i].title + '</label>' +  '<br>' +
                                    '<input class="form-control" id="editMovie" placeholder=' + 'title' + '>' + '<br>' +
                                    '<label for="editRating">' + "Change current rating: " + movies[i].rating + '</label>' +  '<br>' +
                                    '<input class="form-control" id="editRating" placeholder=' + 'rating' + '>' +  '<br>' +
                                    '<input class="form-control" id="editId" type="hidden" value=' + movies[i].id + '>' + '<br>' +
                                    '<input class="form-control" id="editPostSubmit" type="submit">' +
                                '</form>' +
                            '</div>' +
                        '</div>' +
                    '</div>'
        }
        document.getElementById("editPostSubmit").addEventListener('click', editMovieObjects);


    })
}


function reloadTheObjects() {
    getMovies().then((movies) => {
        console.log('Here are all the movies:');
        var output = '';
        movies.forEach(({title, rating, id}) => {
            output += `<button class="edit" id="${id}">Edit</button><button class="remove" id="${id}">Delete</button>${title} - rating: ${rating}<br>`;
            document.getElementById('output').innerHTML = output;
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].addEventListener('click', remove);
            }
            for (var i = 0; i < editButtons.length; i++) {
                editButtons[i].addEventListener('click', populateEditForm);
            }
        });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.')
        console.log(error);
    });
}

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
    fetch('http://localhost:3000/movies/' + id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    });

    setTimeout(reloadTheObjects, 500);
}

