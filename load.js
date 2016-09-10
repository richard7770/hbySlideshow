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

  function onListLoad(data) {
    console.log('onListLoad', arguments);
    if(!data || data.stat!='ok') return;
    var pic = data.photoset.photo[10];
    var href = 'https://farm'+pic.farm +
      '.staticflickr.com/'+pic.server +
      '/'+pic.id+'_'+pic.secret+'_z.jpg';
    $('#primary-pictures img')[0].src = href;
  }
});
