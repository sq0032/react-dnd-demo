import React from 'react';
import FileApp from './FileApp';
require('../css/sharedfile-css.css');


const rootEl = document.getElementById('root');

var root = {
  id: 1,
  name: "root",
  parent: 0,
  type: "folder"
}

React.render(
  <FileApp root={root}/>,
  rootEl
);