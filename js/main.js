$(document).ready(function(){
  
  var apiKey        ='2fd41b49fedfd589dc265350521ab539',
      flickr        = 'https://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=',
      flickr_url    = flickr+apiKey,
      pictureSearch = $('#keyword');

      $('#search').click(function(){
        keyword = pictureSearch.val();
        search = flickr_url+'&tags='+keyword+'&jsoncallback=?';

        $('#feed').empty();


      $.getJSON(search, function(response){
            // console.log(response);
            $.each(response.photos.photo, function(i, photoInfo){
                
                var 
                    images = '<img src="http://farm'+photoInfo.farm+'.staticflickr.com/'+photoInfo.server+'/'+photoInfo.id+'_'+photoInfo.secret+'_s.jpg">';
                $('#feed').append(images)
                console.log(photoInfo);

            });

      });//ends JSON
    }); //ends .click
});