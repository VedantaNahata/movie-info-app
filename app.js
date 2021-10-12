let displayOutput = document.querySelector(".movie-background");
let formMovies = document.querySelector(".form-movies");
let movieName = document.getElementById("movie-name");
formMovies.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchText = document.getElementById("movie-name").value;
  fetch(`http://www.omdbapi.com/?t=` + searchText + `&apikey=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      let movieElement = document.createElement("div");
      movieElement.classList.add("movie-styling");
      displayOutput.appendChild(movieElement);
      const icon = data.Poster;
      let movieDetails;
      movieDetails = `
        <img src="${icon} class="poster-img">
        <h1>${data.Title}</h1>
        <span>
        <p><b>Actors: </b>${data.Actors}</p>
        <p><b>Genre: </b>${data.Genre}</p>
        <p><b>Director: </b>${data.Director}</p>
        <p><b>Language: </b>${data.Language}</p>
        <p><b>Release Date: </b>${data.Released}</p>
        <p><b>Duration: </b>${data.Runtime}</p>
        <p><b>Rating: </b>${data.imdbRating}
        <p><b>Story: </b>${data.Plot}
        </span>
    `;
      movieElement.innerHTML = movieDetails;
      let recommendation = document.createElement("p");
      recommendation.classList.add("recommend");
      movieElement.appendChild(recommendation);
      if (data.imdbRating >= "5.0") {
        recommendation.innerHTML = "We recommend you to watch this movie.";
        recommendation.style.color = "rgb(0, 166, 90)";
      } else {
        recommendation.innerHTML =
          "We don't recommend you to watch this movie.";
        recommendation.style.color = "red";
      }
      if (data.Response == "False") {
        movieElement.remove();
        alert("Not found!");
        movieElement.innerHTML = "";
      }
      if (data.Type == "series") {
        recommendation.innerHTML = "We recommend you to watch this series.";
      }
    });
  document.getElementById("movie-name").value = "";
});