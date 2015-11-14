'use strict';

$(document).ready(init);

var index = {};
var timeChange = 0;

function init(){
  $('#addRoom').on('click', addRoom);
  $('.addItem').on('click', addItem);
  $('.deleteRoom').on('click', deleteRoom);
  $('.deleteItem').on('click', deleteItem);
}

function deleteItem(e){
  var $target = $(e.target);
  var $li = $target.next();
  var liId = $li.data('id');
  var stringUrl = '/items/' + liId;
  var stringArray = stringUrl.split("\"");
  var url = stringArray.join("");

  $.ajax({
    url: url,
    type: "DELETE"
  })
  .done(function(data){
    $target.remove();
    $li.remove();
  })
  .fail(function(err){
  })
}

function addItem(e){
  var $target = $(e.target);
  var $inputName = $target.next().next().next();
  var $inputValue = $target.next().next().next().next();
  var $inputDescription = $target.next().next().next().next().next();
  var itemName = $inputName.val();
  var itemValue = $inputValue.val();
  var itemDescription = $inputDescription.val();
  var item = {
              name: itemName,
              value: itemValue,
              description: itemDescription
            };

  console.log(item);

  var $container = $target.closest('.container');
  var id = $container.data('value');
  var stringUrl = '/rooms/' + id;
  var stringArray = stringUrl.split("\"");
  var roomId = stringArray.join("");

  console.log(roomId);

  $.post('/items', item)
    .done(function(item){
      console.log('post', item._id);
      var itemId = item._id;
      $.ajax({
        url: roomId + '/addItem/' + item._id,
        type: 'PUT',
      })
      .done(function(data){ 
        location.reload();
      })
      .fail(function(err){
        console.log(err);
      })
    })
    .fail(function(err){
      console.log(err);
    })
}

function deleteRoom(e){
  var $target = $(e.target);
  console.log($target);
  var $container = $target.closest('.container');
  console.log($container);
  var id = $container.data('value');
  var stringUrl = '/rooms/' + id;
  var stringArray = stringUrl.split("\"");
  var url = stringArray.join("");

  $.ajax({
    url: url,
    type: "DELETE"
  })
  .done(function(data){
    $container.remove();
  })
  .fail(function(err){
  })
}

function addRoom(){
  var roomName = $('#inputRoom').val();

  $('input').val('');

  $.post('/rooms', {name: roomName})
  .done(function(data){
    console.log('hit in add');
    console.log('name', data.name);
    var $room = $('#sample').clone();
    $room.removeAttr('id').attr('data-value', data._id);
    $room.find('.panel-heading').addClass(data.name);
    $('#bigContainer').append($room);
    location.reload();
  })
  .fail(function(err){
    console.log(err);
  })
}
