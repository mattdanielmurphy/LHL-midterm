function renderAllResources() {
  $(() =>
    $.ajax({
      method: "GET",
      url: "/api/resources"
    }).done((resources) => {
      createAndAppendResource(resources);
    })
  );
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

function removeResources() {
  $(() => {
    $.ajax({
      method: "GET",
      url: "/api/resources"
    }).done((resources) => {
      resources.forEach(function() {
        $('.each-resource').remove();
      });
    });
  });
}

function removeFilterElement(array, elm) {
  const index = array.indexOf(elm);
  array.splice(index,1);
}

function toggleBtnState (btn) {
  $(btn).click(function() {
    $(this).toggleClass("active");
  });
}

let filterTerms = [];
let urlParams = JSON.stringify({ data: filterTerms });

$(document).ready(() => {

  toggleBtnState("#all");
  toggleBtnState("#blog");
  toggleBtnState("#tutorial");
  toggleBtnState("#book");
  toggleBtnState("#article");
  toggleBtnState("#video");


  // $(".filters").click(function() {

  //   if ($(this).text() === "All") {
  //     filterTerms.splice(0, filterTerms.length); // removes all elements in filterTerms
  //     $(".filters").removeClass("active"); // removes class 'active' from everything EXCEPT all because all is active on default
  //     $(() => {
  //         $.ajax({
  //           method: "GET",
  //           url: "/api/resources"
  //         }).done((resources) => {
  //           resources.forEach(function() {
  //             $('.each-resource').remove();
  //           });
  //           renderAllResources();
  //         });
  //       })

  //   } else {
  //     $("#all").removeClass("active"); // makes "All" button inactive

  //     if ($(this).text() === "Blog") {

  //       $(this).toggleClass("active");

  //       console.log("State of blog: " + $(this).hasClass("active"))

  //       if ($(this).hasClass("active")) {
  //         filterTerms.push("blog");
  //         let urlParams = JSON.stringify({ data: filterTerms });
  //         console.log("Url params inside Tutorial:" + urlParams)

  //         function renderFilterItems() {
  //           $(() => {
  //             $.ajax({
  //               method: "GET",
  //               url: `/api/resources?types=${urlParams}`
  //             }).done((resources) => {
  //               createAndAppendResource(resources);
  //             });
  //           });
  //         }

  //         // remove all resources, then render only the blog resources
  //         $(() => {
  //           $.ajax({
  //             method: "GET",
  //             url: "/api/resources"
  //           }).done((resources) => {
  //             resources.forEach(function() {
  //               $('.each-resource').remove();
  //             });
  //             renderFilterItems();
  //           });
  //         })
  //       } else {
  //         // console.log('should put inactive here')
  //         removeFilterElement(filterTerms,'blog');
  //         // console.log(filterTerms)
  //         removeResources();
  //       }
  //     }
  //   } //else
  // }) // on click for filters

  // renderAllResources();

}); // document ready


