const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=<<YOUR_API_KEY>>&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=<<YOUR_API_KEY>>&query=';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Fetch initial movies
getMovies(API_URL);

async function getMovies(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
  } catch (err) {
    main.innerHTML = `<p class="error">Failed to fetch movies. Try again later.</p>`;
  }
}

function showMovies(movies) {
  main.innerHTML = '';

  if (movies.length === 0) {
    main.innerHTML = '<p class="error">No movies found.</p>';
    return;
  }

  movies.forEach(movie => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML = `
      <img src="${poster_path ? IMG_PATH + poster_path : 'https://via.placeholder.com/500x750'}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="movie-overview">
        <h3>Overview</h3>
        <p>${overview}</p>
      </div>
    `;

    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) return 'green';
  if (vote >= 5) return 'orange';
  return 'red';
}

// Search functionality
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm);
    search.value = '';
  } else {
    window.location.reload();
  }
});
