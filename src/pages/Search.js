import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ItemCard from '../components/ItemCard';
import { useNavigate } from 'react-router-dom';
import PageComponent from '../components/Pagination';
import Skeleton from '../components/Skeleton';
import Notification from '../components/Notification';

import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../redux/repoReducer';
import { addNoti } from '../redux/notiReducer';
import {
  saveRepo,
  getRepo,
  deleteRepo,
  saveUserInfo,
} from '../redux/issueReducer';
import Toggle from '../components/Toggle';

const Search = () => {
  const repositories = useSelector((state) => state.repository.data);
  const isLoading = useSelector((state) => state.repository.isLoading);
  const notification = useSelector((state) => state.notifications.data);
  const issueRepo = useSelector((state) => state.issueReducer.selectedRepo);
  const userInfo = useSelector((state) => state.issueReducer.userInfo);
  const isSwitchOn = useSelector((state) => state.toggleReducer.isSwitchOn);
  const theme = useSelector((state) => state.theme);

  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);

  const inputRef = useRef();
  const navigate = useNavigate();

  const emptyData = () => {
    let result = [];
    for (let i = 0; i < 30; i++) {
      let empty = '';
      result.push(empty);
    }
    return result;
  };
  const loadingData = emptyData();

  const onSearch = (e) => {
    e.preventDefault();
    let keyword = inputRef.current.value;
    setKeyword(keyword);

    if (keyword === '') {
      dispatch(
        addNoti({
          type: 'danger',
          description: '검색어를 입력해주세요.',
          dismissTime: 4000,
        }),
      );
      return;
    }
    try {
      dispatch(getData({ keyword, page }));
    } catch (err) {
      console.log(err);
    }
  };

  const onSelectRepo = (repo) => {
    if (issueRepo.length <= 3) {
      if (issueRepo.findIndex((item) => item.id === repo.id) === -1) {
        dispatch(saveRepo(repo));
        dispatch(saveUserInfo(repo));
        dispatch(
          addNoti({
            type: 'success',
            description: 'Repository를 저장했습니다.',
            dismissTime: 4000,
          }),
        );
      }
    } else if (issueRepo.length > 3) {
      dispatch(
        addNoti({
          type: 'danger',
          description: '최대 4개의 Repository만 저장할 수 있습니다.',
          dismissTime: 4000,
        }),
      );
    }
  };

  const onDeleteRepo = (repo) => {
    dispatch(deleteRepo(repo));
    dispatch(
      addNoti({
        type: 'danger',
        description: 'Repository를 삭제했습니다.',
        dismissTime: 4000,
      }),
    );
  };

  const moveToSelectedRepo = (repo) => {
    userInfo.map(
      (user) =>
        user.id === repo.id && navigate(`/issue/${user.user}/${user.repo}`),
    );
    if (keyword === '') {
      const result = repo.full_name.split('/');
      navigate(`/issue/${result[0]}/${result[1]}`);
    }
  };

  const moveToMain = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (!isLoading) {
      dispatch(getRepo());
    }
  }, [dispatch, isLoading]);

  useEffect(() => {
    if (keyword === '') return;
    dispatch(getData({ keyword, page }));
  }, [page, keyword, dispatch]);

  return (
    <SearchComponent>
      <ToggleWrap>
        <Toggle />
      </ToggleWrap>
      <Header>
        <Title isSwitchOn={isSwitchOn} onClick={moveToMain} theme={theme}>
          Github Repository Search
        </Title>
        <SearchForm onSubmit={onSearch}>
          <SearchInput
            ref={inputRef}
            type="text"
            autoFocus
            isSwitchOn={isSwitchOn}
            theme={theme}
          />
          <SearchButton
            theme={theme}
            isSwitchOn={isSwitchOn}
            type="submit"
            value="검색"
            onClick={onSearch}
          />
        </SearchForm>
      </Header>
      <SearchResult theme={theme} isSwitchOn={isSwitchOn}>
        <ResultRepository selectedRepo={issueRepo}>
          {isLoading ? (
            <RepositoryList theme={theme}>
              {loadingData.map((v, i) => (
                <Skeleton key={i} />
              ))}
            </RepositoryList>
          ) : (
            <>
              <RepositoryList theme={theme}>
                {repositories?.length > 0 &&
                  repositories.map((repo, index) => (
                    <ItemCard
                      key={index}
                      repo={repo}
                      onSelectRepo={onSelectRepo}
                    />
                  ))}
              </RepositoryList>
              <Pagenation>
                {repositories.length > 0 && (
                  <PageComponent
                    page={page}
                    setPage={setPage}
                    repository={repositories}
                  />
                )}
              </Pagenation>
            </>
          )}
        </ResultRepository>
        {issueRepo.length > 0 && (
          <SaveRepo theme={theme} isSwitchOn={isSwitchOn}>
            <SaveRepoTitle theme={theme} isSwitchOn={isSwitchOn}>
              Saved Repository
            </SaveRepoTitle>
            {issueRepo?.map((repo, index) => (
              <ItemCard
                key={index}
                repo={repo}
                onDeleteRepo={onDeleteRepo}
                moveToSelectedRepo={moveToSelectedRepo}
              />
            ))}
          </SaveRepo>
        )}
      </SearchResult>
      <Notification notification={notification} />
    </SearchComponent>
  );
};

