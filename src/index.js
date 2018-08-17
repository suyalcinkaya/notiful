import React from 'react';
import ReactDOM from 'react-dom';
import Editor from 'draft-js-plugins-editor';
import { EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import './index.css';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);

    let initialEditorState = null;
    const storeRaw = localStorage.getItem('notiful:editor-text');

    if(storeRaw) {
      const rawContentFromStore = convertFromRaw(JSON.parse(storeRaw));
      initialEditorState = EditorState.createWithContent(rawContentFromStore);
    } 
    else {
      initialEditorState = EditorState.createEmpty();
    }

    this.state = {
      editorState: initialEditorState,
      plugins: [createMarkdownShortcutsPlugin()]
    };

    this.onChange = (editorState) => {
      this.setState({ editorState });

      const contentRaw = convertToRaw(this.state.editorState.getCurrentContent());
      localStorage.setItem('notiful:editor-text', JSON.stringify(contentRaw));
    }

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  handleKeyCommand(command, editorState) {
    this.onChange(RichUtils.handleKeyCommand(editorState, command));
  }

  render() {
    return (
      <Editor editorState={this.state.editorState} onChange={this.onChange} handleKeyCommand={this.handleKeyCommand} plugins={this.state.plugins} />
    );
  }
}

ReactDOM.render( <MyEditor />, document.getElementById('app'));