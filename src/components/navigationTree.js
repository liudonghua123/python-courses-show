import React, { Component } from 'react';
import NestedFileTreeView from '@liudonghua123/react-nested-file-tree'
import '@liudonghua123/react-nested-file-tree/dist/default.css'

class NavigationTree extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedFile: ''
    }
  }  

  handleFileClick = (file) => {
    console.log(file)
    // this.setState({ selectedFile: file.path })
  }

  handleFolderClick = (folderName) => {
    console.log(folderName)
  }

  render () {
    const { directory, fileClickHandler, selectedFilePath, folderClickHandler } =  this.props;
    return (
      <NestedFileTreeView
        selectedFilePath={selectedFilePath}
        fileClickHandler={fileClickHandler}
        folderClickHandler={this.folderClickHandler}
        directory={directory} />
    )
  }
}
export default NavigationTree;