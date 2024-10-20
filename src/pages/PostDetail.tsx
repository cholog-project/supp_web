import { FormEvent, useEffect, useState } from 'react';
import {
  Button,
  Box,
  Container,
  Paper,
  Typography,
  List,
  InputAdornment,
  Input,
  IconButton,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  useCreateComment,
  useDeleteComment,
  useGetPostDetail,
} from 'api/PostApi';
import { CommentForm, EachComment, PostDetailInfo } from 'model/Post';
import { AccountCircle, Send } from '@mui/icons-material';
import { usePostStore } from 'stroe/pageStore';
import ReactQuill from 'react-quill';

function PostDetail() {
  const { postId } = usePostStore();
  const [postInfo, setPostInfo] = useState<PostDetailInfo>();
  const [commentInfo, setCommentInfo] = useState<CommentForm>({
    postId: postId,
    content: '',
  });
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const post = await useGetPostDetail(postId);
      setPostInfo(post);
    } catch (error) {
      navigate('/');
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await useCreateComment(commentInfo);
      fetchPost().then(() => {
        setCommentInfo({ ...commentInfo, content: '' });
      });
    } catch (error) {
      console.error('답변 생성 과정에서 문제가 발생했습니다.', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCommentInfo({
      ...commentInfo,
      [name]: value,
    });
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await useDeleteComment(commentId);
      fetchPost();
    } catch (error) {
      console.error('댓글 삭제 중 오류 발생', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 3 }}>
        <Button variant="contained" onClick={() => navigate(-1)}>
          이전으로
        </Button>
      </Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          {postInfo?.eachPost.postTitle}
        </Typography>
        <Typography variant="body2" gutterBottom>
          작성자 : 익명
        </Typography>
        <ReactQuill
          value={postInfo?.eachPost.postDescription}
          readOnly={true}
          theme="snow"
          modules={{ toolbar: false }}
          style={{
            height: 'auto',
            backgroundColor: 'white',
          }}
        />
      </Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
        <Paper
          elevation={2}
          sx={{ display: 'flex', alignItems: 'center', p: 2 }}
        >
          <Input
            fullWidth
            placeholder="댓글을 입력하세요..."
            onChange={handleChange}
            name="content"
            value={commentInfo.content}
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
          <IconButton type="submit" color="primary">
            <Send />
          </IconButton>
        </Paper>
      </Box>
      <Typography variant="h6" gutterBottom>
        댓글
      </Typography>
      <List>
        {postInfo?.comments?.map((info: EachComment, index) => (
          <Box key={index}>
            <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
              <Typography variant="body2" color="textSecondary">
                {index + 1}. 작성자: {info.commentMemberType}
              </Typography>
              <Typography
                variant="body2"
                sx={{ whiteSpace: 'pre-line', mb: 1 }}
              >
                {info.commentContent}
              </Typography>
              {info.isAuthor && (
                <Button
                  size="small"
                  color="error"
                  variant="outlined"
                  onClick={() => handleDeleteComment(info.commentId)}
                >
                  삭제하기
                </Button>
              )}
            </Paper>
            {index < postInfo.comments.length - 1 && <Divider />}
          </Box>
        ))}
      </List>
    </Container>
  );
}

export default PostDetail;
