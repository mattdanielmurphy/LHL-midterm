function renderAllResources() {
  $.ajax({
    method: "GET",
    url: "/api/resources"
  }).then((resources) => {
    createAndAppendResource(resources);
  })
}

function renderFilteredResources(resourceCategories) {
  $.ajax({
    method: "GET",
    url: `/api/resources?types=${resourceCategories}`
  }).then((resources) => {
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
<!--         <button id='add-comment-btn' class='toggle-comment'>Add comment</button> -->
        <form class='new-comment' method="POST" action="/api/comments">
          <textarea id="comment-text-area" name="new-comment" cols="26" rows="4"></textarea>
          <input id="submit-comment-btn" type="submit" value="Add Comment" />
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

      // $('.new-comment').hide();

      $('#submit-comment-btn').unbind('click').click(function() {
        // $(this).siblings('.new-comment').slideToggle();
        console.log("inside submit button")
        let $commentTextArea = $(this).siblings('#comment-text-area');
        let text = $commentTextArea.val();
        console.log(text);

        $.ajax({
            url: '/api/comments',
            data: {text: text},
            method: 'POST',
          }).then(function() {
            console.log('inside post comment')
          });

      });

    </script>`
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

      // $('.new-comment').hide();

  $('#submit-comment-btn').on('click', function() {
    console.log('HELLO')
    // $(this).siblings('.new-comment').slideToggle();
    // let $commentTextArea = $(this).siblings('.new-comment').find('#comment-text-area');
    // console.log($commentTextArea.val());
  });

});