export default Search;

const SearchComponent = styled.div`
  margin: auto;
  width: 90%;
  height: 90%;
  padding: 20px;
  max-width: 1024px;
  min-width: 600px;
`;

const ToggleWrap = styled.div`
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.span`
  margin: 0;
  height: 100%;
  padding: 0;
  cursor: pointer;
  color: ${(props) => props.isSwitchOn && props.theme.darkversion.fontPrimary};
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: 600;
  @media ${(props) => props.theme.windowSize.base} {
    font-size: ${(props) => props.theme.fontSize.md};
  }
  @media ${(props) => props.theme.windowSize.small} {
    font-size: ${(props) => props.theme.fontSize.base};
  }
`;

const SearchForm = styled.form`
  flex-grow: 1;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const SearchInput = styled.input`
  margin-left: 30px;
  width: 80%;
  height: 100%;
  border: none;
  border-bottom: 1px solid
    ${(props) =>
      props.isSwitchOn
        ? props.theme.darkversion.secondary
        : props.theme.lightversion.secondary};
  color: ${(props) => props.isSwitchOn && props.theme.darkversion.fontPrimary};
  background-color: ${(props) =>
    props.isSwitchOn && props.theme.darkversion.background};
  font-size: ${(props) => props.theme.fontSize.md};
  &:focus {
    outline: none;
  }
  @media ${(props) => props.theme.windowSize.base} {
    margin-left: 10px;
    font-size: ${(props) => props.theme.fontSize.base};
  }
  @media ${(props) => props.theme.windowSize.small} {
    font-size: ${(props) => props.theme.fontSize.sm};
    margin-left: 10px;
  }
`;

const SearchButton = styled.input`
  width: 20%;
  margin-left: 5px;
  border: none;
  border-radius: 3px;
  font-size: ${(props) => props.theme.fontSize.md};
  color: ${(props) =>
    props.isSwitchOn ? props.theme.darkversion.fontPrimary : 'gray'};
  background-color: ${(props) => props.isSwitchOn && '#f0f0f030'};
  cursor: pointer;
  transition: transform 200ms ease-in;
  &:hover {
    transform: scale(1.05);
    background-color: ${(props) => props.theme.lightversion.hover};
    background-color: ${(props) => props.isSwitchOn && '#f0f0f080'};
    color: ${(props) => props.theme.lightversion.fontPrimary};
  }
  @media ${(props) => props.theme.windowSize.base} {
    margin-left: 10px;
    font-size: ${(props) => props.theme.fontSize.base};
  }
  @media ${(props) => props.theme.windowSize.small} {
    font-size: ${(props) => props.theme.fontSize.sm};
    margin-left: 10px;
  }
`;

const ResultRepository = styled.div`
  width: ${(props) => (props.selectedRepo.length > 0 ? '70%' : '93%')};
  height: 100%;
  margin: 20px;
  overflow: scroll;
`;

const RepositoryList = styled.ul`
  margin: 0;
  padding: 0;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 30px;
  justify-content: space-around;
  @media ${(props) => props.theme.windowSize.base} {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
  }
`;

const SaveRepo = styled.div`
  width: 30%;
  height: 100%;
  background-color: ${(props) =>
    props.isSwitchOn
      ? props.theme.darkversion.cardBg
      : props.theme.lightversion.secondary};
  min-width: 220px;
`;

const SaveRepoTitle = styled.span`
  display: block;
  color: ${(props) =>
    props.isSwitchOn
      ? props.theme.darkversion.fontPrimary
      : props.theme.lightversion.fontPrimary};
  padding: 20px 0 10px 20px;
  font-size: ${(props) => props.theme.fontSize.md};
  font-weight: 600;
  @media ${(props) => props.theme.windowSize.base} {
    font-size: ${(props) => props.theme.fontSize.base};
    padding: 20px 0 10px 10px;
  }
  @media ${(props) => props.theme.windowSize.small} {
    font-size: ${(props) => props.theme.fontSize.sm};
  }
`;

const SearchResult = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid
    ${(props) =>
      props.isSwitchOn
        ? props.theme.darkversion.secondary
        : props.theme.lightversion.secondary};
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  overflow: hidden;
`;

const Pagenation = styled.div`
  width: 100%;
  height: 30px;
  margin-bottom: 30px;
  text-align: center;
`;
