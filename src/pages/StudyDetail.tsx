import { useEffect, useState } from 'react';
import {
  Button,
  Box,
  Container,
  Paper,
  Typography,
  List,
  ListItem,
} from '@mui/material';
import { useGetGroupDetail } from 'api/StudyApi';
import { GroupInfo } from 'model/Study';
import { Link, useNavigate } from 'react-router-dom';
import { useGetPosts } from 'api/PostApi';
import { PostInfo } from 'model/Post';
import { useGetInviteUrl } from 'api/InvitationApi';
import { BASE_URL } from '../constants';
import { useGroupStore, usePostStore } from 'store/pageStore';
import { MemberType } from 'model/Member';

function StudyDetail() {
  const [groupInfo, setGroupInfo] = useState<GroupInfo>();
  const [postInfo, setPostInfo] = useState<PostInfo[]>([]);
  const { groupId } = useGroupStore();
  const { setPostId } = usePostStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const study = await useGetGroupDetail(groupId);
        const questions = await useGetPosts(groupId);
        setGroupInfo(study);
        setPostInfo(questions);
      } catch (err) {
        navigate('/');
      }
    };
    fetchGroup();
  }, [groupId, navigate]);

  const handleCopyInvitationUrl = async (type: MemberType) => {
    try {
      const response = await useGetInviteUrl({
        memberType: type,
        studyId: Number(groupId),
      });
      const baseUrl = `${BASE_URL}`;
      const fullUrl = new URL(response.invitationLink, baseUrl);
      const params = new URLSearchParams(fullUrl.search);
      const token = params.get('token');
      navigator.clipboard.writeText(`${BASE_URL}/group/join/${token}`);
      alert('클립보드에 복사되었습니다! 초대링크를 보내보세요');
    } catch (err) {
      alert('초대링크 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ padding: 2 }}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
        >
          홈으로
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate(`/post/create`)}
        >
          질문 작성하기
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleCopyInvitationUrl('LEAF')}
        >
          리프(리뷰어) 초대링크 생성하기
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleCopyInvitationUrl('FRUIT')}
        >
          프룻(참여자) 초대링크 생성하기
        </Button>
      </Box>
      <Box mb={3}>
        <Typography variant="h5" gutterBottom>
          스터디 정보
        </Typography>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h6">스터디명: {groupInfo?.studyName}</Typography>
          <Typography variant="body1">
            조직: {groupInfo?.organization}
          </Typography>
        </Paper>
      </Box>
      <Typography variant="h6" gutterBottom>
        질문 목록
      </Typography>
      <Box
        sx={{
          width: '100%',
          maxHeight: 400,
          overflowY: 'auto',
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <List>
          {postInfo.map((post) => (
            <ListItem
              key={post.postId}
              component={Link}
              to={`/post`}
              onClick={() => setPostId(post.postId)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '20px 20px',
                marginBottom: '10px',
                border: 1,
                borderRadius: 2,
                color: 'inherit',
                textDecoration: 'none',
                transition: 'background-color 0.3s',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
                width: '100%',
              }}
            >
              <Typography variant="body1">{post.postTitle}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default StudyDetail;
