import { useEffect, useState } from 'react';
import {
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
} from '@mui/material';
import { useGetGroups } from 'api/StudyApi';
import { GroupInfo } from 'model/Study';
import { Link, useNavigate } from 'react-router-dom';
import { useGroupStore } from 'store/pageStore';

function Main() {
  const { setGroupId } = useGroupStore();
  const [groupInfo, setGroupInfo] = useState<GroupInfo[]>([]);
  const navigate = useNavigate();

  const fetchGroups = async () => {
    try {
      const data = await useGetGroups();
      setGroupInfo(data);
    } catch (err) {
      console.log(err);
      alert(
        '데이터를 불러오는데 문제가 발생했습니다! 로그인을 다시 시도해주세요',
      );
      navigate('/signin');
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <Container maxWidth="md" sx={{ paddingTop: 4 }}>
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/group/create')}
        >
          스터디 생성
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate('/signin')}
        >
          다시 로그인하기
        </Button>
      </Box>
      <Box display="flex">
        <Box
          flexGrow={1}
          padding={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h6" align="center">
            🍃 초록스터디에 오신것을 환영합니다!! 🍃
          </Typography>
        </Box>
        <Box
          width="300px"
          maxHeight="80vh"
          bgcolor="#e0f7fa"
          padding={2}
          sx={{ overflowY: 'auto', borderRadius: 2 }}
        >
          <Typography variant="h6" gutterBottom>
            나의 스터디 정보
          </Typography>
          <List>
            {groupInfo.map((info: GroupInfo) => (
              <Link
                key={info.studyId}
                to={`/group`}
                onClick={() => setGroupId(info.studyId)}
                style={{
                  textDecoration: 'none',
                }}
              >
                <ListItem
                  sx={{
                    border: 2,
                    borderStyle: 'solid',
                    borderRadius: 2,
                    marginBottom: 1,
                  }}
                >
                  <ListItemText
                    primary={`스터디명: ${info.studyName}`}
                    secondary={`조직: ${info.organization}`}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
}

export default Main;
