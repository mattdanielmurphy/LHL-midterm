function renderAllResources() {
  $.ajax({
    method: "GET",
    url: "/api/resources"
  }).then((resources) => {
    console.log("Rendering all resources: ", resources)
    createAndAppendResource(resources, filterCommentsByResourceId);
  })
}

function renderFilteredResources(resourceCategories) {
  $.ajax({
    method: "GET",
    url: `/api/resources?types=${resourceCategories}`
  }).then((resources) => {
    createAndAppendResource(resources, filterCommentsByResourceId);
  });
}

function filterCommentsByResourceId(resourceId, idToAppend) {
  $.ajax({
    method: "GET",
    url: `/api/get-comments?resid=${resourceId}`
  }).then((result) => {
    console.log(result)
    console.log(idToAppend)
    $(`#${idToAppend}`).append(`<li class="list-group list-group-flush">${result[0].content}</li>
      <li class="list-group list-group-flush"> Posted by: ${result[0].username}</li>`)
  });
}

function createStarRatings(rating, clearRating) {
  $(rating).rating({
      filledStar: '<i class="fa fa-star"></i>',
      emptyStar: '<i class="fa fa-star"></i>',
      clearButton: '<i class="fa fa-lg fa-minus-circle"></i>'
    });
  $(clearRating).tooltip();
}
let liked = false;
function likeResource(likeResourceBtn, liked) {
  $(likeResourceBtn).click(function() {
    // let liked = false;
    let $likeResourceBtn = $(this);

    if(liked) {
      $likeResourceBtn
        .hover(
          $likeResourceBtn
            .css('color', 'white'),
          $likeResourceBtn
            .css('color', '#55595c')
        );
      liked = false;
    } else {
      $likeResourceBtn
        .hover(
          $likeResourceBtn
            .css('color', 'white'),
          $likeResourceBtn
            .css('color', 'red')
        );
      liked = true;
    }
  });
}

// Access resource's DOM object after AJAX call.
// It's asynchronous, so you can use jquery to access the newly added resource's DOM in here.
function createAndAppendResource(resources, cb) {
  let counter = 0;

  resources.forEach(function(resource) {
    console.log(resource.id, '<- resourceId in createAndAppendResource')
    let resourceId = resource.id;
    // 1. get the resource ID to do an knex query on comments with that id!
    // 2. append the comments with that specific resource

    $resource = createResourceElement(resource,counter);
    $('#resources-row').append($resource);
    cb(resourceId, counter)
    counter = counter + 1;

  });

  // Add star ratings from font awesome
  createStarRatings('.rating','.clear-rating')
  likeResource('.like-resource-btn')

    // TRY the AJAX call here!
    $('.submit-comment-btn').click(function() {
      event.preventDefault();
      let $submitCommentBtn = $(this)
      let commentTextArea = $submitCommentBtn.siblings('#comment-text-area').val();
      let $ul = $submitCommentBtn.parent().parent();
      let $hrefLong = $ul.siblings('#resource-url').find('a').attr('href')
      let $hrefShort = ($hrefLong).replace('http://', '');

      $.ajax({
        url: '/api/comments',
        data: {
          text: commentTextArea,
          url: $hrefShort
        },
        method: 'POST'
      }).then(function() {
        console.log('Successfully Posted comment')
      });
    }); // submit comment btn
}

function createResourceElement(resource, counter) {
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

        <div id='resource-options'>
          <button class='like-resource-btn'>
            <i class="fas fa-lg fa-heart"></i>
          </button>
        </div>
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

      <div class="card-body comment-div">
        <h6 id="comment-heading" class="card-title">Comments:</h6>
        <div id='${counter}'></div>
      </div>

      <ul class="list-group list-group-flush">
        <form id="new-comment-form" method="POST" action="/api/comments">
          <textarea id="comment-text-area" name="new-comment" rows="4"></textarea>
          <input class="submit-comment-btn" type="submit" value="Add Comment" />
        </form>
      </ul>

    </div>`
  );
}

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
