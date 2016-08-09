import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor'; // eslint-disable-line import/no-unresolved
import createStickerPlugin from 'draft-js-sticker-plugin'; // eslint-disable-line import/no-unresolved
import editorStyles from './editorStyles.css';
import stickers from './stickers';

const stickerPlugin = createStickerPlugin({ stickers });
const plugins = [stickerPlugin];
const StickerSelect = stickerPlugin.StickerSelect;

export default class SimpleMentionEditor extends Component {

  state = {
    editorState: EditorState.createEmpty(),
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  focus = () => {
    this.refs.editor.focus();
  };

  render() {
    return (
      <div>
        <div className={editorStyles.editor} onClick={this.focus}>
          <Editor
            blockRenderMap={DefaultDraftBlockRenderMap.merge(Map({'sticker':{ element: 'div'}}))}
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref="editor"
          />
        </div>
        <div className={editorStyles.options}>
          <StickerSelect editor={this} />
        </div>
      </div>
    );
  }
}
