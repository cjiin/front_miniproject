import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Header from "../components/Header";
import TitleInput from "../components/Board/Title";
import TagField from "../components/Board/TagInput";
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import boardAxiosApi from "../api/BoardAxiosApi";
import SelectCategory from "../components/Board/Category";


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 20px;

`;

const EditorWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 400px;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
  padding-right : 220px;
  padding-bottom : 80px;
  `;



const EditPage = () => {
  const { postNum } = useParams();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [boardNum, setBoardNum] = useState(null);
  const [tag, setTag] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const fetchPost = async () => {
      const response = await boardAxiosApi.requestPostDetail(postNum);
      const postData = response[0];
      console.log(postData);
      setBoardNum(postData.boardNum);
      setTitle(postData.title);
      setTag(postData.tag);
      setContent(response[0].content);
    };

    fetchPost();
  }, [postNum]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  
  const handleCategoryChange = (selectedBoardNum) => {
    setBoardNum(selectedBoardNum);
  };  
  
  
  const handleTagChange = (e) => {
    setTag(e.target.value);
  };
  
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedPost = { postNum, boardNum, title, content };
    console.log(updatedPost);
    await boardAxiosApi.updatePost(updatedPost);
    navigate(`/post/${postNum}`);
  };
  


  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
      <Wrapper>
      <Row>
        <Col>

        <SelectCategory value={boardNum} onChange={handleCategoryChange} /> 
        <TitleInput value={title} onChange={handleTitleChange} />
        <EditorWrapper>
          <CKEditor editor={ClassicEditor} data={content} onChange={handleEditorChange}/>
        </EditorWrapper>
        <TagField value={tag} onChange={handleTagChange}/>
        </Col>
      </Row>
      </Wrapper>
      <ButtonWrapper>
       <Button variant="contained" style={{ borderRadius: "20px", fontSize: "18px", padding: "8px 25px"}} onClick={handleSubmit}>등록</Button>
    </ButtonWrapper>
    </form>
    </>

  );
};

export default EditPage;