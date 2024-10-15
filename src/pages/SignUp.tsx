import React, { FormEvent, useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { SHA256 } from 'crypto-js';
import { SignUpMember } from 'model/Member';
import { useEmailCheck, useSignUpMember } from 'api/MemberApi';
import { useNavigate } from 'react-router-dom';

// 회원가입
function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignUpMember>({
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
    const submittedData: SignUpMember = {
      ...formData,
      password: hashedPassword,
    };
    useSignUpMember(submittedData)
      .then(() => {
        navigate('/signin');
      })
      .catch((error) => {
        console.error('회원가입 실패', error);
      });
  };

  const handleCheckEmail = async () => {
    try {
      const response = await useEmailCheck(formData.email);
      if (response.ok) {
        alert('사용 가능한 이메일입니다');
      } else {
        alert('이미 존재하는 이메일입니다');
      }
    } catch (err) {
      alert('문제가 발생했습니다');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        🍃 SUPP 회원가입 🍃
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
        <Button onClick={handleCheckEmail}>중복검사</Button>
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
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default SignUp;
