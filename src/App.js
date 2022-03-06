import Search from './pages/Search';
import styled from 'styled-components';
import Issue from './pages/Issue';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [repository, setRepository] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  console.log(userInfo);

  return (
    <AppComponent>
      <Routes>
        <Route
          path="/"
          element={
            <Search
              repository={repository}
              setRepository={setRepository}
              setUserInfo={setUserInfo}
              userInfo={userInfo}
            />
          }
        />
        <Route
          path="/issue/:user/:repo"
          element={<Issue userInfo={userInfo} />}
        />
      </Routes>
    </AppComponent>
  );
}

export default App;

const AppComponent = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
