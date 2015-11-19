import React, { Component, PropTypes } from 'react';
import lodash from 'lodash';
import jmEvent from './actionType';
import actions from './sharedfile-actions';
import FilePath from './FilePath';
import FilePathSplit from './FilePathSplit';

export default class FileNavigator extends Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }
  componentDidMount(){}
  componentWillUnmount(){}
  renderPath(){
    const paths = this.props.path.map(function(folder){
      return (
        <span>
          >
          <FilePath folder={folder} key={folder.id}/>
        </span>
      );
    });
    
    return paths;
  }
  render(){
    const Paths = this.renderPath();
    return (
      <div className="FileNavigation">
        {Paths}
      </div>
    );
  }
}

FileNavigator.propTypes = {
    path: PropTypes.array.isRequired,
}