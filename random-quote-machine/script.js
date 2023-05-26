$(document).ready(function() {

  const at = $('article');
  let bk = [];
  let ch = 0;

  $.getJSON('resources/tao-te-ching.json', function(j) {
    $.each(j, function(k, v) {
      bk.push(v);
    });
    at.html(bk[ch]);
  });

  $('.new').on('click', function() {
    ch = Math.floor(Math.random() * (81 - 2)) + 2;
    $('body').fadeOut(1364, function() {
      at.html(bk[ch]);
      $('body').fadeIn(842);
    });
  });
});
