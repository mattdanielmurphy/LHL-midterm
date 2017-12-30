
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
    createAndAppendResource(resources);
  });
}

// function filterCommentsByResourceId(id) {
//   $.ajax({
//     method: "GET",
//     url: `/api/get-comments?resid=${id}`,
//   }).then((result) => {
//     createComments(result)
//   });
// }

// function createComments(comment) {
//   $('#comment-heading').append(
//     `<li class="list-group list-group-flush">${comment.content}</li>
//     <li class="list-group list-group-flush"> Posted by: ${comment.username}</li>`)
// }

function createAndAppendResource(resources) {
  let counter = 0;
  resources.forEach(function(resource) {
    console.log(resource.id, '<- resourceId in createAndAppendResource')
    // 1. get the resource ID to do an knex query on comments with that id!
    // 2. append the comments with that specific resource

    // $commentHeading = filterCommentsByResourceId(resource.id)
    // console.log($commentHeading, "<--commentHeading");


    let resourceId = resource.id;

    $.ajax({
      method: "GET",
      url: `/api/get-comments?resid=${resourceId}`,
    }).then((result) => {
      $resource = createResourceElement(resource);
      $('#resources-row').append($resource);

      // console.log(result +"<--result[0]")
      // console.log(resourceId + " should match: " + result[0].resource_id)
      let resources = {};
      for (const n in result) {
        console.log(result[n].resource_id);
        for (const x = 0; $('#resources-row').children().length(); x++) {
          if ($('#resources-row').hasClass()) {
            $('.' + result[n].resource_id).append(
              `${result[n].content}`
            )
          }
        }
      }
      // if (resourceId === result[0].resource_id) {
      //   $('.insert-comments').append(`<li class="list-group list-group-flush">${result[0].content}</li>
      //       <li class="list-group list-group-flush"> Posted by: ${result[0].username}</li>`)
      // }



    //     `<div id='${counter}''></div`)
    //   console.log(result)
    //   console.log(counter)
    //   $(`#${counter}`).append( `<li class="list-group list-group-flush">${result[0].content}</li>
    // <li class="list-group list-group-flush"> Posted by: ${result[0].username}</li>`)
    //   counter = counter + 1;

    });

    // $resource = createResourceElement(resource);
    // $('#resources-row').append($resource);
    // $('#comment-heading').append()
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

function createResourceElement(resource) {
  return (
    `<div class="${resource.id} col-lg-4 col-md-6 card p-0 mb-3 each-resource">
      <h3 class="card-header">${resource.title}</h3>

      <div class="card-body">
        <h6 class="card-subtitle text-muted">Submitted by ${resource.username}</username></h6>
      </div>

      <div class="card-body">
        <p class="card-text">${resource.description}</p>
      </div>

      <div id='resource-url'>
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
        <h6 id="comment-heading" class="card-title">Comments:</h6>
          <div class="insert-comments">

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

      <ul class="list-group list-group-flush">
        <form id="new-comment-form" method="POST" action="/api/comments">
          <textarea id="comment-text-area" name="new-comment" cols="26" rows="4"></textarea>
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
