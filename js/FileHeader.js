import React, { Component, PropTypes } from 'react';
import lodash from 'lodash';

export default class FileHeader extends Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }
  componentDidMount(){}
  componentWillUnmount(){}
  render(){
    return (
        <thead className="FileHeader">
            <tr>
                <th className="file-icon"> </th>
                <th className="file-name">Name</th>
                <th className="file-remove-icon"> </th>
            </tr>
        </thead>
    );
  }
}

FileHeader.propTypes = {
}