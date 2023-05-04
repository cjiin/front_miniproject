import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from 'styled-components';

const StyledEditor = styled.div`
  width: 70%;
  margin: 0 auto;

  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 400px;
  }
`;

const ContentInput = ({ value, onChange }) => {

  const handleContentChange = (event, editor) => {
    if(editor) {
      const data = editor.getData();
      onChange(data);
    }

  }

  return (
    <>
      <StyledEditor>
        <CKEditor
          editor={ClassicEditor}
          data={value}
          editorConfig={{ placeholder: '내용을 입력하세요' }}
          onChange={handleContentChange} />
      </StyledEditor>
    </>
  );
};

export default ContentInput;
