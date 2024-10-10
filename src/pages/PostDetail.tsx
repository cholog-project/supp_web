import { FormEvent, useEffect, useState } from 'react';
import {
  Button,
  Box,
  Container,
  Paper,
  Typography,
  List,
  Grid2,
  InputAdornment,
  Input,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useCreateComment,
  useDeleteComment,
  useGetPostDetail,
} from 'api/PostApi';
import { CommentForm, EachComment, PostDetailInfo } from 'model/Post';
import { AccountCircle } from '@mui/icons-material';
import { getCookie } from 'util/cookie';

function PostDetail() {
  const [postInfo, setPostInfo] = useState<PostDetailInfo>();
  const [commentInfo, setCommentInfo] = useState<CommentForm>({
    postId: 0,
    content: '',
  });
  const navigate = useNavigate();
  useEffect(() => {
    const jsessionid = getCookie('JSESSIONID');
    if (!jsessionid) {
      navigate('/signin');
    }
  }, [navigate]);
  const { postId } = useParams<{ postId: string }>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = useCreateComment(commentInfo);
      response.then(() => {
        navigate(0);
      });
    } catch (error) {
      console.error('답변 생성 과정에서 문제가 발생했습니다.', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('call');
    const { name, value } = e.target;
    setCommentInfo({
      ...commentInfo,
      [name]: value,
      postId: Number(postId),
    });
  };

  const handleDeleteComment = (commentId: number) => {
    const response = useDeleteComment(commentId);
    response.then(() => {
      navigate(0);
    });
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await useGetPostDetail(Number(postId));
        setPostInfo(post);
      } catch (err) {
        navigate('/');
      }
    };
    fetchPost();
  }, [navigate]);

  return (
    <Container maxWidth="md">
      <Button variant="contained" onClick={() => navigate(-1)}>
        이전으로
      </Button>
      <Box display="flex" alignItems="baseline">
        <Box flexGrow={1} padding={2}>
          <Typography variant="h4">
            제목 | {postInfo?.eachPost.postTitle}
          </Typography>
        </Box>
      </Box>
      <Grid2
        container
        direction="column"
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {postInfo && (
          <>
            <Grid2>
              <Paper
                elevation={2}
                sx={{
                  padding: 2,
                  width: 600,
                  minHeight: 100,
                  textAlign: 'center',
                }}
              >
                <Typography variant="body1">
                  {postInfo.eachPost.postDescription}
                </Typography>
              </Paper>
            </Grid2>
            <Grid2>
              <Paper
                elevation={2}
                sx={{
                  marginTop: 5,
                  padding: 2,
                  width: 600,
                  minHeight: 100,
                  textAlign: 'center',
                }}
              >
                <Box>
                  <form onSubmit={handleSubmit}>
                    <Input
                      id="input-with-icon-adornment"
                      onChange={handleChange}
                      name="content"
                      startAdornment={
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      }
                    />
                  </form>
                </Box>
                <List>
                  {postInfo.comments?.map((info: EachComment, index) => (
                    <Box key={index} sx={{ marginBottom: 2 }}>
                      <Typography variant="body2">{index + 1}</Typography>
                      <Typography variant="body2">작성자: 익명</Typography>
                      <Typography variant="body2">
                        {info.commentContent}
                      </Typography>
                      {info.isAuthor && (
                        <Button
                          onClick={() => handleDeleteComment(info.commentId)}
                        >
                          삭제하기
                        </Button>
                      )}
                    </Box>
                  ))}
                </List>
              </Paper>
            </Grid2>
          </>
        )}
      </Grid2>
    </Container>
  );
}

export default PostDetail;
