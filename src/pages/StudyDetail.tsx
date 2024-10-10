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
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetPosts } from 'api/PostApi';
import { PostInfo } from 'model/Post';
import { getCookie } from 'util/cookie';

function StudyDetail() {
  const [groupInfo, setGroupInfo] = useState<GroupInfo>();
  const [postInfo, setPostInfo] = useState<PostInfo[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const jsessionid = getCookie('JSESSIONID');
    if (!jsessionid) {
      navigate('/signin');
    }
  }, [navigate]);
  const { groupId } = useParams<{ groupId: string }>();

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const study = await useGetGroupDetail(Number(groupId));
        const questions = await useGetPosts(Number(groupId));
        setGroupInfo(study);
        setPostInfo(questions);
      } catch (err) {
        navigate('/');
      }
    };
    fetchGroup();
  }, []);

  return (
    <Container maxWidth="md">
      <Button variant="contained" onClick={() => navigate('/')}>
        홈으로
      </Button>
      <Button
        variant="contained"
        onClick={() => navigate(`/group/${groupId}/post/create`)}
      >
        질문 작성하기
      </Button>
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
              <Link to={`/post/${post.postId}`}>
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
