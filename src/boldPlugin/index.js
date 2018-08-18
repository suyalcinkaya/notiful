import  { RichUtils } from 'draft-js';

export default () => {
  return {
    keyBindingFn: (e) => {
      if (e.metaKey && e.key === 'b') {
        return 'bold';
      }
    },
    handleKeyCommand: (command, editorState, { setEditorState }) => {
      if (command === 'bold') {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
        return true;
      }
    },
  };
};