import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import lodash from 'lodash';

import jmEvent from './actionType';
import actions from './sharedfile-actions';
import FileToolbar from './FileToolbar';
import FileContainer from './FileContainer';
import FileNavigator from './FileNavigator';

export default class FileApp extends Component{
  constructor(props){
    super(props);
    this.state = {
      path: [this.props.root],
      files: [this.props.root],
      selected_file: null,
      search_keyword: ''
    };
  }
  componentDidMount(){
    $(window)
      .on(jmEvent.ATTACHMENT_DONE, {this:this}, this.on_uploadFile)    
      .on(jmEvent.FILE_CREATE_FOLDER, {this:this}, this.on_createFolder)    
      .on(jmEvent.FILE_CREATE_FILE, {this:this}, this.on_createFile)
      .on(jmEvent.FILE_SEARCH, {this:this}, this.on_searchFiles)    
      .on(jmEvent.FILE_REMOVE_ITEM, {this:this}, this.on_removeItem)    
      .on(jmEvent.FILE_MOVE_ITEM, {this:this}, this.on_moveItem)    
      .on(jmEvent.FILE_SELECT_ITEM, {this:this}, this.on_selectItem)    
      .on(jmEvent.FILE_OPEN_FOLDER, {this:this}, this.on_openFolder);
    
    //Initial file fetch (passing in root id)
    actions.openFolder(this.props.root);
  }
  componentWillUnmount(){
    $(window)
      .off(jmEvent.ATTACHMENT_DONE, this.on_uploadFile)
      .off(jmEvent.FILE_CREATE_FOLDER, this.on_createFolder)
      .off(jmEvent.FILE_CREATE_FILE, this.on_createFile)
      .off(jmEvent.FILE_SEARCH, this.on_searchFiles)
      .off(jmEvent.FILE_REMOVE_ITEM, this.on_removeItem)
      .off(jmEvent.FILE_MOVE_ITEM, this.on_moveItem)
      .off(jmEvent.FILE_SELECT_ITEM, this.on_selectItem)
      .off(jmEvent.FILE_OPEN_FOLDER, this.on_openFolder);
  }
  on_moveItem(event){
    const that = event.data.this;
    const item = event.item;
    const parent = event.parent;
    const current_folder = that.state.path[that.state.path.length-1];
    
    var files = lodash.cloneDeep(that.state.files);
    
    for (let i = 0; i < files.length; i++){
      if (files[i].id == item.id){
        files[i].parent = parent.id
      }
    }
    
    that.setState({files:files});
  }
  on_removeItem(event){
    const that = event.data.this;
    const item_id = event.item_id;
    
    const files = that.state.files.filter(function(file){
       return file.id != item_id;
    });
    
    that.setState({files:files});
  }
  on_searchFiles(event){
    //Update files and all the descendant components
    const that = event.data.this;
    const files = event.files;

    //Set state and rerender
    that.setState({files:files});
  } 
  on_selectItem(event){
    const that = event.data.this;
    const item = event.item;
    
    that.setState({selected_file:item});
  }
  on_uploadFile(event){
    const that = event.data.this;
    const file = event.upload.result;
    var files = lodash.cloneDeep(that.state.files);
    const current_folder = that.state.path[that.state.path.length-1];

    if (file.parent == current_folder.id){
      files.push(file);
    }
    that.setState({files:files});
  }
  on_createFolder(event){
    const that = event.data.this;
    const name = event.name;
    var files = lodash.cloneDeep(that.state.files);
    
    const folder = {
      id: Math.floor(Math.random()*1000000),
      name: name,
      parent: that.state.path[that.state.path.length-1].id,
      type: "folder"
    };
    files.push(folder);
    
    console.log(files);
    that.setState({files:files});
  }
  on_createFile(event){
    const that = event.data.this;
    const name = event.name;
    var files = lodash.cloneDeep(that.state.files);
    
    const folder = {
      id: Math.floor(Math.random()*1000000),
      name: name,
      parent: that.state.path[that.state.path.length-1].id,
      type: "file"
    };
    files.push(folder);
    
    console.log(files);
    that.setState({files:files});
  }
  on_openFolder(event){
    //Update files and all the descendant components
    const that = event.data.this;
//    const files = event.files;
    const folder = event.folder;
    var path = lodash.cloneDeep(that.state.path);

    //Update path
    var index = -1;
    for (let i = 0; i < path.length; i++){
      if (path[i].id == folder.id){
        index = i;
        break;
      }
    }
    
    if (index == -1){
      path.push(folder);
    }else{
      path.splice(index+1);
    }
    
    //Set state and rerender
//    that.setState({files:files});
    that.setState({path:path});
  }
  
  render(){
    return (
        <div className="FileApp">
            <FileToolbar 
                selected_file = {this.state.selected_file}
                path = {this.state.path}
            />
            <FileNavigator 
                path = {this.state.path}
            />
            <FileContainer 
                selected_file = {this.state.selected_file}
                folder = {this.state.path[this.state.path.length-1]}
                files = {this.state.files}
                search_keyword = {this.state.search_keyword}
            />
        </div>
    );
  }
}

FileApp.propTypes = {
    root: PropTypes.object.isRequired,
}

export default DragDropContext(HTML5Backend)(FileApp);