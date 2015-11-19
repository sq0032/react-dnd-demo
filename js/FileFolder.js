import React, { Component, PropTypes } from 'react';
import lodash from 'lodash';
import { DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';

import { jmItemTypes } from './jmItemTypes';
import actions from './sharedfile-actions';

let style = {};

///////////////////////////////////////////
//    React-dnd DragSource functions     //
///////////////////////////////////////////
const fileSource = {
  beginDrag(props){
    return {file: props.folder};
  },
  
  endDrag(props, monitor){
  }
};

///////////////////////////////////////////
//    React-dnd DropTarget functions     //
///////////////////////////////////////////
const fileTarget = {
  hover(props, monitor, component){
  },
  
  drop(props, monitor){
    const item = monitor.getItem();
    const source_folder = item.file;
    const target_folder = props.folder;
    
    actions.moveItem(source_folder, target_folder);
  },
  
  canDrop(props, monitor){
    const item = monitor.getItem();
    const source_folder = item.file;
    const target_folder = props.folder;
    
    return source_folder.id != target_folder.id;
  }
};

/////////////////////////////////////
//    React-dnd Props binding      //
/////////////////////////////////////
@DropTarget(jmItemTypes.FILE, fileTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isHovering: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
@DragSource(jmItemTypes.FILE, fileSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class FileFolder extends Component{
  constructor(props){
    super(props);
    this.state = {
      is_show_menu: false,
      is_hover_div: false,
      is_hover_link: false
    };
  }
  handleMouseEnterDiv(){
    this.setState({is_hover_div:true});
  }
  handleMouseLeaveDiv(){
    this.setState({is_hover_div:false});
  }  
  handleOpenFolder(){
    actions.openFolder(this.props.folder);
  }
  handleMouseEnterLink(){
    this.setState({is_hover_link:true});
  }
  handleMouseLeaveLink(){
    this.setState({is_hover_link:false});
  }
  handleSelectFolder(e){
    console.log('Select folder');
    e.stopPropagation();
    const folder = this.props.folder;
    actions.openFolder(this.props.folder);
//    actions.selectItem(folder);
  }
  handleRemove(e){
    e.stopPropagation();
    const num_files = this.props.folder.children.length;
    var r = null;

    if (num_files > 0){
      r = confirm(`Delete folder "${this.props.folder.name}" and ${num_files} files under this folder?`);
    }else{
      r = confirm(`Delete folder "${this.props.folder.name}"?`);
    }
    
    if (r == true) {
      const folder_id = this.props.folder.id;
      actions.removeItem(folder_id);
    }
  }  
  render(){
    const {connectDropTarget, isHovering, canDrop, connectDragSource, isDragging} = this.props;
    const dropStyle = canDrop ? style.canDrop : null;
    const divStyle = this.state.is_hover_div ? style.item.hover : style.item.normal;
    const linkStyle = this.state.is_hover_link ? style.link.hover : null;
    const selectedStyle = this.props.is_selected ? style.selected : null;
    
    
    return connectDragSource(connectDropTarget((
      <tr className="FileItem"
        style={{...divStyle, ...selectedStyle, ...dropStyle}}
        onMouseEnter={this.handleMouseEnterDiv.bind(this)}
        onMouseLeave={this.handleMouseLeaveDiv.bind(this)}
        onClick={this.handleSelectFolder.bind(this)}
      >
        <td ref="icon" className="file-icon">
          <img style={style.icon}/>
          <p style={style.filetype}></p>
        </td>
        <td ref="name" className="file-name">
          <span
            style={linkStyle}
            onMouseEnter={this.handleMouseEnterLink.bind(this)}
            onMouseLeave={this.handleMouseLeaveLink.bind(this)}
            onClick={this.handleOpenFolder.bind(this)}
          >
            {this.props.folder.name}
          </span>
        </td>
        <td
          ref="remove"
          onClick={this.handleRemove.bind(this)}
          className="file-remove-icon glyphicon glyphicon-remove"></td>
      </tr>
    )));
  }
}

style = {
  item:{
    normal:{
      cursor: 'pointer',
      lineHeight: '32px',
      position: 'relative',
      marginBottom: '5px',
    },
    hover:{
      cursor: 'pointer',
      lineHeight: '32px',
      position: 'relative',
      marginBottom: '5px',
      backgroundColor: '#eee'
    }
  },
  link:{
    normal:{
      cursor: 'pointer',
      color: 'black'
    },
    hover:{
      cursor: 'pointer',
      textDecoration: 'underline',
      color: 'black'
    }
  },
  icon:{
    width: '32px',
    height: '32px',
    backgroundColor: 'yellow',
    marginRight: '5px',
  },
  filetype:{
    position: 'absolute',
    top: '7px',
    display: 'inline',
    fontFamily: 'cursive',
    left: '17px',
  },
  selected:{
    backgroundColor: '#aee'
  },
  canDrop:{
    backgroundColor: '#aff'
  }
};

FileFolder.propTypes = {
    folder: PropTypes.object.isRequired,
    is_selected: PropTypes.bool.isRequired
}

FileFolder.defaultProps = { is_selected: false };