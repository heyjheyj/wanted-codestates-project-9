import Search from './pages/Search';
import styled, { ThemeProvider } from 'styled-components';
import Issue from './pages/Issue';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import theme from './styles/theme';

function App() {
  const [repository, setRepository] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  return (
    <AppComponent>
      <ThemeProvider theme={theme}>
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
            element={
              <Issue userInfo={userInfo} setRepository={setRepository} />
            }
          />
        </Routes>
      </ThemeProvider>
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
  a {
    text-decoration: none;
    color: inherit;
  }
`;
