
$(document).ready(function() {

  function renderAll() {
    $(() =>
      $.ajax({
        method: "GET",
        url: "/api/resources"
      }).done((resources) => {
        renderResources(resources);
      })
    );
  }

  function renderResources(resources) {
    resources.forEach(function(resource) {
      $resource = createResourceElement(resource);
      $('#resources-row').append($resource);
    });
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

  function removeFilterElement(array, elm) {
    const index = array.indexOf(elm);
    array.splice(index,1);
  }

  let filterTerms = [];
  let urlParams = JSON.stringify({ data: filterTerms });

  // function renderFilterItems() {
  //           $(() => {
  //             $.ajax({
  //               method: "GET",
  //               url: `/api/resources?types=${urlParams}`
  //             }).done((resources) => {
  //               renderResources(resources);
  //             });
  //           });
  // }

  $(".filters").click(function () {

    if ($(this).text() === "All") {
      filterTerms.splice(0, filterTerms.length); // removes all elements in filterTerms
      $(".filters").removeClass("active"); // removes class 'active' from everything EXCEPT all because all is active on default
      $(() => {
          $.ajax({
            method: "GET",
            url: "/api/resources"
          }).done((resources) => {
            resources.forEach(function() {
              $('.each-resource').remove();
            });
            renderAll();
          });
        })

    } else {
      $("#all").removeClass("active"); // makes "All" button inactive

      if ($(this).text() === "Blog") {

        $(this).toggleClass("active");

        console.log("State of blog: " + $(this).hasClass("active"))

        if ($(this).hasClass("active")) {
          filterTerms.push("blog");
          let urlParams = JSON.stringify({ data: filterTerms });
          console.log("Url params inside Tutorial:" + urlParams)

          function renderFilterItems() {
            $(() => {
              $.ajax({
                method: "GET",
                url: `/api/resources?types=${urlParams}`
              }).done((resources) => {
                renderResources(resources);
              });
            });
          }

          // remove all resources, then render only the blog resources
          $(() => {
            $.ajax({
              method: "GET",
              url: "/api/resources"
            }).done((resources) => {
              resources.forEach(function() {
                $('.each-resource').remove();
              });
              renderFilterItems();
            });
          })
        } else {
          // console.log('should put inactive here')
          removeFilterElement(filterTerms,'blog');
          // console.log(filterTerms)
          removeResources();
        }
      }

      if ($(this).text() === "Tutorial") {

        $(this).toggleClass("active");

        console.log("State of tutorial: " + $(this).hasClass("active"))

        if ($(this).hasClass("active")) {
          filterTerms.push("tutorial");
          let urlParams = JSON.stringify({ data: filterTerms });
          console.log("Url params inside Tutorial: " + urlParams)

          function renderFilterItems() {
            $(() => {
              $.ajax({
                method: "GET",
                url: `/api/resources?types=${urlParams}`
              }).done((resources) => {
                renderResources(resources);
              });
            });
          }

          // remove all resources, then render only the tutorial resources
          $(() => {
            $.ajax({
              method: "GET",
              url: "/api/resources"
            }).done((resources) => {
              resources.forEach(function() {
                $('.each-resource').remove();
              });
              renderFilterItems();
            });
          })
        } else {
          // console.log('should put inactive here')
          removeFilterElement(filterTerms,'tutorial');
          // console.log(filterTerms)
          let urlParams = JSON.stringify({ data: filterTerms });

          function renderFilterItems() {
            $(() => {
              $.ajax({
                method: "GET",
                url: `/api/resources?types=${urlParams}`
              }).done((resources) => {
                renderResources(resources);
              });
            });
          }

          $(() => {
            $.ajax({
              method: "GET",
              url: "/api/resources"
            }).done((resources) => {
              resources.forEach(function() {
                $('.each-resource').remove();
              });
              renderFilterItems();
            });
          })

          // removeResources();
          // $(() => {
          //   $.ajax({
          //     method: "GET",
          //     url: "/api/resources"
          //   }).done((resources) => {
          //     resources.forEach(function() {
          //       $('.each-resource').remove();
          //     });
          //     renderFilterItems();
          //   });
          // })
        }
      }



    } // on.click of .filters

    // $(this).toggleClass("active");

    // TO DO:
    // Filter the resources that are shown when a specific button is clicked.
  });

  renderAll();

}); // document ready
