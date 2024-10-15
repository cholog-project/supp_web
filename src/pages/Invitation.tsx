import { Button, Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useJoinGroup } from 'api/InvitationApi';
import { useGetGroups } from 'api/StudyApi';
import { useEffect } from 'react';

function Invitation() {
  const navigate = useNavigate();
  const { inviteToken } = useParams<{ inviteToken: string }>();

  const handleJoinGroup = async () => {
    try {
      if (!inviteToken) {
        alert('잘못된 접근입니다');
        navigate('/');
      } else {
        const response = useJoinGroup({
          token: inviteToken,
        });
        response.then(() => {
          navigate('/');
        });
      }
    } catch (err) {
      alert('참여 과정에서 문제가 발생했습니다. 관리자에게 문의해주세요!');
    }
  };

  const fetchGroups = async () => {
    try {
      await useGetGroups();
    } catch (err) {
      console.log(err);
      alert('로그인 후 다시 시도해주세요');
      navigate('/signin');
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <Container maxWidth="md">
      <Button variant="contained" onClick={handleJoinGroup}>
        초대 승인하기
      </Button>
    </Container>
  );
}

export default Invitation;
