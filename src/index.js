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
                <td><button class="btn btn-secondary remove" id="${id}">Delete</button></td>
                <td>${title}</td>
                <td>${rating}</td>
            </tr>
        </table>
        `;
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



