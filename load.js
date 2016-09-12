jQuery(function ($) {
  var dataset = $('script[src*="/hbySlideshow/"]')[0].dataset;
  var apikey = dataset.apikey;
  var albumid = dataset.album;
  var interval = Number(dataset.interval) || 4000;
  var setsize = Number(dataset.setsize) || 500;
  if(!(
      apikey.constructor===String &&
      albumid.constructor===String
    )) return;
  var img = $('#primary-pictures img').one('load', styleImg)[0];
  var pimg = $('<img style="display:none">').bind('load',preloadReady).appendTo(document.body)[0];
  var photos, n, tPreloadStart, userid;

  $.ajax({
  'url':'https://api.flickr.com/services/rest/',
  'data':{
    'photoset_id':albumid,
    'api_key':apikey,
    'per_page':setsize,
    'method':'flickr.photosets.getPhotos',
    'format':'json'
  },
    'dataType':'jsonp',
    'jsonp':'jsoncallback',
    'success':onListLoad
  });

  function onListLoad(data) {
    console.log('PhotoSet:', data);
    if(!data || data.stat!='ok') return;
    photos = data.photoset.photo;
    userid = data.photoset.owner;
    n = Math.floor(Math.random()*10) % photos.length;
    preloadNext();
  }
  function preloadNext() {
    console.log('preloadNext', n);
    //  Revolve
    n = (n+1) % photos.length;
    //  Next step
    tPreloadStart = Date.now();
    var ph = photos[n];
    pimg.src = 'https://farm'+ph.farm + '.staticflickr.com/' +
      ph.server + '/'+ph.id+'_'+ph.secret+'_z.jpg';
  }
  function preloadReady(ev) {
    var loadTime = Date.now() - tPreloadStart;
    setTimeout(swapIn, interval - loadTime);
  }
  function swapIn() {
    var aratio = pimg.width / pimg.height;
    img.style.display = 'none';
    if( aratio > 448/273) {
      img.style.width = '448px';
      img.style.height = 'auto';
    }
    else {
      img.style.height = '273px';
      img.style.width = 'auto';
    }
    img.src = pimg.src;
    img.style.display = 'block';
    preloadNext();
  }

  //  When the first image is loaded
  function styleImg(ev) {
    img.attributes.removeNamedItem('width');
    img.attributes.removeNamedItem('height');
    img.style.position = 'static';
    img.style.margin = 'auto';
    img.style.cursor = 'pointer';
    img.onclick = goToAlbum;
  }

  //  When the image is clicked
  function goToAlbum(ev) {
    var m = ev.target.src.match(/staticflickr.com.\w*.(.+?)_/)
    if(!m) return;
    var imgid = m[1];
    window.location.href = 'https://www.flickr.com/photos/'+
      userid+'/'+imgid+'/in/album-'+albumid+'/';
  }
});
