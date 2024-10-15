import React, { FormEvent, useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { CreateStudyForm } from 'model/Study';
import { useCreateStudy } from 'api/StudyApi';
import { useNavigate } from 'react-router-dom';

function StudyForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateStudyForm>({
    studyName: '',
    organization: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await useCreateStudy(formData);
      navigate(`/`);
    } catch (error) {
      console.error('스터디 생성 과정에서 문제가 발생했습니다.', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Button variant="contained" onClick={() => navigate('/')}>
        홈으로
      </Button>
      <Typography variant="h4" gutterBottom>
        스터디 생성하기
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="스터디명"
          name="studyName"
          placeholder="짱짱스터디"
          value={formData.studyName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="조직명"
          name="organization"
          placeholder="우아대학교"
          value={formData.organization}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          스터디 만들기
        </Button>
      </form>
    </Container>
  );
}

export default StudyForm;
