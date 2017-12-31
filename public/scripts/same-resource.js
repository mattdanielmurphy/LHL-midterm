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

function postLike(boolean, likeValue, resourceURL) {
    $.ajax({
    url: '/api/insert-like',
    data: {
      like: boolean,
      likeValue: likeValue,
      url: resourceURL
    },
    method: 'POST'
    }).then(() => {
      knex.destroy();
      });
}

function appendResource(resources) {
  resources.forEach(function(resource) {
    $resource = createResourceElement(resource);
    $('#same-resources-row').append($resource);
  });

  $('.like-btn').click(function() {
    let $likeBtn = $(this);
    let $hrefLong = $likeBtn.parent().siblings().attr('href');
    let $hrefShort = ($hrefLong).replace('http://', '');

    if (!$likeBtn.hasClass('liked')) {
      $likeBtn.css('color', 'red');
      $likeBtn.addClass('liked');
      postLike(true, 1, $hrefShort);

    } else {
      $likeBtn.css('color', 'white');
      $likeBtn.removeClass('liked');
      postLike(false, 0, $hrefShort);
    }
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

      <div id='resource-url'>
        <a class='d-block text-center' href='http://${resource.url}'><img class="img-thumbnail img-rounded" height='200px' src='/resources/${resource.id}/screenshot'></a>

        <div id='resource-options'>
          <button class='like-btn'>
          <i class="fas fa-lg fa-heart"></i>
          </button>
        </div>
      </div>

    </div>`
  );
}


// document.ready() shorthand:
$(() => {
  renderResource();
});
