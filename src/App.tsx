import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import Main from 'pages/Main';
import StudyForm from 'pages/StudyForm';
import StudyDetail from 'pages/StudyDetail';
import PostForm from 'pages/PostForm';
import PostDetail from 'pages/PostDetail';
import Invitation from 'pages/Invitation';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/group/create" element={<StudyForm />} />
        <Route path="/group/:groupId" element={<StudyDetail />} />
        <Route path="/group/:groupId/post/create" element={<PostForm />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/group/join/:inviteToken" element={<Invitation />} />
      </Routes>
    </div>
  );
}

export default App;
