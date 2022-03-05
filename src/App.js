<<<<<<< HEAD
import Search from './pages/Search';
import styled from 'styled-components';
import Issue from './pages/Issue';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [repository, setRepository] = useState([]);

  const [user, setUser] = useState([]);
  const [repo, setRepo] = useState([]);

  return (
    <AppComponent>
      <Routes>
        <Route
          path="/"
          element={
            <Search
              repository={repository}
              setRepository={setRepository}
              setUser={setUser}
              setRepo={setRepo}
            />
          }
        />
        <Route path="/issue" element={<Issue user={user} repo={repo} />} />
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
