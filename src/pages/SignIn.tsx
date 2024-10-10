import React, { FormEvent, useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { SHA256 } from 'crypto-js';
import { SignInMember } from 'model/Member';
import { useSignInMember } from 'api/MemberApi';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignInMember>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const hashedPassword = SHA256(formData.password).toString();
    const submittedData: SignInMember = {
      ...formData,
      password: hashedPassword,
    };
    useSignInMember(submittedData)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('로그인 실패', error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        ⭐ SUPP 로그인 ⭐
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="이메일"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="비밀번호"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          로그인
        </Button>
      </form>
      <Button
        onClick={() => navigate('/signup')}
        variant="contained"
        sx={{ margin: 1 }}
      >
        회원가입
      </Button>
    </Container>
  );
}

export default SignIn;
