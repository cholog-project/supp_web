import React, { FormEvent, useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { CreatePostForm } from 'model/Post';
import { useCreatePost } from 'api/PostApi';
import { Examples } from 'constants/Questions';
import { useGroupStore } from 'stroe/pageStore';
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
      prevPage > 0 ? prevPage - 1 : Examples.length - 1
    );
  };

  const handleNext = () => {
    setQuestionPage((prevPage) =>
      prevPage < Examples.length - 1 ? prevPage + 1 : 0
    );
  };

  return (
    <Container maxWidth="md">
      <Button variant="contained" onClick={() => navigate(`/group`)}>
        스터디 홈으로
      </Button>
      <Typography variant="h4" gutterBottom>
        질문을 작성해주세요
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" mt={2}>
          <Box flex={1} border={1} borderColor="lightgreen" p={2} mr={2}>
            <Typography variant="h6" gutterBottom>
              질문
            </Typography>
            <ReactQuill
              value={formData.description}
              onChange={handleDescriptionChange}
              theme="snow"
              style={{ height: '300px', marginBottom: '40px' }}
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
          </Box>
          <Box
            flex={1}
            border={1}
            borderColor="lightgreen"
            p={2}
            sx={{
              minHeight: 200,
              maxHeight: 400,
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
              <IconButton
                aria-label="previous"
                onClick={handlePrevious}
                sx={{ backgroundColor: 'green', color: 'white' }}
              >
                <KeyboardArrowLeft />
              </IconButton>
              <Box flex={1} mx={2}>
                <Typography
                  variant="body1"
                  align="center"
                  dangerouslySetInnerHTML={{ __html: Examples[questionPage] }}
                />
              </Box>
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
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            질문하기
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default PostForm;
