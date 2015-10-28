import React, { Component, PropTypes } from 'react';
import lodash from 'lodash';
import FileFolder from './FileFolder';
import FileItem from './FileItem';
import FileHeader from './FileHeader';

let style = {};

export default class FileContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      sort_method: null
    };
  }
  renderItems(){
    const that = this;
    const selected_file = this.props.selected_file;
    var Items = this.props.files.filter(function(file){
      console.log(that.props.folder);
      return file.parent == that.props.folder.id;
    });
    console.log(Items);
    Items = Items.map(function(item){
      const is_selected = selected_file && (item.id == selected_file.id);
      console.log(item.type);
      if (item.type=='folder'){
        return (
          <FileFolder folder={item} key={item.id} is_selected={is_selected}/>
        );
      }else{
        return (
          <FileItem file={item} key={item.id} is_selected={is_selected}/>
        );
      }
    });
    return Items;
  }
  render(){
    const Items = this.renderItems();
    return (
      <table className="FileTable table table-hover" style={style.container}>
        <thead className="FileHeader">
            <FileHeader />
        </thead>
        <tbody className="FileList table table-hover">
            {Items}
        </tbody>
      </table>
    );
  }
}

style = {
  container:{
//    padding: '15px'
  }
};

FileContainer.propTypes = {
    search_keyword: PropTypes.string.isRequired,
    files: PropTypes.array.isRequired,
    selected_file: PropTypes.object,
}

