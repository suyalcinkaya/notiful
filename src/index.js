import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from "react-sidebar";
import Editor from 'draft-js-plugins-editor';
import { EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import 'draft-js-emoji-plugin/lib/plugin.css';
import createStrikePlugin from './strikePlugin';
import './assets/fonts/fonts.css';
import './index.css';

import lightIcon from './assets/icons/light.svg';
import darkIcon from './assets/icons/dark.svg';
import slackIcon from './assets/icons/slack.svg';

import alignLeftIcon from './assets/icons/align-left.svg';
import alignCenterIcon from './assets/icons/align-center.svg';
import alignJustifyIcon from './assets/icons/align-justify.svg';
import alignRightIcon from './assets/icons/align-right.svg';

const strikePlugin = createStrikePlugin();
const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions } = emojiPlugin;
const linkifyPlugin = createLinkifyPlugin();

class MyEditor extends React.Component {
  constructor(props) {
    super(props);

    let initialEditorState = null;
    const storeRaw = localStorage.getItem('notiful:editor-text');
    const storeFontFamily = localStorage.getItem('notiful:font-family');
    const storeFontSize = localStorage.getItem('notiful:font-size');
    const storeTheme = localStorage.getItem('notiful:theme');
    const storeAlignment = localStorage.getItem('notiful:alignment');
    const initialRaw = '{"blocks":[{"key":"177nl","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"74dtg","text":"Oh, great you are here :-)","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"a0e1u","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"e3r","text":"Thank you for downloading Notiful.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2b30s","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"56osb","text":"Notiful is a minimal and clean tab extension for taking notes. Got something on your mind? Write down your thoughts and they will still be here when you return.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"fnmba","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"io87","text":"Backed up directly to Chrome. So no accounts or sync thing.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"d19sg","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6a7v1","text":"Here are some shortcuts. Take note ;-)","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8oiba","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2mp42","text":"⌘B to bold","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":2,"length":1,"style":"BOLD"},{"offset":5,"length":5,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"97hda","text":"⌘I to italic","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":2,"length":1,"style":"ITALIC"},{"offset":5,"length":7,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"9r66n","text":"⌘U to underline","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":6,"length":9,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"amlqa","text":"⇧⌘S to strike through","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":7,"length":14,"style":"STRIKE"}],"entityRanges":[],"data":{}},{"key":"8g6d","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"bh3sa","text":"Type : to see emojis 🖖🏽 ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":21,"length":2,"key":0}],"data":{}},{"key":"2hro","text":"#To add a h1 header","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"11ucv","text":"##To add a h2 header","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"eqcad","text":"###To add a h3 header","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"gsm4","text":"####To add a h4 header","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"837bu","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"ffmp6","text":"About:","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"72ikf","text":"Made by suyalcinkaya.github.io","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c7qpb","text":"Follow on Github to get the latest updates: github.com/suyalcinkaya/notiful","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{"0":{"type":"emoji","mutability":"IMMUTABLE","data":{"emojiUnicode":"🖖🏽"}}}}';

    if(undefined !== storeRaw) {
      const rawContentFromStore = convertFromRaw(JSON.parse(storeRaw));
      initialEditorState = EditorState.createWithContent(rawContentFromStore);
    } 
    else {
      const rawContentFromInitial = convertFromRaw(JSON.parse(initialRaw));
      initialEditorState = EditorState.createWithContent(rawContentFromInitial);
    }

    const fontFamilyMaisonMono = {
      key: "maison-mono",
      name: "Maison Mono"
    }

    const fontFamilyRobotoMono = {
      key: "roboto-mono",
      name: "Roboto Mono"
    }

    const fontFamilyRoboto = {
      key: "roboto",
      name: "Roboto"
    }

    const fontFamilyInterUI = {
      key: "interUI",
      name: "Inter UI"
    }

    const fontFamilyList = [fontFamilyMaisonMono, fontFamilyRobotoMono, fontFamilyRoboto, fontFamilyInterUI];

    const smallFontSize = {
      key: "small",
      name: "Small",
      fontSize: "13px",
      class: "font-size__small"
    }

    const regularFontSize = {
      key: "regular",
      name: "Regular",
      fontSize: "16px",
      class: "font-size__regular"
    }

    const largeFontSize = {
      key: "large",
      name: "Large",
      fontSize: "20px",
      class: "font-size__large"
    }

    const fontSizeList = [smallFontSize, regularFontSize, largeFontSize];

    const lightTheme = {
      key: "light",
      name: "Light",
      icon: lightIcon
    }

    const darkTheme = {
      key: "dark",
      name: "Dark",
      icon: darkIcon
    }

    const slackTheme = {
      key: "slack",
      name: "Slack",
      icon: slackIcon
    }

    const themeList = [lightTheme, darkTheme, slackTheme];

    const alignLeft = {
      key: "left",
      name: "Left",
      icon: alignLeftIcon
    }

    const alignCenter = {
      key: "center",
      name: "Center",
      icon: alignCenterIcon
    }

    const alignJustify = {
      key: "justify",
      name: "Justify",
      icon: alignJustifyIcon
    }

    const alignRight = {
      key: "right",
      name: "Right",
      icon: alignRightIcon
    }

    const alignmentList = [alignLeft, alignCenter, alignJustify, alignRight]

    this.state = {
      sidebarOpen: false,
      fontFamilies: fontFamilyList,
      fontSizes: fontSizeList,
      themes: themeList,
      alignments : alignmentList,
      fontFamily: undefined === fontFamilyList.find((item) => item.name === storeFontFamily) ? fontFamilyMaisonMono.name : storeFontFamily,
      fontSize: undefined === fontSizeList.find((item) => item.name === storeFontSize) ? regularFontSize.name : storeFontSize,
      theme: undefined === themeList.find((item) => item.name === storeTheme) ? lightTheme.name : storeTheme,
      alignment: undefined === alignmentList.find((item) => item.name === storeAlignment) ? alignLeft.name : storeAlignment,
      editorState: initialEditorState,
      plugins: [strikePlugin, emojiPlugin, linkifyPlugin]
    };

    localStorage.setItem('notiful:font-family', this.state.fontFamily);
    localStorage.setItem('notiful:font-size', this.state.fontSize);
    localStorage.setItem('notiful:theme', this.state.theme);

    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSidebarOpen = this.handleSidebarOpen.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleFontFamilyChange = this.handleFontFamilyChange.bind(this);
    this.handleFontSizeChange = this.handleFontSizeChange.bind(this);
    this.handleThemeChange = this.handleThemeChange.bind(this);
    this.handleAlignmentChange = this.handleAlignmentChange.bind(this);
  }

