import Search from './pages/Search';
import styled from 'styled-components';
import Issue from './pages/Issue';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {
  const isSwitchOn = useSelector((state) => state.toggleReducer.isSwitchOn);
  const theme = useSelector((state) => state.theme);

  return (
    <AppComponent isSwitchOn={isSwitchOn} theme={theme}>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/issue/:user/:repo" element={<Issue />} />
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
  background-color: ${(props) =>
    props.isSwitchOn && props.theme.darkversion.background};
`;
