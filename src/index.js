import React from 'react';
import ReactDOM from 'react-dom';
import Editor from 'draft-js-plugins-editor';
import { EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import 'draft-js-emoji-plugin/lib/plugin.css';
import createStrikePlugin from './strikePlugin';
import './assets/fonts/fonts.css';
import './index.css';

const strikePlugin = createStrikePlugin();
const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions } = emojiPlugin;
const linkifyPlugin = createLinkifyPlugin();

class MyEditor extends React.Component {
  constructor(props) {
    super(props);

    let initialEditorState = null;
    const storeRaw = localStorage.getItem('notiful:editor-text');
    const initialRaw = '{"blocks":[{"key":"177nl","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"74dtg","text":"Oh, great you are here :-)","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"a0e1u","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"e3r","text":"Thank you for downloading Notiful.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2b30s","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"56osb","text":"Notiful is a minimal and clean tab extension for taking notes. Got something on your mind? Write down your thoughts and they will still be here when you return.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"fnmba","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"io87","text":"Backed up directly to Chrome. So no accounts or sync thing.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"d19sg","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6a7v1","text":"Here are some shortcuts. Take note ;-)","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8oiba","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2mp42","text":"⌘B to bold","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":2,"length":1,"style":"BOLD"},{"offset":5,"length":5,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"97hda","text":"⌘I to italic","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":2,"length":1,"style":"ITALIC"},{"offset":5,"length":7,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"9r66n","text":"⌘U to underline","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":6,"length":9,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"amlqa","text":"⇧⌘S to strike through","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":7,"length":14,"style":"STRIKE"}],"entityRanges":[],"data":{}},{"key":"8g6d","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"bh3sa","text":"Type : to see emojis 🖖🏽 ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":21,"length":2,"key":0}],"data":{}},{"key":"2hro","text":"#To add a h1 header","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"11ucv","text":"##To add a h2 header","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"eqcad","text":"###To add a h3 header","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"gsm4","text":"####To add a h4 header","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"837bu","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"ffmp6","text":"About:","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"72ikf","text":"Made by suyalcinkaya.github.io","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c7qpb","text":"Follow on Github to get the latest updates: github.com/suyalcinkaya/notiful","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{"0":{"type":"emoji","mutability":"IMMUTABLE","data":{"emojiUnicode":"🖖🏽"}}}}';

    if(undefined != storeRaw) {
      const rawContentFromStore = convertFromRaw(JSON.parse(storeRaw));
      initialEditorState = EditorState.createWithContent(rawContentFromStore);
    } 
    else {
      const rawContentFromInitial = convertFromRaw(JSON.parse(initialRaw));
      initialEditorState = EditorState.createWithContent(rawContentFromInitial);
    }

    this.state = {
      editorState: initialEditorState,
      plugins: [strikePlugin, emojiPlugin, linkifyPlugin]
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
      <div className="editor-wrapper">
        <Editor 
          editorState={this.state.editorState} 
          onChange={this.onChange} 
          handleKeyCommand={this.handleKeyCommand} 
          plugins={this.state.plugins} 
          decorators={ 
            [
              {
                strategy: h1Strategy,
                component: h1Component,
              },
              {
                strategy: h2Strategy,
                component: h2Component,
              },
              {
                strategy: h3Strategy,
                component: h3Component,
              },
              {
                strategy: h4Strategy,
                component: h4Component,
              }
            ]
          }
        />
        <EmojiSuggestions />
      </div>
    );
  }
}

function h1Strategy(contentBlock, callback, contentState) {
	findWithRegex(/^#[^#].+/g, contentBlock, callback);
}

function h2Strategy(contentBlock, callback, contentState) {
	findWithRegex(/^##[^###].+/g, contentBlock, callback);
}

function h3Strategy(contentBlock, callback, contentState) {
	findWithRegex(/^###[^####].+/g, contentBlock, callback);
}

function h4Strategy(contentBlock, callback, contentState) {
	findWithRegex(/^####[^#####].+/g, contentBlock, callback);
}

function checkboxStrategy(contentBlock, callback, contentState) {
	findWithRegex(/^\[ \].+/g, contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback) {
    const text = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = regex.exec(text)) !== null) {
        start = matchArr.index;
        callback(start, start + matchArr[0].length);
    }
}

const h1Component = (props) => {
	return (
  	<h1>
    	{ props.children }
    </h1>
  )
}

const h2Component = (props) => {
	return (
  	<h2>
    	{ props.children }
    </h2>
  )
}

const h3Component = (props) => {
	return (
  	<h3>
    	{ props.children }
    </h3>
  )
}

const h4Component = (props) => {
	return (
  	<h4>
    	{ props.children }
    </h4>
  )
}

const checkboxComponent = (props) => {
	return (
  	<div>
      <input type="checkbox" />
    	<span>{ props.children }</span>
    </div>
  )
}

ReactDOM.render(<MyEditor />, document.getElementById('app'));