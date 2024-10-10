import { useEffect, useState } from 'react';
import { Button, Box, Typography, List, Container } from '@mui/material';
import { useGetGroups } from 'api/StudyApi';
import { GroupInfo } from 'model/Study';
import { Link, useNavigate } from 'react-router-dom';
import { getCookie } from 'util/cookie';

function Main() {
  const [groupInfo, setGroupInfo] = useState<GroupInfo[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const jsessionid = getCookie('JSESSIONID');
    if (!jsessionid) {
      navigate('/signin');
    }
  }, [navigate]);
  const fetchGroups = async () => {
    console.log('Fetching groups...');
    try {
      const data = await useGetGroups();
      setGroupInfo(data);
    } catch (err) {
      console.log(err);
      throw new Error('사용자 그룹을 가져오는데 문제가 생겼습니다.');
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
      <Box display="flex">
        <Box flexGrow={1} padding={2}>
          <Typography variant="h4">🍃</Typography>
        </Box>
        <Box width="250px" height="100vh" bgcolor="#e0f7fa" padding={2}>
          <Typography variant="h6">스터디 정보</Typography>
          <List>
            {groupInfo.map((info: GroupInfo, index) => (
              <Link to={`/group/${info.studyId}`} key={info.studyId}>
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
