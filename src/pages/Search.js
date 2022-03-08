import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Octokit } from '@octokit/core';
import ItemCard from '../components/ItemCard';
import { useNavigate } from 'react-router-dom';
import PageComponent from '../components/Pagination';

const octokit = new Octokit({ auth: `${process.env.REACT_APP_GITHUB_TOKEN}` });

const Search = ({ setRepository, setUserInfo, repository, userInfo }) => {
  const [keyword, setKeyword] = useState('');
  const [selectedRepo, setSelectedRepo] = useState([]);
  const [page, setPage] = useState(1);
  const inputRef = useRef();
  const navigate = useNavigate();

  const onChagneText = (e) => {
    setKeyword(e.target.value);
  };

  const getData = async (keyword, page) => {
    console.log('ssss');
    let result = await octokit.request(
      `GET /search/repositories?page=${page}`,
      {
        q: keyword,
      },
    );
    return result;
  };

  const onSearch = async (e) => {
    e.preventDefault();
    if (keyword === '') {
      return;
    }
    try {
      let result = await getData(keyword, page);
      let data = result.data.items;
      setRepository(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    inputRef.current.value = '';
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
      }
    } else if (selectedRepo.length > 3) {
      alert('최대 4개의 Repository만 저장할 수 있습니다.');
    }
  };

  const onDeleteRepo = (repo) => {
    let result = selectedRepo.filter((selected) => selected.id !== repo.id);
    setSelectedRepo(result);
  };

  const moveToSelectedRepo = (repo) => {
    userInfo.map(
      (user) =>
        user.id === repo.id && navigate(`/issue/${user.user}/${user.repo}`),
    );
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
    });
  }, [page, keyword, setRepository]);

  return (
    <SearchComponent>
      <Header>
        <Title>Github Repository Search</Title>
        <SearchForm onSubmit={onSearch}>
          <SearchInput
            ref={inputRef}
            type="text"
            value={keyword}
            onChange={onChagneText}
            autoFocus
          />
          <SearchButton type="submit" value="검색" onClick={onSearch} />
        </SearchForm>
      </Header>
      <SearchResult>
        <ResultRepository selectedRepo={selectedRepo}>
          <RepositoryList>
            {repository?.length > 0 &&
              repository.map((repo, index) => (
                <ItemCard key={index} repo={repo} onSelectRepo={onSelectRepo} />
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
    </SearchComponent>
  );
};

export default Search;

const SearchComponent = styled.div`
  width: 90%;
  height: 90%;
  padding: 20px;
  max-width: 800px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
  padding: 0;
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
  font-size: 18px;
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.input`
  width: 20%;
  margin-left: 5px;
  border: none;
  border-radius: 3px;
  font-size: 16px;
  color: gray;
  cursor: pointer;
  transition: transform 200ms ease-in;
  &:hover {
    transform: scale(1.05);
    background-color: #00a0ff50;
    color: black;
  }
`;

const ResultRepository = styled.div`
  margin: auto;
  width: ${(props) => (props.selectedRepo.length > 0 ? '60%' : '93%')};
  height: 100%;
  margin: 20px;
  overflow: scroll;
`;

const RepositoryList = styled.ul`
  margin: auto;
  padding: 0;
  height: auto;
  width: 97%;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 30px;
  justify-content: space-between;
`;

const SaveRepo = styled.div`
  width: 40%;
  height: 100%;
  background-color: #ddd;
`;

const SaveRepoTitle = styled.h3`
  margin: 0;
  padding: 0;
  margin: 20px 0 10px 20px;
`;

const SearchResult = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid gray;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;

const Pagenation = styled.div`
  width: 100%;
  height: 30px;
  margin-bottom: 30px;
  text-align: center;
`;
