$(function() {
  
    $('.fade_in').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
      console.log(isInView);
      if (isInView) {
        $(this).stop().addClass('fade_in_anime');
      } else {
        $(this).stop().removeClass('fade_in_anime');
      }
    });
  
    $('.up').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
      if (isInView) {
        $(this).addClass('up_anime');
      } else {
        $(this).removeClass('up_anime');
      }
    });
  
    $('.side').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
      if (isInView) {
        $(this).addClass('side_anime');
      } else {
        $(this).removeClass('side_anime');
      }
    });
  
  });