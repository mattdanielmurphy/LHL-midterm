$(document).ready(function() {

  $(".filters").click(function () {
    // if ("#all" ==)
    if ($(this).text() === "All") {
      $(".filters").removeClass("active");
    } else {
      $("#all").removeClass("active");
    }
    $(this).toggleClass("active");

    // TO DO:
    // Filter the resources that are shown when a specific button is clicked.

  });








});
