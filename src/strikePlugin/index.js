import  { RichUtils } from 'draft-js';

export default () => {
  return {
    customStyleMap: {
      'STRIKE': {
        textDecoration: 'line-through'
      }
    },
    keyBindingFn: (e) => {
      if (e.metaKey && e.shiftKey && e.key === 's') {
        return 'strike';
      }
    },
    handleKeyCommand: (command, editorState, { setEditorState }) => {
      if (command === 'strike') {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'STRIKE'));
        return true;
      }
    },
  };
};