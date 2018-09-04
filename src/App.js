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
import AceEditor from "react-ace";
import brace from "brace";
import "brace/mode/python";
import "brace/theme/github";
import config from './config';
// https://github.com/rexxars/react-markdown
import ReactMarkdown from 'react-markdown'
// https://github.com/wojtekmaj/react-pdf
import { Document, Page, Outline } from 'react-pdf';
// https://github.com/javascriptiscoolpl/npm-simple-react-pdf
import spdf from "simple-react-pdf";
// https://github.com/McRipper/react-pdf-js-infinite
import PDF from 'react-pdf-js-infinite';

class App extends Component {
  state = {
    active: null,
    content: "",
    tree: {_contents: []},
    selectFile: '',
    contents: '',
    numPages: null,
    pageNumber: 1,
    filePath: ''
  };
  
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  async componentDidMount() {
    const response = await fetch(config.api);
    const tree = await response.json();
    console.info(`tree is ${JSON.stringify(tree)}`)
    this.setState({tree: tree});
  }

  // onClickNode = node => {
  //   console.info(`clicked ${JSON.stringify(node)}`);
  //   fetch(config.host + node.path)
  //   .then(response => response.text())
  //   .then(response => {
  //     console.info(`response is ${response}`)
  //     this.setState({
  //       active: node,
  //       content: response
  //     });
  //   });
  // };

  onClickNode = async node => {
    console.info(`clicked ${JSON.stringify(node)}`);
    let response = await fetch(config.host + node.path);
    response = await response.text();
    // console.info(`response is ${response}`)
    this.setState({
      active: node,
      content: response,
      selectFile: node.name,
      filePath: config.host + node.path
    });
  };

  render() {
    let renderComponent;
    const extension = this.state.selectFile.split('.').pop();
    switch(extension) {
      case 'md':
        renderComponent = (
          <ReactMarkdown source={this.state.content} />
        )
        break;
      case 'png':
      case 'jpg':
      case 'gif':
        renderComponent = (
          <img src={this.state.filePath} style={{'height': '500px'}}/>
        )
        break;
      case 'pdf':
        const { pageNumber, numPages } = this.state;
        console.info(`render pdf ${this.state.filePath}, ${pageNumber} of ${numPages}`)
        renderComponent = (
          <div className="pdf-container">
             {/* <Document
               className="pdf-document"
               file={this.state.filePath}
               onLoadSuccess={this.onDocumentLoadSuccess}
               >
               <Page 
                 className="pdf-page"
                 width={350}
                 renderMode="svg"
                 pageNumber={pageNumber} />
             </Document>
             <p className="pdf-indicator">Page {pageNumber} of {numPages}</p> */}
             <PDF file={this.state.filePath} scale={1.25} />
          </div>
        )
        break;
      default:
      renderComponent=(
        <AceEditor
          value={this.state.content}
          mode="python"
          theme="github"
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          setOptions={{ useWorker: false }}
          readOnly
          width="100%"
          fontSize={20}
        />  
      )
      break;
    }
    return (
      <div className="App">
        <Header />
        <div className="container-fluid">
          <div className="row flex-xl-nowrap">
            <div className="col-12 col-md-3 col-xl-3 bd-sidebar my-sidebar">
              <NavigationTree
                directory={this.state.tree}
                selectedFilePath={this.state.filePath}
                fileClickHandler={this.onClickNode}
              />
            </div>
            <main className="col-12 col-md-9 col-xl-9 bd-content my-content" role="main">
              {renderComponent}
            </main>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
