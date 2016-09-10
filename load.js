jQuery(function ($) {
  var apikey = document.currentScript.dataset.apikey;
  var albumid = document.currentScript.dataset.album;
  $.ajax({
  'url':'https://api.flickr.com/services/rest/',
  'data':{
    'photoset_id':albumid,
    'api_key':apikey,
    'method':'flickr.photosets.getPhotos',
    'format':'json'
  },
    'dataType':'jsonp',
    'jsonp':'jsoncallback',
    'success':onListLoad
  });

  function onListLoad(data,status,xhr) {
    console.log(arguments);
  }
});
