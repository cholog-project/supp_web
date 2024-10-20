import React, { FormEvent, useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  IconButton,
  Paper,
} from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { CreatePostForm } from 'model/Post';
import { useCreatePost } from 'api/PostApi';
import { Examples } from 'constants/Questions';
import { useGroupStore } from 'store/pageStore';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles

function PostForm() {
  const navigate = useNavigate();
  const { groupId } = useGroupStore();
  const [questionPage, setQuestionPage] = useState<number>(0);
  const [formData, setFormData] = useState<CreatePostForm>({
    title: '',
    description: '',
    studyId: groupId,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDescriptionChange = (value: string) => {
    setFormData({
      ...formData,
      description: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await useCreatePost(formData);
      navigate(`/group`);
    } catch (error) {
      console.error('스터디 생성 과정에서 문제가 발생했습니다.', error);
    }
  };

  const handlePrevious = () => {
    setQuestionPage((prevPage) =>
      prevPage > 0 ? prevPage - 1 : Examples.length - 1,
    );
  };

  const handleNext = () => {
    setQuestionPage((prevPage) =>
      prevPage < Examples.length - 1 ? prevPage + 1 : 0,
    );
  };

  const handleUseExample = () => {
    setFormData({
      ...formData,
      description: Examples[questionPage],
    });
  };

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
      <Button
        variant="contained"
        onClick={() => navigate(`/group`)}
        sx={{ mb: 3 }}
      >
        스터디 홈으로
      </Button>
      <Typography variant="h4" gutterBottom align="center">
        질문을 작성해주세요
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" mt={2}>
          <Paper
            elevation={3}
            sx={{ flex: 1, borderColor: 'lightgreen', p: 2, mr: 2 }}
          >
            <Typography variant="h6" gutterBottom>
              질문
            </Typography>
            <ReactQuill
              value={formData.description}
              onChange={handleDescriptionChange}
              theme="snow"
              style={{
                height: '400px',
                marginBottom: '20px',
                overflow: 'auto',
              }}
            />
            <TextField
              label="제목을 작성해 주세요!"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Paper>
          <Paper
            elevation={3}
            sx={{
              flex: 1,
              borderColor: 'lightgreen',
              p: 2,
              height: '600px',
              overflowY: 'auto',
            }}
          >
            <Typography variant="h6">
              이런 방식으로 질문을 할 수 있어요!
            </Typography>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mt={2}
            >
              <Box flex={1} mx={2}>
                <ReactQuill
                  value={Examples[questionPage]}
                  readOnly={true}
                  theme="bubble"
                  style={{
                    height: '400px',
                    marginBottom: '20px',
                    borderStyle: 'solid',
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <IconButton
                    aria-label="previous"
                    onClick={handlePrevious}
                    sx={{ backgroundColor: 'green', color: 'white' }}
                  >
                    <KeyboardArrowLeft />
                  </IconButton>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUseExample}
                    sx={{ mt: 2 }}
                  >
                    양식 사용하기
                  </Button>
                  <IconButton
                    aria-label="next"
                    onClick={handleNext}
                    sx={{ backgroundColor: 'green', color: 'white' }}
                  >
                    <KeyboardArrowRight />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box mt={3} mb={3}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            질문하기
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default PostForm;
