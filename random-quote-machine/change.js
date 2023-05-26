$(document).ready(function() {
  var book = [], chapter = 0;

  $.getJSON('tao-te-ching.json', function(json) {
    $.each(json, function(key, val) {
      book.push(val);
    });
    $('article').html(book[chapter]);
  });
  console.log(book);

  $('.random').on('click', function() {
    chapter = Math.floor(Math.random() * (81 - 2)) + 2;
    $(this).toggleClass('alt-dark');
    $('body').toggleClass('alt-light');
    $('article').fadeOut(1364.000733092, function() {
     $('article').html(book[chapter]);
     $('body').animate({ scrollTop: 0 }, 521.0019193625);
     $('article').fadeIn(842.998813731);
  });

    console.log('Current chapter: ' + (chapter + 1));
    console.log(book[chapter]);
  });
});
