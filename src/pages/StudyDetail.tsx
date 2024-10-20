import { useEffect, useState } from 'react';
import {
  Grid2,
  Button,
  Box,
  Container,
  Paper,
  Typography,
} from '@mui/material';
import { useGetGroupDetail } from 'api/StudyApi';
import { GroupInfo } from 'model/Study';
import { Link, useNavigate } from 'react-router-dom';
import { useGetPosts } from 'api/PostApi';
import { PostInfo } from 'model/Post';
import { useGetInviteUrl } from 'api/InvitationApi';
import { BASE_URL } from '../constants';
import { useGroupStore, usePostStore } from 'stroe/pageStore';

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
  }, []);

  const handleCopyInvitationUrl = async () => {
    try {
      useGetInviteUrl({
        memberType: 'LEAF',
        studyId: Number(groupId),
      }).then((response) => {
        const baseUrl = `${BASE_URL}`;
        const fullUrl = new URL(response.invitationLink, baseUrl);
        const params = new URLSearchParams(fullUrl.search);
        const token = params.get('token');
        navigator.clipboard.writeText(`${BASE_URL}/group/join/${token}`);
        alert('클립보드에 복사되었습니다! 초대링크를 보내보세요');
      });
    } catch (err) {
      alert('클립보드에 복사되었습니다! 초대링크를 보내보세요');
    }
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" padding={2}>
        <Button variant="contained" onClick={() => navigate('/')}>
          홈으로
        </Button>
        <Button variant="contained" onClick={() => navigate(`/post/create`)}>
          질문 작성하기
        </Button>
        <Button variant="contained" onClick={handleCopyInvitationUrl}>
          초대링크 생성하기
        </Button>
      </Box>
      <Box display="flex">
        <Box flexGrow={1} padding={2}>
          <Box>스터디명: {groupInfo?.studyName}</Box>
          <Box>조직: {groupInfo?.organization}</Box>
        </Box>
      </Box>
      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {postInfo.map((post, index) => (
          <Grid2 key={post.postId || index}>
            <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
              <Link to={`/post`} onClick={() => setPostId(post.postId)}>
                <Typography>{post.postTitle}</Typography>
              </Link>
            </Paper>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
}

export default StudyDetail;
