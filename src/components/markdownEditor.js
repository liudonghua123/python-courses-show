import React, { Component } from "react";

// https://github.com/rexxars/react-markdown
import ReactMarkdown from 'react-markdown'

class MarkdownEditor extends Component {

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

  urlTransform = (uri) => {
    const { filePath } = this.props;
    // 如果是绝对路径，则不作处理
    if(uri.startsWith('http') || uri.startsWith('/')) {
      return uri;
    }
    return filePath.match(/.*\//) + uri;
  }

  render() {
    return (
      <ReactMarkdown
        source={this.state.content}
        transformImageUri={this.urlTransform}
        transformLinkUri={this.urlTransform} />
    );
  }
}

export default MarkdownEditor;
