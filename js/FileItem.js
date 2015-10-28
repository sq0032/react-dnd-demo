import React, { Component, PropTypes } from 'react';
import lodash from 'lodash';
import { DragSource, DropTarget } from 'react-dnd';

import { jmItemTypes } from './jmItemTypes';
import actions from './sharedfile-actions';

let style = {};

///////////////////////////////////////////
//    React-dnd DragSource functions     //
///////////////////////////////////////////
const fileSource = {
  beginDrag(props){
    return {file: props.file};
  },
  endDrag(props, monitor){
    console.log(`endDrag: ${props.file.name}`);
  }
};

var file_collect = function(connect, monitor){
  return {
    connectDragSource: connect.dragSource(),
//    isDragging: monitor.isDragging()    
  };
};

@DragSource(jmItemTypes.FILE, fileSource, file_collect)
export default class FileItem extends Component{
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
  handleMouseEnterLink(){
    this.setState({is_hover_link:true});
  }
  handleMouseLeaveLink(){
    this.setState({is_hover_link:false});
  }
  handleSelectFile(e){
    e.stopPropagation();
    const file = this.props.file;
    
//    actions.selectItem(file);
    console.log('Select File');
  }
  handleRemove(e){
    e.stopPropagation();
    
    var r = confirm(`Delete ${this.props.file.name}?`);
    if (r == true) {
      const file_id = this.props.file.id;
      actions.removeItem(file_id);
    }
  }
  render(){
    const itemStyle = this.state.is_hover_div ? style.item.hover : style.item.normal;
    const linkStyle = this.state.is_hover_link ? style.link.hover : style.link.normal;
    const selectedStyle = this.props.is_selected ? style.selected : null;
    const upload_datetime = new Date(this.props.file.upload_datetime).toDateString();
    const filetype = this.props.file.filetype ? this.props.file.filetype.name : 'file'

    const { connectDragSource } = this.props;
    return connectDragSource((
      <tr
        className="FileItem" 
        style={{...itemStyle, ...selectedStyle}}
        onMouseEnter={this.handleMouseEnterDiv.bind(this)} 
        onMouseLeave={this.handleMouseLeaveDiv.bind(this)}
        onClick={this.handleSelectFile.bind(this)}
      >
        <td className="file-icon">
            <img style={style.icon}/>
            <p style={style.filetype}>{filetype}</p>
        </td>
        <td className="file-name">
          <a
            href={this.props.file.file}
            target="_blank"
            style={linkStyle}
            onMouseEnter={this.handleMouseEnterLink.bind(this)} 
            onMouseLeave={this.handleMouseLeaveLink.bind(this)}
          >
            {this.props.file.name}
          </a>
        </td>
        <td 
            onClick={this.handleRemove.bind(this)}
            className="file-remove-icon glyphicon glyphicon-remove">
        </td>
      </tr>
    ));
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
    position: 'relative',
    width: '32px',
    height: '32px',
    backgroundColor: 'pink',
    marginRight: '5px',
  },
  filetype:{
    position: 'absolute',
    top: '-5px',
    display: 'inline',
    fontFamily: 'cursive',
    left: '2px',
  },
  selected:{
    backgroundColor: '#aee'
  }  
};

FileItem.propTypes = {
    file: PropTypes.object.isRequired,
    is_selected: PropTypes.bool.isRequired
}

//export default DragSource(jmItemTypes.FILE, fileSource, sourceCollect)(FileItem);
