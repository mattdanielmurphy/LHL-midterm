
function renderAllResources() {
  $.ajax({
    method: "GET",
    url: "/api/resources"
  }).then((resources) => {
    console.log("Rendering all resources: ", resources)
    createAndAppendResource(resources);
  })
}

function createStarRatings(rating, clearRating) {
  $(rating).rating({
      filledStar: '<i class="fa fa-star"></i>',
      emptyStar: '<i class="fa fa-star"></i>',
      clearButton: '<i class="fa fa-lg fa-minus-circle"></i>'
    });
  $(clearRating).tooltip();
}

function renderFilteredResources(resourceCategories) {
  $.ajax({
    method: "GET",
    url: `/api/resources?types=${resourceCategories}`
  }).then((resources) => {
    console.log("before create and append: ", resources)
    createAndAppendResource(resources);
  });
}

function createAndAppendResource(resources) {
  resources.forEach(function(resource) {
    $resource = createResourceElement(resource);
    $('#resources-row').append($resource);
  });
    // Accessing resource's DOM object after AJAX call.
    // It's asynchronous, so you can use jquery to access the newly added resource's DOM in here.

    // Add star ratings from font awesome
    createStarRatings('.rating','.clear-rating')

    // TRY the AJAX call here!
    $('.submit-comment-btn').click(function() {
      event.preventDefault();
      let $submitCommentBtn = $(this)
      let commentTextArea = $submitCommentBtn.siblings('#comment-text-area').val();
      console.log(commentTextArea);

      // use $this to bubble up in the DOM, to get the resource.url, use it to join to get the resource_id
      // use session to get username, do a join to find user id

      $.ajax({
        url: '/api/comments',
        data: {text: commentTextArea},
        method: 'POST'
      }).then(function() {
        console.log('Successfully Posted comment')
      });
    }); // submit comment btn
}

function createResourceElement(resource) {
  return (
    `<div class="col-lg-4 col-md-6 card p-0 mb-3 each-resource">
      <h3 class="card-header">${resource.title}</h3>

      <div class="card-body">
        <h6 class="card-subtitle text-muted">Submitted by ${resource.username}</username></h6>
      </div>

      <div class="card-body">
        <p class="card-text">desc:${resource.description}</p>
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
        <form id="new-comment-form" method="POST" action="/api/comments">
          <textarea id="comment-text-area" name="new-comment" cols="26" rows="4"></textarea>
          <input class="submit-comment-btn" type="submit" value="Add Comment" />
        </form>
      </ul>

    </div>`
  );
}

// function loadComments() {
//   $.ajax({
//     url: '/resources/comment',
//     dataType: "json",
//     method: 'GET',
//   }).then(function(tweets) {
//     renderTweets(tweets);
//   });
// }

// function postComment() {
//   let serializeText = $("#comment-text-area").serialize();
//   console.log(serializeText)

//   $.ajax({
//       url: '/resources/comment',
//       data: serializeText,
//       method: 'POST',
//     }).then(function() {
//       // loadComments();
//       $("#comment-text-area").val('');
//     });
// }

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
  $(filterBtn).click(function() {
    let resourcesToFilter = [];
    for (btn of $(activeFilterBtns)) {
      resourcesToFilter.push(btn.id)
    }
    let resourceCategories = JSON.stringify({ data: resourcesToFilter });
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


