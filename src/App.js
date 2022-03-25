import Search from './pages/Search';
import styled, { ThemeProvider } from 'styled-components';
import Issue from './pages/Issue';
import { Route, Routes } from 'react-router-dom';
import theme from './styles/theme';

import { useSelector } from 'react-redux';

function App() {
  const isSwitchOn = useSelector((state) => state.toggleReducer.isSwitchOn);

  return (
    <AppComponent isSwitchOn={isSwitchOn}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/issue/:user/:repo" element={<Issue />} />
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
  background-color: ${(props) =>
    props.isSwitchOn && theme.darkversion.background};
  a {
    text-decoration: none;
    color: inherit;
  }
`;
