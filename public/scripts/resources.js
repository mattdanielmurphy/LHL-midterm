
$(document).ready(function() {

  $(() => {
    $.ajax({
      method: "GET",
      url: "/api/resources"
    }).done((resources) => {
      renderResources(resources);
    });
  });

  function renderResources(resources) {
    resources.forEach(function(resource) {
      $resource = createResourceElement(resource);
      $('#resources-row').append($resource);
    });
  }

  function createResourceElement(resource) {
    return (
      `<div class='content col-4 text-center'>
          <div class='border border-dark rounded m-1'>
            <div><a href='http://${resource.url}>'><img src='/resources/${resource.id}/screenshot' class="img-thumbnail img-rounded"></a></div>
            <div>${resource.title}</div>
            <div>${resource.description}</div>
            <div>comment</div>
            <i class="far fa-heart"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
          </div>
        </div>`
    );
  }



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
