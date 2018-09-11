import React, { Component } from "react";

// see https://github.com/securingsincity/react-ace#basic-usage
import AceEditor from "react-ace";
import brace from "brace";
import "brace/mode/python";
import "brace/theme/github";

class CodeEditor extends Component {

  state = {
    content: ''
  }

  async componentWillReceiveProps(props) {
    const { filePath } = this.props;
    if(filePath) {
      console.info(`requesting resources ${filePath}`);
      let response = await fetch(filePath);
      response = await response.text();
      console.info(`got content ${response}`);
      this.setState({content: response});
    }
  }

  render() {
    return (
      <AceEditor
        value={this.state.content}
        mode="python"
        theme="github"
        name="ace_editor"
        editorProps={{ $blockScrolling: true }}
        setOptions={{ useWorker: false }}
        readOnly
        width="100%"
        height="100vh"
        fontSize={20}
    />  
    );
  }
}

export default CodeEditor;
