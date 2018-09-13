import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";

// Tree implementation
// https://github.com/liudonghua123/react-nested-file-tree
import NavigationTree from "./components/navigationTree";
// https://github.com/frontend-collective/react-sortable-tree-theme-file-explorer
import Tree from "./components/tree";
// https://github.com/pqx/react-ui-tree/
import NavTree from "./components/navTree";

// Content editor (readonly)
// see https://github.com/securingsincity/react-ace#basic-usage
// import AceEditor from "react-ace";
// import brace from "brace";
// import "brace/mode/python";
// import "brace/theme/github";
import CodeEditor from './components/codeEditor';
import MarkdownEditor from './components/markdownEditor';
import config from './config';
// https://github.com/wojtekmaj/react-pdf
import { Document, Page, Outline } from 'react-pdf';
// https://github.com/javascriptiscoolpl/npm-simple-react-pdf
import {SimplePDF} from "simple-react-pdf";
// https://github.com/McRipper/react-pdf-js-infinite
import PDF from 'react-pdf-js-infinite';

// https://github.com/plangrid/react-file-viewer
import FileViewer from 'react-file-viewer';

// https://github.com/gerhardsletten/react-reader/
import {ReactReader} from 'react-reader'

class App extends Component {
  state = {
    active: null,
    content: "",
    filename: 'dumb.py',
    selectedFile: '',
    contents: '',
    numPages: null,
    pageNumber: 1,
    filePath: ''
  };
  
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  onLeafNodeClick = async rowInfo => {
    // console.info(`clicked ${JSON.stringify(rowInfo)}`);
    const node = rowInfo.node;
    this.setState({
      active: node,
      filename: node.title,
      selectedFile: node.path,
      filePath: config.host + node.path
    });
  }

  onClickNode = async node => {
    console.info(`clicked ${JSON.stringify(node)}`);
    let response = await fetch(config.host + node.path);
    response = await response.text();
    // console.info(`response is ${response}`)
    this.setState({
      active: node,
      content: response,
      filename: node.name,
      selectedFile: node.path,
      filePath: config.host + node.path
    });
  };

  onError(e) {
    console.error(e, 'error in file-viewer');
  }

  render() {
    let renderComponent;
    const extension = this.state.filename.split('.').pop().toLowerCase();
    switch(extension) {
      case 'png':
      case 'jpg':
      case 'gif':
      case 'jpeg':
      case 'webp':
      case 'bmp':
      // case 'pdf':
      case 'csv':
      // case 'xls':
      case 'xlsx':
      // case 'rtf':
      // case 'doc':
      case 'docx':
      case 'mp4':
      // case 'mov':
      // case 'avi':
      case 'webm':
      case 'mp3':
      case 'wexbim':
        renderComponent = (
          <FileViewer
            // style={{'height': '90vh', 'width': '100%', 'overflow': 'auto'}}
            fileType={extension}
            filePath={this.state.filePath}
            onError={this.onError}
          />
        )
        break;
      case 'epub':
        renderComponent = (
            <ReactReader
              url={this.state.filePath}
            />
        )
        break;
      case 'md':
        renderComponent = (
          <MarkdownEditor
            filePath={this.state.filePath} />
        )
        break;
      case 'png':
      case 'jpg':
      case 'gif':
        renderComponent = (
          <img src={this.state.filePath} style={{'min-height': '100px', 'max-height': '500px'}}/>
        )
        break;
      case 'pdf':
        const { pageNumber, numPages } = this.state;
        renderComponent = (
          <SimplePDF file={this.state.filePath}/>
        )
        break;
      case 'py':
      case 'pyw':
      case 'java':
      case 'c':
      case 'cpp':
      case 'rb':
      case 'js':
      case 'txt':
        renderComponent = (
          <CodeEditor
            filePath={this.state.filePath}
            mode="python"
            theme="github"
          />
        )
        break;
      default:
        renderComponent=(
          <div class="shadow-sm p-3 mb-5 bg-white rounded">
            <p>不支持预览<a href={this.state.filePath}><span class="font-weight-bold">{this.state.filename}</span></a></p>
          </div>
        )
        break;
    }
    return (
      <div className="App">
        <Header />
        <div className="container-fluid">
          <div className="row flex-xl-nowrap">
            <div className="col-12 col-md-3 col-xl-3 bd-sidebar my-sidebar">
              <Tree
                onLeafNodeClick={this.onLeafNodeClick}
              />
            </div>
            <div className="col-12 col-md-9 col-xl-9 bd-content my-content" role="main">
              {renderComponent}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
