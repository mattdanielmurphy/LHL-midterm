
$(document).ready(function() {

  function renderAll() {
    $(() =>
      $.ajax({
        method: "GET",
        url: "/api/resources"
      }).done((resources) => {
        renderResources(resources);
      })
    );
  }

  function renderResources(resources) {
    resources.forEach(function(resource) {
      $resource = createResourceElement(resource);
      $('#resources-row').append($resource);
    });
  }

  function removeResources() {
    $(() => {
      $.ajax({
        method: "GET",
        url: "/api/resources"
      }).done((resources) => {
        resources.forEach(function() {
          $('.each-resource').remove();
        });
      });
    });

  }

  function createResourceElement(resource) {
    return (
      `<div class='content col-4 text-center each-resource'>
          <div class='border border-dark rounded m-1'>
            <div><a href='http://${resource.url}'><img src='/resources/${resource.id}/screenshot' class="img-thumbnail img-rounded"></a></div>
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

  let filterTerms = [];

  $(".filters").click(function () {
    // if ("#all" ==)
    if ($(this).text() === "All") {
      $(".filters").removeClass("active");
      removeResources();
      renderAll();

    } else {
      $("#all").removeClass("active");


      if ($(this).text() === "Blog") {
        removeResources();
        filterTerms.push("blog");
        let urlParams = JSON.stringify({ data: filterTerms });
        console.log(urlParams)

        $(() => {
          $.ajax({
            method: "GET",
            url: `/api/resources?types=${urlParams}`
          }).done((resources) => {
            renderResources(resources);
          });
        });
      }
      if ($(this).text() === "Book") {
        filterTerms.push("book");
        let urlParams = JSON.stringify({ data: filterTerms });
        console.log(urlParams)

        $(() => {
          $.ajax({
            method: "GET",
            url: `/api/resources?types=${urlParams}`
          }).done((resources) => {
            renderResources(resources);
          });
        });
      }
      if ($(this).text() === "Article") {
        $(() => {
          $.ajax({
            method: "GET",
            url: "/api/resources?type=article"
          }).done((resources) => {
            renderResources(resources);
          });
        });
      }
      if ($(this).text() === "Tutorial") {
        $(() => {
          $.ajax({
            method: "GET",
            url: "/api/resources?type=tutorial"
          }).done((resources) => {
            renderResources(resources);
          });
        });
      }
      if ($(this).text() === "Video") {
        $(() => {
          $.ajax({
            method: "GET",
            url: "/api/resources?type=video"
          }).done((resources) => {
            renderResources(resources);
          });
        });
      }


    }

    $(this).toggleClass("active");

    // TO DO:
    // Filter the resources that are shown when a specific button is clicked.
  });

  renderAll();

});
