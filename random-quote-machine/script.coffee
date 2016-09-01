$(document).ready ->
  bk = []
  ch = 0
  at = $('.article')

  $.getJSON 'resources/tao-te-ching.json', (j) ->
    $.each j, (k, v) ->
      bk.push v
      return
    at.html bk[ch]
    return

  $('.new').on 'click', ->
    ch = Math.floor(Math.random() * (81 - 2)) + 2
    $(this).toggleClass 'dark'
    at.fadeOut 1364, ->
      at.html bk[ch]
      at.fadeIn 842
      return
    return
  return
