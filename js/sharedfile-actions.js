var jmEvent = require('./actionType');
var $ = require('jquery');

var actions = {};

//File actions
actions.openFolder = function(folder){
    console.log('FILE_OPEN_FOLDER');
    $(window).trigger({
        type: jmEvent.FILE_OPEN_FOLDER,
        folder: folder
      });
};

actions.createFolder = function(name){
    console.log('FILE_CREATE_FOLDER');
    $(window).trigger({
      type: jmEvent.FILE_CREATE_FOLDER,
      name: name,
    });
};
actions.createFile = function(name){
    console.log('FILE_CREATE_FILE');
    $(window).trigger({
      type: jmEvent.FILE_CREATE_FILE,
      name: name,
    });
};

//Select a file or a folder
actions.selectItem = function(item){
    console.log('FILE_SELECT_ITEM');
    $(window).trigger({
      type: jmEvent.FILE_SELECT_ITEM,
      item: item,
    });
};

//Search files or folders
actions.selectFiles = function(keyword, root_id){
    var url = null;
    if (keyword == ''){
      url = `team/files/${root_id}/children`;
    }else{
      url = `team/files/${root_id}/children?keyword=${keyword}`;
    }
    console.log(url);
    console.log('FILE_SEARCH');
    $.ajax({
        method: 'GET',
        url: url,
        contentType: 'application/json'
    })
    .done(function( response ){
        console.log('FILE_SEARCH');
        $(window).trigger({
          type: jmEvent.FILE_SEARCH,
          files: response,
        });
    })
    .fail(function( response ){
        alert('search flies error');
    });  
};

actions.removeItem = function(item_id){
    console.log('FILE_REMOVE_ITEM');
    $(window).trigger({
        type: jmEvent.FILE_REMOVE_ITEM,
        item_id: item_id,
    });
};

actions.moveItem = function(item, folder){
    console.log('FILE_MOVE_ITEM');
    $(window).trigger({
      type: jmEvent.FILE_MOVE_ITEM,
      item: item,
      parent: folder
    });
};

module.exports = actions;
