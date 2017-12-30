function renderResource() {
  $(() =>
    $.ajax({
      method: "GET",
      url: "/api/same-resource"
    }).then((resources) => {
      appendResource(resources);
    })
  );
}

function appendResource(resources) {
  resources.forEach(function(resource) {
    $resource = createResourceElement(resource);
    $('#same-resources-row').append($resource);
  });
}

function createResourceElement(resource) {
  return (
   `<div class="card p-0 mb-3 each-resource">
      <h3 class="card-header">${resource.title}</h3>
      <div class="card-body">
        <h6 class="card-subtitle text-muted">Submitted by ${resource.username}</username></h6>
      </div>
      <div class="card-body">
        <p class="card-text">${resource.description}</p>
      </div>
      <div>
        <a class='d-block text-center' href='http://${resource.url}'><img class="img-thumbnail img-rounded" height='200px' src='/resources/${resource.id}/screenshot'></a>
      </div>
      <div class="card-body">
        <h6 class="card-title">Overall Ratings:</h6>
        <li class="list-group list-group-flush">${resource.value}</li>
      </div>
      <div class="card-body">
        <h6 class="card-title">Overall Likes:</h6>
          <li class="list-group list-group-flush"> ${resource.like}</li>
      </div>
      <div class="card-body">
        <h6 class="card-title">Comments:</h6>
        <li class="list-group list-group-flush">${resource.content}</li>
      </div>

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

      <ul class="list-group list-group-flush">
        <button class='toggle-comment'>Add comment</button>
        <form class='new-comment' method="POST" action="/resources/comment">
          <textarea name="new-comment" cols="26" rows="4"></textarea>
          <input type="submit" value="Submit comment" />
        </form>
      </ul>

    </div>
    <script>
      $('.rating').rating({
        filledStar: '<i class="fa fa-star"></i>',
        emptyStar: '<i class="fa fa-star"></i>',
        clearButton: '<i class="fa fa-lg fa-minus-circle"></i>'
      });

      $('.clear-rating').tooltip();

      $('.new-comment').hide();

      $('.toggle-comment').unbind('click').click(function() {
        $(this).siblings('.new-comment').slideToggle();
      });
    </script>`
  );
}


// document.ready() shorthand:
$(() => {
  renderResource();
});
