$(document).ready(function(){

  $('main div').hide();
  $('main div.active').show();

  var current_gallery = '#feature';
  
  var apiKey        ='2fd41b49fedfd589dc265350521ab539';

  $('nav a').click(function(event){
    event.preventDefault();

    var checkid=$(this).attr('href');

      if (checkid === current_gallery) {
        console.log('itsa same mario!');
      } else {
        current_gallery = checkid;

        if ($(checkid).data('visited') === 0) {

          $('main div').removeClass('active');
          $('main div').not(checkid).hide();

          var photoset_id   = $(this).data('photoset-id') ,
              flickrSearch  = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key='+apiKey+'&photoset_id='               +photoset_id+'&format=json&jsoncallback=?',
              targetGallery = $(this).attr('href');

          $.getJSON(flickrSearch, function(response){
                  // console.log(response);
            $(targetGallery).empty();

            $.each(response.photoset.photo, function(i, photoInfo){
                
              var image = '<img class="photoz" src="http://farm'+photoInfo.farm+'.staticflickr.com/'+photoInfo.server+'/'+photoInfo.id+'_'+photoInfo.secret+'.jpg">';
          
              $(targetGallery).append(image);
            });

            $(targetGallery).addClass('active');
            $('main div.active').show();


            imagesLoaded( checkid, function(){
              var $container = $(checkid);
              // initialize
              $container.masonry({
                itemSelector: '.photoz'
              });
            });

            var count = $(checkid).data('visited');
            $(checkid).data('visited', ++count);

          });//ends JSON


        } else {

          $('main div').removeClass('active');
          $('main div').hide();
          $(checkid).addClass('active');
          $('main div.active').show(); 
          console.log('visit gallery seond time');

        }
      } //else ends

    // $(checkid).masonry('reload', {
    //   itemSelector: '.photoz'
    // });
    

  }); //ends click fucntion
    


});