let result = document.getElementById("result");
let form = document.getElementById("form");
let movieName = document.getElementById("movie-name");
function getMovies() {
  let movieNameVal = movieName.value;
  let url = `http://www.omdbapi.com/?t=${movieNameVal}&apikey=${apiKey}`;
  if (movieNameVal.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please Enter A Movie or Series Name</h3>`;
  } else {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response == "True") {
          result.innerHTML = `
        <div class="movie-info">
        <img src=${data.Poster} class="poster">
        <div>
          <h2 class="name">${data.Title}</h2>
            <div class="rating">
            <i class="fa-solid fa-star gold-star"></i>
              <h4>${data.imdbRating}</h4>
            </div>
            <div class="details">
                <span>${data.Rated}</span>
                <span>${data.Year}</span>
                <span>${data.Runtime}</span>
            </div>
            <div class="genre">
                <div>${data.Genre.split(",").join("</div><div>")}</div>
            </div>
        </div>
    </div>
    <h3 class="extra-details">Plot:</h3>
    <p class="details-text">${data.Plot}</p>
    <h3 class="extra-details">Cast:</h3>
    <p class="details-text">${data.Actors}</p>
    <h3 class="extra-details">Director:</h3>
    <p class="details-text">${data.Director}</p>
    <h3 class="extra-details">Writers:</h3>
    <p class="details-text">${data.Writer}</p>
    <h3 class="extra-details">Language:</h3>
    <p class="details-text">${data.Language}</p>
    <h3 class="extra-details">Released:</h3>
    <p class="details-text">${data.Released}</p>
    <p class="recomendation"></p>
    `;
        }
        else {
          result.innerHTML = `<h3 class='msg'>Not Found!</h3>`;
        }
        if(data.imdbRating >= 5.0) {
          document.querySelector(".recomendation").innerHTML = "Recommended";
          document.querySelector(".recomendation").style.color = "#759242";
          document.querySelector(".recomendation").style.textAlign = "center";
          document.querySelector(".recomendation").style.fontSize = "18px";
        }
        else {
          document.querySelector(".recomendation").innerHTML = "Not Recommended";
          document.querySelector(".recomendation").style.color = "#E45545";
          document.querySelector(".recomendation").style.textAlign = "center";
          document.querySelector(".recomendation").style.fontSize = "18px";
        }
   });
  }
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  getMovies();
  movieName.value = "";
});
