import React, { Component, PropTypes } from 'react';
import lodash from 'lodash';
import { DragSource, DropTarget } from 'react-dnd';

import { jmItemTypes } from './jmItemTypes';
import jmEvent from './actionType';
import actions from './sharedfile-actions';

let style = {};

const fileTarget = {
  hover(props, monitor, component){
  },
  
  drop(props, monitor){
    const item = monitor.getItem();
    const file = item.file;
    const folder = props.folder;
    
    actions.moveItem(file, folder);
  }
};

function targetCollect(connect, monitor){
  return {
    connectDropTarget: connect.dropTarget(),
    isHovering: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }
}

class FilePath extends Component{
  constructor(props){
    super(props);
  }
  handleClick(){
    actions.openFolder( this.props.folder );
  }
  render(){
    const {connectDropTarget, isHovering, canDrop} = this.props;
    console.log(`canDrop ${canDrop}`);
    const dropStyle = canDrop ? style.canDrop : null;
    
    return connectDropTarget((
        <span className="sharedfile-path" onClick={this.handleClick.bind(this)} style={dropStyle}>
            {this.props.folder.name} 
        </span>
        
    ));
  }
}

style = {
  base: {
    cursor: 'pointer',
    marginRight: '3px'
  },
  canDrop:{
    backgroundColor: '#aff'
  }
};

FilePath.propTypes = {
    folder: PropTypes.object.isRequired,
}

export default DropTarget(jmItemTypes.FILE, fileTarget, targetCollect)(FilePath);
