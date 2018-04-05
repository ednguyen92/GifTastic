var heroes = ["Captain America", "SuperMan", "Iron Man", "BatMan"];

function displayHeroGif() {

  var hero = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=RHNboMWxPzn4etLyVjU3xI077lGKgtvU&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    var gifs = response.data;

    for (var i = 0; i < gifs.length; i++) {
      var heroDiv = $('<div>');

      var p = $('<p>').html('<h3>Rating: ' + gifs[i].rating + '</h3>');

      var heroImage = $('<img>').addClass('heroImg').attr('src', gifs[i].images.fixed_height_still.url);

      heroImage.attr('data-still', gifs[i].images.fixed_height_still.url);

      heroImage.attr('data-animate', gifs[i].images.fixed_height.url);

      heroDiv.append(p);

      heroDiv.append(heroImage);

      $(".heroes-view").prepend(heroDiv);
    }
    $(".heroImg").on("click", function () {
      var state = $(this).attr("data-state");

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

  });

}

function renderButtons() {

  $("#buttons-view").empty();

  for (var i = 0; i < heroes.length; i++) {
    var heroBtn = $("<button>").addClass("btn btn-primary hero-btn");

    heroBtn.attr("data-name", heroes[i]);

    heroBtn.text(heroes[i]);

    $("#buttons-view").append(heroBtn);
  }
}

$(".add-hero").on("click", function (event) {

  event.preventDefault();

  var hero = $("#hero-input").val().trim();

  heroes.push(hero);

  renderButtons();
});

$(document).on("click", ".hero-btn", displayHeroGif);

renderButtons();