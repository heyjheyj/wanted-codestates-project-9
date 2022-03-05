import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Octokit } from '@octokit/core';
import ItemCard from '../components/ItemCard';

const octokit = new Octokit({ auth: `${process.env.REACT_APP_GITHUB_TOKEN}` });

const Search = ({ setRepository, setUser, setRepo, repository }) => {
  const [keyword, setKeyword] = useState('');
  const inputRef = useRef();

  const onChagneText = (e) => {
    setKeyword(e.target.value);
  };

  const onSearch = async (e) => {
    e.preventDefault();
    if (keyword === '') {
      return;
    }
    try {
      let result = await octokit.request('GET /search/repositories', {
        q: keyword,
      });
      let data = result.data.items;
      setRepository(result.data.items);
      console.log(data);
      // data.map((item) => {
      //   let [user, repo] = item.full_name.split('/');
      //   setUser(user);
      //   setRepo(repo);
      //   console.log(user, repo);
      // });
    } catch (err) {
      console.log(err);
    }
    inputRef.current.value = '';
  };

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
      <RepositoryList>
        {repository?.length > 0 &&
          repository.map((repo) => <ItemCard repo={repo} />)}
      </RepositoryList>
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
  &:hover {
    background: #ddd;
    cursor: pointer;
  }
`;

const RepositoryList = styled.ul`
  margin: auto;
  margin-top: 20px;
  width: 93%;
  padding: 20px;
  height: 100%;
  border: 1px solid gray;
  overflow: scroll;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
