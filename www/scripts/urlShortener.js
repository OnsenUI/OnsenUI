angular.module('app').factory('URLShortener', function(){

  function shortenUrl(url){
    var data = {
      longUrl: url
    };

    return $.ajax({
      type: 'POST',
      url: 'https://www.googleapis.com/urlshortener/v1/url',
      contentType: 'application/json',
      data: JSON.stringify(data)
    }).then(function(response){
      return response.id;
    })
  }

  return {
    shortenUrl: shortenUrl
  };
});
