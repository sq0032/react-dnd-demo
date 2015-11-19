import React, { Component, PropTypes } from 'react';
import lodash from 'lodash';
import jmEvent from './actionType';
import actions from './sharedfile-actions';
import {Button} from 'react-bootstrap';

export default class FileToolbar extends Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }
  componentDidMount(){}
  componentWillUnmount(){}
  handleCreateFile(){
    var name = prompt("Create file", "File Name");
    
    if (name != null) {
      actions.createFile(name);
    }
  }
  handleCreateFolder(){
    var name = prompt("Create folder", "Folder Name");
    
    if (name != null) {
      actions.createFolder(name);
    }
  }
  search(keyword){
    console.log(keyword);
    const root_id = this.props.path[0].id;
    actions.selectFiles(keyword, root_id);
  }
  render(){
    var folder_id = '0';
    if (this.props.path.length>0){
      const folder_id = this.props.path[this.props.path.length-1].id;
    }
    const url = `team/files/${folder_id}/children`;
    return (
      <div className="FileToolbar">
        <Button onClick={this.handleCreateFolder.bind(this)} className="btn btn-default">
            Create Folder
        </Button>
        <Button onClick={this.handleCreateFile.bind(this)} className="btn btn-default">
            Create File
        </Button>
        <div className="FileSearchBar">
        </div>
      </div>
    );
  }
}

FileToolbar.propTypes = {
    selected_file: PropTypes.object,
    path: PropTypes.array.isRequired,
}

