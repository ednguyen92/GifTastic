// Initial array of heroes
var heroes = ["Captain America", "SuperMan", "Iron Man", "BatMan"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayHeroGif() {

  var hero = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=RHNboMWxPzn4etLyVjU3xI077lGKgtvU";

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

              // Creating a div to hold the movie
              var heroDiv = $("<div class='hero'>");

              // Storing the rating data
              var rating = response.rating;
    
              // Creating an element to have the rating displayed
              var pOne = $("<p>").text("Rating: " + rating);
    
              // Displaying the rating
              heroDiv.append(pOne);

                        // Retrieving the URL for the image
          var imgURL = response.Poster;

          // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURL);

          // Appending the image
          movieDiv.append(image);

          // Putting the entire movie above the previous movies
          $("#movies-view").prepend(movieDiv);

  });

}


      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movie buttons prior to adding new movie buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < heroes.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var heroBtn = $("<button>");
          // Adding a class
          heroBtn.addClass("hero-btn");
          // Adding a data-attribute with a value of the movie at index i
          heroBtn.attr("data-name", heroes[i]);
          // Providing the button's text with a value of the movie at index i
          heroBtn.text(heroes[i]);
          // Adding the button to the HTML
          $("#buttons-view").append(heroBtn);
        }
      }

      // This function handles events where one button is clicked
      $("#add-hero").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var hero = $("#hero-input").val().trim();
        // The movie from the textbox is then added to our array
        heroes.push(hero);

        // calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      
      // Adding a click event listener to all elements with a class of "movie-btn"
      $(document).on("click", ".hero-btn", displayHeroGif);


      // Calling the renderButtons function at least once to display the initial list of movies
      renderButtons();