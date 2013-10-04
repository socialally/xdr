define(function(require) {
  var error = function(response) {
    console.log('error: ' + response.status);
  }
  return error;
});
