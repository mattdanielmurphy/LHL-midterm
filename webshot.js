const webshot     = require('webshot');

takeScreenshot = function(url) {
  return new Promise(function(resolve,reject) {

    console.log("taking screenshot", url)
    const buffer = [];
    const stream = webshot(url, {})
    stream.on('data',function(data){
      buffer.push(data);
    });
    stream.on('end', function() {
      console.log("screenshot complete", url)
      resolve(Buffer.concat(buffer))
    })
  })
}

module.exports = takeScreenshot;
