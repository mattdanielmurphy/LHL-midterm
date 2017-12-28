function renderAllResources() {
  $.ajax({
    method: "GET",
    url: "/api/resources"
  }).then((resources) => {
    console.log("inside renderAllResources: ", resources)
    createAndAppendResource(resources);
  })
}

function renderFilteredResources(resourceCategories) {
  console.log("resource categories: ", resourceCategories)
  $.ajax({
    method: "GET",
    url: `/api/resources?types=${resourceCategories}`
  }).then((resources) => {
    console.log("inside resources, this is the resource: ", resources)
    createAndAppendResource(resources);
  });
}

function createAndAppendResource(resources) {
  resources.forEach(function(resource) {
    $resource = createResourceElement(resource);
    $('#resources-row').append($resource);
  });
}

function createResourceElement(resource) {
  return (
    `<div class="col-lg-4 col-md-6 card p-0 mb-3 each-resource">
      <h3 class="card-header">${resource.title}</h3>
      <div class="card-body">
        <h5 class="card-title">${resource.title}</h5>
        <h6 class="card-subtitle text-muted">Submitted by ${resource.username}</username></h6>
      </div>
      <div>
        <a class='d-block text-center' href='http://${resource.url}'><img class="img-thumbnail img-rounded" height='200px' src='/resources/${resource.id}/screenshot'></a>
      </div>
      <div class="card-body">
        <p class="card-text">${resource.description}</p>
      </div>
      <div class="card-body">
        <h5 class="card-title">Ratings</h5>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <p>
              <h6>Your rating</h6>
              <form method="POST" action="/rating">
                <input class='rating' data-size='xs'type="text">
              </form>
            </p>
            <p>
              <h6>All ratings</h6>
              <li class="list-group-item">${resource.rating}</li>
            </p>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <h5 class="card-title">Comments</h5>
        <ul class="list-group list-group-flush">
          <button id='toggle-comment'>Add comment</button>
          <form id='new-comment' method="POST" action="/comment">
            <textarea name="new-comment" cols="40" rows="4"></textarea>
            <input type="submit" value="Submit comment" />
          </form>
          <li class="list-group-item">${resource.comment}</li>
        </ul>
      </div>
      <div class="card-body">
        <h5 class="card-title">Likes</h5>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"> ${resource.like}</li>
        </ul>
      </div>

      <div class="card-footer text-muted">
        Added 2 days ago
      </div>
    </div>
    <script>
      $('.rating').rating({
        filledStar: '<i class="fa fa-star"></i>',
        emptyStar: '<i class="fa fa-star"></i>',
        clearButton: '<i class="fa fa-lg fa-minus-circle"></i>'
      });

      $('.clear-rating').tooltip();

      // unbind click to avoid multiple toggles:
      $('#toggle-comment').unbind('click').click( () => {
        $('#new-comment').slideToggle();
      });
    </script>`
  );
}

// <div class='content col-4 text-center each-resource'>
// <div class='border border-dark rounded m-1'>
//   <div><a href='http://${resource.url}'><img src='/resources/${resource.id}/screenshot' class="img-thumbnail img-rounded"></a></div>
//   <div>${resource.title}</div>
//   <div></div>
//   <div>comment</div>
//   <i class="far fa-heart"></i>
//   <i class="far fa-star"></i>
//   <i class="far fa-star"></i>
//   <i class="far fa-star"></i>
//   <i class="far fa-star"></i>
//   <i class="far fa-star"></i>
// </div>
// </div>

function removeResources(resourcesToRender, cb) {
  $.ajax({
    method: "GET",
    url: "/api/resources"
  }).then((resources) => {
    resources.forEach(function() {
      $('.each-resource').remove();
    });
    cb(resourcesToRender);
  });
}

function toggleBtnActive (btn) {
  $(btn).click(function() {
    $(this).toggleClass("active");
  });
}

function loadAllResources(filterBtn) {
  if(!$("filterBtn").hasClass("active")) {
    renderAllResources();
  }
}

function renderResourcesOnClick(filterBtn, activeFilterBtns) {
  console.log("inside render Resources on Click")
  $(filterBtn).click(function() {

    let resourcesToFilter = [];
    for (btn of $(activeFilterBtns)) {
      console.log(btn.id, "<- button id")
      resourcesToFilter.push(btn.id)
    }
    console.log(resourcesToFilter, "<-resources to filter")
    let resourceCategories = JSON.stringify({ data: resourcesToFilter });
    console.log(resourceCategories, "<-resourcesCategories to filter")
    removeResources(resourceCategories, renderFilteredResources);

    if (resourcesToFilter.length === 0) {
      renderAllResources();
    }
  });
}

// document.ready() shorthand:
$(() => {
  toggleBtnActive(".filter-btn");
  loadAllResources(".filter-btn");
  renderResourcesOnClick(".filter-btn", ".filter-btn.active");
});


