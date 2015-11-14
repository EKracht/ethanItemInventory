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
  var $inputName = $target.prev().prev().prev();
  var $inputValue = $target.prev().prev();
  var $inputDescription = $target.prev();
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



  // var $target = $(e.target);
  // var $container = $target.closest('.container');
  // var id = $container.data('value');
  // var stringUrl = '/rooms/' + id;
  // var stringArray = stringUrl.split("\"");
  // var roomId = stringArray.join("");

  // // var itemGrab = $('.inputItem').val();
  // var itemId = $(`'${item.name}'`).data('id');
  // console.log(itemId);

  // $('input').val('');

  // $.post('/' + roomId + '/addItem/', {name: roomName})
  // .done(function(data){
  //   console.log('hit in add');
  //   console.log('name', data.name);
  //   var $room = $('#sample').clone();
  //   $room.removeAttr('id').attr('data-value', data._id);
  //   $room.find('.panel-heading').addClass(data.name);
  //   $('#bigContainer').append($room);
  //   location.reload();
  // })
  // .fail(function(err){
  // })

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



function saveEdit(){
  var message = {};
  message.name = $('#editName').val();
  message.posted = $('#editMessage').val();
  message.time = Date.now();
  message.change = timeChange;

  $('input').each(function(index, input){
    $(input).val('');
  });

  $.ajax({
    url: '/messageBoard',
    type: 'PUT',
    data: message
  })
  .done(function(data){
    console.log(data);
    $('#messageList').children("tr:nth-child(" + parseInt(index.value + 1) + ")").replaceWith(messageRow(message));
  })
  .fail(function(err){
    console.log(err);
  })
}

function openModalEdit(e){
  var $target = $(e.target);
  var $tr = $target.closest('tr');
  index.value = $tr.index();
  var $targetRow = $target.closest('tr');
  var $tdName = $targetRow.children('.name');
  var $tdMessage = $targetRow.children('.posted');
  var $tdTime = $targetRow.children('.time');
  $('.editName').val($tdName.text());
  $('.editMessage').val($tdMessage.text());
  timeChange = $tdTime.text();
}

