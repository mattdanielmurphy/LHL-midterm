/* ----------- My-resources functions ----------- */
function renderResources() {
  $(() =>
    $.ajax({
      method: "GET",
      url: "/api/my-resources"
    }).then((resources) => {
      appendResource(resources);
    })
  );
}

function appendResource(resources) {
  resources.forEach(function(resource) {
    $resource = createResourceElement(resource);
    $('#my-resources-row').append($resource);
  });
  // Add star ratings from font awesome
  createStarRatings('.rating','.clear-rating')
}

/* ----------- My-likes functions ----------- */
function renderLikesResources() {
  $(() =>
    $.ajax({
      method: "GET",
      url: "/api/my-likes"
    }).then((resources) => {
      appendLikesResource(resources);
    })
  );
}

function appendLikesResource(resources) {
  resources.forEach(function(resource) {
    $resource = createResourceElement(resource);
    $('#my-likes-row').append($resource);
  });
  // Add star ratings from font awesome
  createStarRatings('.rating','.clear-rating')
}

function createStarRatings(rating, clearRating) {
  $(rating).rating({
      filledStar: '<i class="fa fa-star"></i>',
      emptyStar: '<i class="fa fa-star"></i>',
      clearButton: '<i class="fa fa-lg fa-minus-circle"></i>'
    });
  $(clearRating).tooltip();
}


/* ----------- Function for creating each resource element ----------- */
function createResourceElement(resource) {
  return (
    `<div class="col-lg-4 col-md-6 card p-0 mb-3 each-resource">
      <h3 class="card-header">${resource.title}</h3>

      <div class="card-body">
        <h6 class="card-subtitle text-muted">Submitted by ${resource.username}</username></h6>
      </div>

      <div class="card-body">
        <p class="card-text">${resource.description}</p>
      </div>

      <div id='resource-url'>
        <a class='d-block text-center' href='http://${resource.url}'><img class="img-thumbnail img-rounded" height='200px' src='/resources/${resource.id}/screenshot'></a>

      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <p>
            <h6>Your rating</h6>
            <form method="POST" action="/rating">
              <input class='rating' data-size='xs'type="text">
            </form>
          </p>
        </li>
      </ul>

    </div>`
  );
}


// document.ready() shorthand:
$(() => {
  renderResources();
  renderLikesResources();
});
