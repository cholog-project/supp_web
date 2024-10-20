import { useEffect, useState } from 'react';
import { Button, Box, Typography, List, Container } from '@mui/material';
import { useGetGroups } from 'api/StudyApi';
import { GroupInfo } from 'model/Study';
import { Link, useNavigate } from 'react-router-dom';
import { useGroupStore } from 'stroe/pageStore';

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
    <Container maxWidth="md">
      <Button variant="contained" onClick={() => navigate('/group/create')}>
        스터디 생성
      </Button>
      <Button variant="contained" onClick={() => navigate('/signin')}>
        다시 로그인하기
      </Button>
      <Box display="flex">
        <Box flexGrow={1} padding={2}>
          <Typography variant="h4">🍃</Typography>
        </Box>
        <Box width="250px" height="100vh" bgcolor="#e0f7fa" padding={2}>
          <Typography variant="h6">스터디 정보</Typography>
          <List>
            {groupInfo.map((info: GroupInfo, index) => (
              <Link
                to={`/group`}
                key={info.studyId}
                onClick={() => setGroupId(info.studyId)}
              >
                <Box>
                  <Box>{index + 1}</Box>
                  <Box>스터디명: {info.studyName}</Box>
                  <Box>조직: {info.organization}</Box>
                </Box>
              </Link>
            ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
}

export default Main;
