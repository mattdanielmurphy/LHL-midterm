function renderAllResources() {
  $(() =>
    $.ajax({
      method: "GET",
      url: "/api/resources"
    }).then((resources) => {
      createAndAppendResource(resources);
    })
  );
}

function renderFilteredResources(resourceCategories) {
  $(() => {
    $.ajax({
      method: "GET",
      url: `/api/resources?types=${resourceCategories}`
    }).then((resources) => {
      createAndAppendResource(resources);
    });
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

function removeResources(resourcesToRender, cb) {
  $(() => {
    $.ajax({
      method: "GET",
      url: "/api/resources"
    }).then((resources) => {
      resources.forEach(function() {
        $('.each-resource').remove();
      });
      cb(resourcesToRender);
    });
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

$(document).ready(() => {
  toggleBtnActive(".filter-btn");
  loadAllResources(".filter-btn");
  renderResourcesOnClick(".filter-btn", ".filter-btn.active");
});
