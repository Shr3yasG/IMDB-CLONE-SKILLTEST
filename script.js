//API Key - 928d76cb
//URL - http://www.omdbapi.com/?i=tt3896198&apikey=928d76cb

const key ='928d76cb'

var searchInput = document.getElementById('search-bar')
var displaySearchList = document.getElementsByClassName('fav-container')

fetch('http://www.omdbapi.com/?i=tt3896198&apikey=928d76cb')
    .then(res => res.json())
    .then(data => console.log(data));

// event listner for search bar
searchInput.addEventListener('input', findMovies);

//When the user is searching for the movie then a list of the related movie will be displayed and that list is fetched
async function findMovies() {
    console.log('Searching for movies...');
    const url = `https://www.omdbapi.com/?s=${(searchInput.value).trim()}&page=1&apikey=${key}`
    console.log('API URL:', url);
    try {
        const res = await fetch(url);
        const data = await res.json();
        // console.log('API Response:', data);

        if (data.Search) {
            // Calling function to display the movies that are related to the user's search
            displayMovieList(data.Search);
        } else {
            console.log('No search results found.');
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}
  
  //Displaying the movie list on the search page according to the user list
  async function displayMovieList(movies) {
      var output = '';
      for (i of movies) {
  
          var img = '';
          if (i.Poster != 'N/A') {
              img = i.Poster;
          }
          else {
              img = 'assets/Blank-template.jpg';
          }
          var id = i.imdbID;
  
          //Appending the output 
          output += `
  
          <div class="fav-item">
              <div class="fav-poster">
              <a href="movie.html?id=${id}"><img src=${img} alt="Favourites Poster"></a>
              </div>
              <div class="fav-details">
                  <div class="fav-details-box">
                      <div>
                          <p class="fav-movie-name"><a href="movie.html?id=${id}">${i.Title}</a></p>
                          <p class="fav-movie-rating"><a href="movie.html?id=${id}">${i.Year}</a></p>
                      </div>
                      <div>
                          <i class="fa-solid fa-heart " title="Favourites" style="color: #ff051e" style="cursor:pointer" onClick=addTofavorites('${id}')></i>
                      </div>
                  </div>
              </div>
          </div>
  
         `
      }
      document.querySelector('.fav-container').innerHTML = output;
      console.log("here is movie list ..", movies);
  }
  
  
  //Favorites movies are loaded on to the fav page from localstorage
  async function favoritesMovieLoader() {

    var output = ''
    for (i in localStorage) {
        var id = localStorage.getItem(i);
        if (id != null) {
            //Fetching the movie through id 
            const url = `https://www.omdbapi.com/?i=${id}&plot=full&apikey=${key}`
            const res = await fetch(`${url}`);
            const data = await res.json();
            console.log(data);


            var img = ''
            if (data.Poster) {
                img = data.Poster
            }
            else { img = data.Title }
            var Id = data.imdbID;
            //Adding all the movie html in the output 
            output += `

        <div class="fav-item">
            <div class="fav-poster">
                <a href="movie.html?id=${id}"><img src=${img} alt="Favourites Poster"></a>
            </div>
            <div class="fav-details">
                <div class="fav-details-box">
                    <div>
                        <p class="fav-movie-name">${data.Title}</p>
                        <p class="fav-movie-rating">${data.Year} &middot; <span
                                style="font-size: 15px; font-weight: 600;">${data.imdbRating}</span>/10</p>
                    </div>
                    <div style="color: black">
                        <i class="fa-solid fa-trash" style="cursor:pointer;" title="Delete" onClick=removeFromfavorites('${Id}')></i>
                    </div>
                </div>
            </div>
        </div>

       `;
        }

    }
    document.querySelector('.fav-container').innerHTML = output;
}

async function addTofavorites(id) {
    console.log("fav-item", id);

    localStorage.setItem(Math.random().toString(36).slice(2, 7), id);// math.random for the unique key and value pair
    alert('Movie Added to Watchlist!');
}

//Removing the movie from the favorites list  
async function removeFromfavorites(id) {
    console.log(id);
    for (i in localStorage) {
        if (localStorage[i] == id) {
            localStorage.removeItem(i)
            break;
        }
    }
    alert('Movie Removed from Watchlist');
    window.location.replace('favorite.html');
}

// to remove all the favourites
async function removeAllFavorites() {
    try {
        localStorage.clear();
        location.reload();
        
        alert('All movies removed from Watchlist!');
    } catch (error) {
        console.error('Error removing favorites:', error);
        alert('An error occurred while removing favorites. Please try again.');
    }
}

async function singleMovie(){
    var urlQueryParams = new URLSearchParams(window.location.search);
    var id = urlQueryParams.get('id')
    console.log(id);
    const url = `https://www.omdbapi.com/?i=${id}&apikey=${key}`
    const res = await fetch(`${url}`);
    const data = await res.json();
    console.log(data); 
    console.log(url);
      var output = `

      <div class="movie-poster">
          <img src=${data.Poster} alt="Movie Poster">
      </div>
      <div class="movie-details">
          <div class="details-header">
              <div class="dh-ls">
                  <h2>${data.Title}</h2>
              </div>
              <div class="dh-rs">
              <i class="fa-solid fa-heart " style="color: #ff051e" title="Favourites" style="cursor:pointer" onClick=addTofavorites('${id}')></i>
              </div>
          </div>
          <span class="italics-text"><i>${data.Year} &#x2022; ${data.Country} &#x2022; Rating - <span
                      style="font-size: 18px; font-weight: 600;">${data.imdbRating}</span>/10 </i></span>
          <ul class="details-ul">
              <li><strong>Actors: </strong>${data.Actors}</li>
              <li><strong>Director: </strong>${data.Director}</li>
              <li><strong>Writers: </strong>${data.Writer}</li>
          </ul>
          <ul class="details-ul">
              <li><strong>Genre: </strong>${data.Genre}</li>
              <li><strong>Release Date: </strong>${data.DVD}</li>
              <li><strong>Box Office: </strong>${data.BoxOffice}</li>
              <li><strong>Movie Runtime: </strong>${data.Runtime}</li>
          </ul>
          <p style="font-size: 14px; margin-top:10px;">${data.Plot}</p>
          <p style="font-size: 15px; font-style: italic; color: #222; margin-top: 10px;">
              <i class="fa-solid fa-award"></i>
              &thinsp; ${data.Awards}
          </p>
      </div> 
      `
      // Appending the output
      document.querySelector('.movie-container').innerHTML = output
  
  }




