'use strict';

$(document).ready(init);

function init() {
  $('#submit').click(addClog);
  $('#clogList').on('click', 'i.delete', deleteClog);
}

function deleteClog(e){
  console.log(e.target);
}

function addClog() {
  var clog = {};
  clog.name = $('input#name').val();
  clog.cost = $('input#cost').val();
  clog.material = $('input#material').val();
  clog.quality = $('input#quality').val();

  $('input').each(function(index, input) {
    $(input).val('');
  });

  $.post('/clogs', clog)
  .done(function(data){
    var $clogRow = clogRow(clog);
    $('#clogList').append($clogRow);
  })
  .fail(function(err){
    console.error(err);
  });
}

function clogRow(clog) {
  var $tr = $('<tr>');
  var $name = $('<td>').addClass('name').text(clog.name)
  var $cost = $('<td>').addClass('cost').text(clog.cost)
  var $quality = $('<td>').addClass('quality').text(clog.quality)
  var $material = $('<td>').addClass('material').text(clog.material)

  var $editTd = $('<td>').addClass('edit text-center');
  var $editIcon = $('<i>').addClass('fa fa-pencil-square-o fa-lg');
  $editTd.append($editIcon);
  
  var $deleteTd = $('<td>').addClass('delete text-center');
  var $deleteIcon = $('<i>').addClass('fa fa-trash-o fa-lg');
  $deleteTd.append($deleteIcon);

  $tr.append($name, $cost, $quality, $material, $editTd, $deleteTd);
  return $tr;
}
 
