$(() => {
  $.ajax({
    method: "GET",
    url: "/api/resources"
  }).done((resources) => {
    for(resource of resources) {
      $("<div class='d-flex justify-content-around'>").text(resource.title).appendTo($("#resources-container"));
    }
  });;
});