  componentDidMount(){
    if("Small" === this.state.fontSize) {
      document.querySelector('.editor-wrapper').classList.remove('font-size_regular');
      document.querySelector('.editor-wrapper').classList.remove('font-size_large');
      document.querySelector('.editor-wrapper').classList.add('font-size_small');
    }
    else if("Regular" === this.state.fontSize) {
      document.querySelector('.editor-wrapper').classList.remove('font-size_small');
      document.querySelector('.editor-wrapper').classList.remove('font-size_large');
      document.querySelector('.editor-wrapper').classList.add('font-size_regular');
    }
    else if("Large" === this.state.fontSize) {
      document.querySelector('.editor-wrapper').classList.remove('font-size_small');
      document.querySelector('.editor-wrapper').classList.remove('font-size_regular');
      document.querySelector('.editor-wrapper').classList.add('font-size_large');
    }
    localStorage.setItem('notiful:font-size', this.state.fontSize);

    if("Maison Mono" === this.state.fontFamily) {
      document.querySelector('.editor-wrapper').classList.remove('ff-roboto-mono');
      document.querySelector('.editor-wrapper').classList.remove('ff-roboto');
      document.querySelector('.editor-wrapper').classList.remove('ff-interui');
      document.querySelector('.editor-wrapper').classList.add('ff-maison-mono');
    }
    else if("Roboto Mono" === this.state.fontFamily) {
      document.querySelector('.editor-wrapper').classList.remove('ff-maison-mono');
      document.querySelector('.editor-wrapper').classList.remove('ff-roboto');
      document.querySelector('.editor-wrapper').classList.remove('ff-interui');
      document.querySelector('.editor-wrapper').classList.add('ff-roboto-mono');
    }
    else if("Roboto" === this.state.fontFamily) {
      document.querySelector('.editor-wrapper').classList.remove('ff-maison-mono');
      document.querySelector('.editor-wrapper').classList.remove('ff-roboto-mono');
      document.querySelector('.editor-wrapper').classList.remove('ff-interui');
      document.querySelector('.editor-wrapper').classList.add('ff-roboto');
    }
    else if("Inter UI" === this.state.fontFamily) {
      document.querySelector('.editor-wrapper').classList.remove('ff-maison-mono');
      document.querySelector('.editor-wrapper').classList.remove('ff-roboto-mono');
      document.querySelector('.editor-wrapper').classList.remove('ff-roboto');
      document.querySelector('.editor-wrapper').classList.add('ff-interui');
    }
    localStorage.setItem('notiful:font-family', this.state.fontFamily);

    if("Light" === this.state.theme) {
      document.querySelector('.editor-wrapper').classList.remove('theme_dark');
      document.querySelector('.editor-wrapper').classList.remove('slack-theme');
      document.querySelector('.editor-wrapper').classList.add('light-theme');
    }
    else if("Dark" === this.state.theme) {
      document.querySelector('.editor-wrapper').classList.remove('light-theme');
      document.querySelector('.editor-wrapper').classList.remove('slack-theme');
      document.querySelector('.editor-wrapper').classList.add('dark-theme');
    }
    else if("Slack" === this.state.theme) {
      document.querySelector('.editor-wrapper').classList.remove('light-theme');
      document.querySelector('.editor-wrapper').classList.remove('dark-theme');
      document.querySelector('.editor-wrapper').classList.add('slack-theme');
    }
    localStorage.setItem('notiful:theme', this.state.theme);

    if("Left" === this.state.alignment) {
      document.querySelector('.editor-wrapper').classList.remove('align_center');
      document.querySelector('.editor-wrapper').classList.remove('align_justify');
      document.querySelector('.editor-wrapper').classList.remove('align_right');
      document.querySelector('.editor-wrapper').classList.add('align_left');
    }
    else if("Center" === this.state.alignment) {
      document.querySelector('.editor-wrapper').classList.remove('align_left');
      document.querySelector('.editor-wrapper').classList.remove('align_justify');
      document.querySelector('.editor-wrapper').classList.remove('align_right');
      document.querySelector('.editor-wrapper').classList.add('align_center');
    }
    else if("Justify" === this.state.alignment) {
      document.querySelector('.editor-wrapper').classList.remove('align_left');
      document.querySelector('.editor-wrapper').classList.remove('align_center');
      document.querySelector('.editor-wrapper').classList.remove('align_right');
      document.querySelector('.editor-wrapper').classList.add('align_justify');
    }
    else if("Right" === this.state.alignment) {
      document.querySelector('.editor-wrapper').classList.remove('align_center');
      document.querySelector('.editor-wrapper').classList.remove('align_justify');
      document.querySelector('.editor-wrapper').classList.remove('align_left');
      document.querySelector('.editor-wrapper').classList.add('align_right');
    }
    localStorage.setItem('notiful:alignment', this.state.alignment);
  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState });

    const contentRaw = convertToRaw(this.state.editorState.getCurrentContent());
    localStorage.setItem('notiful:editor-text', JSON.stringify(contentRaw));
  }

  handleSidebarOpen(open) {
    this.setState({ sidebarOpen: open });

    if(open) {
      document.querySelector('.editor-wrapper').classList.add('pl-25');
    }
    else {
      document.querySelector('.editor-wrapper').classList.remove('pl-25');
    }
  }

  handleKeyCommand(command, editorState) {
    this.handleEditorChange(RichUtils.handleKeyCommand(editorState, command));
  }

  handleFontFamilyChange(event) {
    const _fontFamily = this.state.fontFamilies.find((item) => item.name === event.target.value);
    this.setState({ fontFamily: _fontFamily.name });

    if("Maison Mono" === _fontFamily.name) {
      document.querySelector('.editor-wrapper').classList.remove('ff-roboto-mono');
      document.querySelector('.editor-wrapper').classList.remove('ff-roboto');
      document.querySelector('.editor-wrapper').classList.remove('ff-interui');
      document.querySelector('.editor-wrapper').classList.add('ff-maison-mono');
    }
    else if("Roboto Mono" === _fontFamily.name) {
      document.querySelector('.editor-wrapper').classList.remove('ff-maison-mono');
      document.querySelector('.editor-wrapper').classList.remove('ff-roboto');
      document.querySelector('.editor-wrapper').classList.remove('ff-interui');
      document.querySelector('.editor-wrapper').classList.add('ff-roboto-mono');
    }
    else if("Roboto" === _fontFamily.name) {
      document.querySelector('.editor-wrapper').classList.remove('ff-maison-mono');
      document.querySelector('.editor-wrapper').classList.remove('ff-roboto-mono');
      document.querySelector('.editor-wrapper').classList.remove('ff-interui');
      document.querySelector('.editor-wrapper').classList.add('ff-roboto');
    }
    else if("Inter UI" === _fontFamily.name) {
      document.querySelector('.editor-wrapper').classList.remove('ff-maison-mono');
      document.querySelector('.editor-wrapper').classList.remove('ff-roboto-mono');
      document.querySelector('.editor-wrapper').classList.remove('ff-roboto');
      document.querySelector('.editor-wrapper').classList.add('ff-interui');
    }

    localStorage.setItem('notiful:font-family', _fontFamily.name);
  }

  handleFontSizeChange(event) {
    const _fontSize = this.state.fontSizes.find((item) => item.name === event.target.value);
    this.setState({ fontSize: _fontSize.name });

    if("Small" === _fontSize.name) {
      document.querySelector('.editor-wrapper').classList.remove('font-size_regular');
      document.querySelector('.editor-wrapper').classList.remove('font-size_large');
      document.querySelector('.editor-wrapper').classList.add('font-size_small');
    }
    else if("Regular" === _fontSize.name) {
      document.querySelector('.editor-wrapper').classList.remove('font-size_small');
      document.querySelector('.editor-wrapper').classList.remove('font-size_large');
      document.querySelector('.editor-wrapper').classList.add('font-size_regular');
    }
    else if("Large" === _fontSize.name) {
      document.querySelector('.editor-wrapper').classList.remove('font-size_small');
      document.querySelector('.editor-wrapper').classList.remove('font-size_regular');
      document.querySelector('.editor-wrapper').classList.add('font-size_large');
    }

    localStorage.setItem('notiful:font-size', _fontSize.name);
  }

  handleThemeChange(event) {
    const _theme = this.state.themes.find((item) => item.name === event.target.value);
    this.setState({ theme: _theme.name });

    if("Light" === _theme.name) {
      document.querySelector('.editor-wrapper').classList.remove('dark-theme');
      document.querySelector('.editor-wrapper').classList.remove('slack-theme');
      document.querySelector('.editor-wrapper').classList.add('light-theme');
    }
    else if("Dark" === _theme.name) {
      document.querySelector('.editor-wrapper').classList.remove('light-theme');
      document.querySelector('.editor-wrapper').classList.remove('slack-theme');
      document.querySelector('.editor-wrapper').classList.add('dark-theme');
    }
    else if("Slack" === _theme.name) {
      document.querySelector('.editor-wrapper').classList.remove('light-theme');
      document.querySelector('.editor-wrapper').classList.remove('dark-theme');
      document.querySelector('.editor-wrapper').classList.add('slack-theme');
    }

    localStorage.setItem('notiful:theme', _theme.name);
  }

  handleAlignmentChange(event) {
    const _alignment = this.state.alignments.find((item) => item.name === event.target.value);
    this.setState({ alignment: _alignment.name });

    if("Left" === _alignment.name) {
      document.querySelector('.editor-wrapper').classList.remove('align_center');
      document.querySelector('.editor-wrapper').classList.remove('align_justify');
      document.querySelector('.editor-wrapper').classList.remove('align_right');
      document.querySelector('.editor-wrapper').classList.add('align_left');
    }
    else if("Center" === _alignment.name) {
      document.querySelector('.editor-wrapper').classList.remove('align_left');
      document.querySelector('.editor-wrapper').classList.remove('align_justify');
      document.querySelector('.editor-wrapper').classList.remove('align_right');
      document.querySelector('.editor-wrapper').classList.add('align_center');
    }
    else if("Justify" === _alignment.name) {
      document.querySelector('.editor-wrapper').classList.remove('align_left');
      document.querySelector('.editor-wrapper').classList.remove('align_center');
      document.querySelector('.editor-wrapper').classList.remove('align_right');
      document.querySelector('.editor-wrapper').classList.add('align_justify');
    }
    else if("Right" === _alignment.name) {
      document.querySelector('.editor-wrapper').classList.remove('align_left');
      document.querySelector('.editor-wrapper').classList.remove('align_center');
      document.querySelector('.editor-wrapper').classList.remove('align_justify');
      document.querySelector('.editor-wrapper').classList.add('align_right');
    }

    localStorage.setItem('notiful:alignment', _alignment.name);
  }

  render() {
    return (
      <div>
        <Sidebar
          sidebar={
            <div className="editor__sidebar font-family__apercu">
              <a className="sidebar-close" onClick={() => {this.handleSidebarOpen(false)}}>
                <span className="close-icon"></span>
              </a>
              <div className="sidebar-content">
                <h2 className="sidebar-title">Customization</h2>
                <div className="editor__sidebar-form">
                  <span className="sidebar-form__title">Font Family</span>
                  <div className="sidebar-form__boxed-radios sidebar-form__boxed-radios__font-family">
                    {this.state.fontFamilies.map((fontFamily) => {
                      return (
                        <div className="sidebar-form__boxed-radios__box" key={fontFamily.key}>
                          <input type="radio" id={fontFamily.key} value={fontFamily.name} checked={this.state.fontFamily === fontFamily.name} onChange={this.handleFontFamilyChange} />
                          <label htmlFor={fontFamily.key}>
                            <span>{fontFamily.name}</span>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                  <span className="sidebar-form__title">Font Size</span>
                  <div className="sidebar-form__boxed-radios sidebar-form__boxed-radios__font-size">
                    {this.state.fontSizes.map((fontSize) => {
                      return (
                        <div className="sidebar-form__boxed-radios__box" key={fontSize.key}>
                          <input type="radio" id={fontSize.key} value={fontSize.name} checked={this.state.fontSize === fontSize.name} onChange={this.handleFontSizeChange} />
                          <label htmlFor={fontSize.key}>
                            <span>{fontSize.name}</span>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                  <span className="sidebar-form__title">Theme</span>
                  <div className="sidebar-form__boxed-radios sidebar-form__boxed-radios__theme">
                    {this.state.themes.map((theme) => {
                      return (
                        <div className="sidebar-form__boxed-radios__box" key={theme.key}>
                          <input type="radio" id={theme.key} value={theme.name} checked={this.state.theme === theme.name} onChange={this.handleThemeChange} />
                          <label htmlFor={theme.key}>
                            <img src={theme.icon} alt={theme.key} />
                            <span>{theme.name}</span>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                  <span className="sidebar-form__title">Alignment</span>
                  <div className="sidebar-form__boxed-radios sidebar-form__boxed-radios__alignment">
                    {this.state.alignments.map((alignment) => {
                      return (
                        <div className="sidebar-form__boxed-radios__box" key={alignment.key}>
                          <input type="radio" id={alignment.key} value={alignment.name} checked={this.state.alignment === alignment.name} onChange={this.handleAlignmentChange} />
                          <label htmlFor={alignment.key}>
                            <img src={alignment.icon} alt={alignment.key} />
                            <span>{alignment.name}</span>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          }
          open={this.state.sidebarOpen}
          onSetOpen={this.handleSidebarOpen}
          styles={{ sidebar: 
            { 
              position: "fixed",
              zIndex: "4",
              top: "0",
              left: "0",
              width: "23.75rem",
              height: "100%",
              backgroundColor: "#f5f5f5",
              overflow: "auto",
              fontFamily: "Roboto,sans-serif",
              transition: "transform .3s ease-in-out",
              transform: "translate3d(-350px,0,0)",
              boxShadow: "0 0 0 1px rgba(0,0,0,.1), 0 2px 8px 0 rgba(0,0,0,.1)"
            },
            overlay: {
              zIndex: 1,
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0,
              visibility: "hidden",
              transition: "opacity .3s ease-out, visibility .3s ease-out",
              backgroundColor: "transparent"
            }
          }}>
          <div></div>
        </Sidebar>
        <div className="editor-wrapper">
          <div className="sidebar-icon-wrapper">
            <a className="customize-button" onClick={() => this.handleSidebarOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
            </a>
          </div>
          <Editor
            editorState={this.state.editorState} 
            onChange={this.handleEditorChange} 
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

/*function checkboxStrategy(contentBlock, callback, contentState) {
	findWithRegex(/^\[ \].+/g, contentBlock, callback);
}*/

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

/*const checkboxComponent = (props) => {
	return (
  	<div>
      <input type="checkbox" />
    	<span>{ props.children }</span>
    </div>
  )
}*/

ReactDOM.render(<MyEditor />, document.getElementById('app'));