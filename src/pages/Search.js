import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Octokit } from '@octokit/core';
import ItemCard from '../components/ItemCard';
import { useNavigate } from 'react-router-dom';
import PageComponent from '../components/Pagination';
import Skeleton from '../components/Skeleton';
import Notification from '../components/Notification';

const octokit = new Octokit({ auth: `${process.env.REACT_APP_GITHUB_TOKEN}` });

const Search = ({ setRepository, setUserInfo, repository, userInfo }) => {
  const [keyword, setKeyword] = useState('');
  const [selectedRepo, setSelectedRepo] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState([]);

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

  const getData = useCallback(async (keyword, page) => {
    setIsLoading(true);
    let result = await octokit.request(
      `GET /search/repositories?page=${page}`,
      {
        q: keyword,
      },
    );
    return result;
  }, []);

  const onSearch = async (e) => {
    e.preventDefault();
    let keyword = inputRef.current.value;
    setKeyword(keyword);

    if (keyword === '') {
      let noti = {
        id: Date.now(),
        type: 'danger',
        description: '검색어를 입력해주세요.',
        dismissTime: 4000,
      };
      setNotification([...notification, noti]);
      return;
    }
    try {
      let result = await getData(keyword, page);
      let data = result.data.items;
      setRepository(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onSelectRepo = (repo) => {
    if (selectedRepo.length <= 3) {
      if (selectedRepo.findIndex((item) => item.id === repo.id) === -1) {
        setSelectedRepo([...selectedRepo, repo]);
        window.localStorage.setItem(
          'repos',
          JSON.stringify([...selectedRepo, repo]),
        );
        let [userName, repoName] = repo.full_name.split('/');
        setUserInfo([
          ...userInfo,
          {
            id: repo.id,
            user: userName,
            repo: repoName,
          },
        ]);
        let noti = {
          id: Date.now(),
          type: 'success',
          description: 'Repository를 저장했습니다.',
          dismissTime: 4000,
        };
        setNotification([...notification, noti]);
      }
    } else if (selectedRepo.length > 3) {
      let noti = {
        id: Date.now(),
        type: 'danger',
        description: '최대 4개의 Repository만 저장할 수 있습니다.',
        dismissTime: 4000,
      };
      setNotification([...notification, noti]);
    }
  };

  const onDeleteRepo = (repo) => {
    let result = selectedRepo.filter((selected) => selected.id !== repo.id);
    setSelectedRepo(result);
    window.localStorage.setItem('repos', JSON.stringify(result));
    let noti = {
      id: Date.now(),
      type: 'danger',
      description: 'Repository를 삭제했습니다.',
      dismissTime: 4000,
    };
    setNotification([...notification, noti]);
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
    setSelectedRepo([]);
    window.location.reload();
  };

  useEffect(() => {
    let result = JSON.parse(window.localStorage.getItem('repos'));
    if (result === null) {
      return;
    }
    setSelectedRepo(result);
  }, []);

  useEffect(() => {
    queueMicrotask(async () => {
      if (keyword === '') return;
      let result = await getData(keyword, page);
      let data = result.data.items;
      setRepository(data);
      setIsLoading(false);
    });
  }, [page, keyword, setRepository, getData]);

  return (
    <SearchComponent>
      <Header>
        <Title onClick={moveToMain}>Github Repository Search</Title>
        <SearchForm onSubmit={onSearch}>
          <SearchInput ref={inputRef} type="text" autoFocus />
          <SearchButton type="submit" value="검색" onClick={onSearch} />
        </SearchForm>
      </Header>
      <SearchResult>
        <ResultRepository selectedRepo={selectedRepo}>
          {isLoading ? (
            <RepositoryList>
              {loadingData.map((v, i) => (
                <Skeleton key={i} />
              ))}
            </RepositoryList>
          ) : (
            <>
              <RepositoryList>
                {repository?.length > 0 &&
                  repository.map((repo, index) => (
                    <ItemCard
                      key={index}
                      repo={repo}
                      onSelectRepo={onSelectRepo}
                    />
                  ))}
              </RepositoryList>
              <Pagenation>
                {repository.length > 0 && (
                  <PageComponent
                    page={page}
                    setPage={setPage}
                    repository={repository}
                  />
                )}
              </Pagenation>
            </>
          )}
        </ResultRepository>
        {selectedRepo.length > 0 && (
          <SaveRepo>
            <SaveRepoTitle>Saved Repository</SaveRepoTitle>
            {selectedRepo?.map((repo, index) => (
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
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
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
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  @media ${({ theme }) => theme.device.base} {
    font-size: ${({ theme }) => theme.fontSize.md};
  }
  @media ${({ theme }) => theme.device.small} {
    font-size: ${({ theme }) => theme.fontSize.base};
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
  border-bottom: 1px solid #ddd;
  font-size: ${({ theme }) => theme.fontSize.md};
  &:focus {
    outline: none;
  }
  @media ${({ theme }) => theme.device.base} {
    margin-left: 10px;
    font-size: ${({ theme }) => theme.fontSize.base};
  }
  @media ${({ theme }) => theme.device.small} {
    font-size: ${({ theme }) => theme.fontSize.sm};
    margin-left: 10px;
  }
`;

const SearchButton = styled.input`
  width: 20%;
  margin-left: 5px;
  border: none;
  border-radius: 3px;
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.lightversion.fontSecondary};
  cursor: pointer;
  transition: transform 200ms ease-in;
  &:hover {
    transform: scale(1.05);
    background-color: ${({ theme }) => theme.lightversion.hover};
    color: ${({ theme }) => theme.lightversion.fontPrimary};
  }
  @media ${({ theme }) => theme.device.base} {
    margin-left: 10px;
    font-size: ${({ theme }) => theme.fontSize.base};
  }
  @media ${({ theme }) => theme.device.small} {
    font-size: ${({ theme }) => theme.fontSize.sm};
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
  @media ${({ theme }) => theme.device.base} {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
  }
`;

const SaveRepo = styled.div`
  width: 30%;
  height: 100%;
  background-color: ${({ theme }) => theme.lightversion.secondary};
  min-width: 220px;
`;

const SaveRepoTitle = styled.span`
  display: block;
  padding: 20px 0 10px 20px;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  @media ${({ theme }) => theme.device.base} {
    font-size: ${({ theme }) => theme.fontSize.base};
    padding: 20px 0 10px 10px;
  }
  @media ${({ theme }) => theme.device.small} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

const SearchResult = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.lightversion.secondary};
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
