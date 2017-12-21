$(() => {
  $.ajax({
    method: "GET",
    url: "/api/resources"
  }).done((resources) => {
    for(resource of resources) {
      let title = resource.title;
      let description = resource.description;
      let urls = resource.url;
      console.log(title)
      $("#resources-row").append(`
        <div class='content col-4 text-center'>
          <div class='border border-dark rounded m-1'>
            <div><a href='http://${urls}'><img src='http://fillmurray.com/200/200'></a></div>
            <div>${title}</div>
            <div>${description}</div>
            <div>comment</div>
          </div>
        </div>
        `);
    }
  });;
});
