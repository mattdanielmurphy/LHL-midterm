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
      $("#resources-container").append(`
        <div class='border border-dark rounded p-4'>
          <div><a href='${urls}'><img src='http://fillmurray.com/300/300'></a></div>
          <div>${title}</div>
          <div>${description}</div>
        </div>
        `);
    }
  });;
});
