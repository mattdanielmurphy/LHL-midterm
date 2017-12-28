function renderResources() {
  $(() =>
    $.ajax({
      method: "GET",
      url: "/api/carousel"
    }).then((resources) => {
      appendResource(resources);
    })
  );
}

function appendResource(resources) {
  resources.forEach(function(resource) {
    $resource = createResourceElement(resource);
    $('.carousel-inner').append($resource);
  });
}

function createResourceElement(resource) {
  return (
    `
    <div class='carousel-item'>
      <img id="carousel-image" class='d-block w-100' src='/resources/${resource.id}/screenshot'>
      <div id="carousel-caption" class='carousel-caption d-non d-md-block'>
        <h3 id="carousel-title" class="text-center">${resource.title}</h3>
        <p id="carousel-description" class="text-center text-dark">${resource.description}</p>
      </div>
    </div>
    `
  );
}

// document.ready() shorthand:
$(() => {
  renderResources();
});
