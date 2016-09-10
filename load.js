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

  var n, photos;
  function onListLoad(data) {
    console.log('onListLoad', arguments);
    if(!data || data.stat!='ok') return;
    photos = data.photoset.photo;
    n = Math.floor(Math.random()*10) % photos.length;
    changePhoto();
  }
  function changePhoto() {
    console.log('changePhoto', n);
    $('#primary-pictures img')[0].src = getHref(photos[n]);
    n = (n+29) % photos.length;
    setTimeout(changePhoto, 4000);
  }
  function getHref(ph) {
    return 'https://farm'+ph.farm +
    '.staticflickr.com/'+ph.server +
    '/'+ph.id+'_'+ph.secret+'_z.jpg';
  }
});
