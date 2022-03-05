import React from 'react';
import styled from 'styled-components';

const ItemCard = ({ repo, onSelectRepo }) => {
  console.log(repo);

  const selectRepo = () => {
    onSelectRepo();
  };

  return (
    <Item onClick={selectRepo}>
      <User>
        <UserProfile src={`http://github.com/${repo.owner.login}.png`} />
        <UserName>{repo.owner.login}</UserName>
      </User>
      <Repository>{repo.name}</Repository>
      {repo.language && (
        <LanguageInfo>
          Language: <Language>{repo.language}</Language>
        </LanguageInfo>
      )}
    </Item>
  );
};

export default ItemCard;

const Item = styled.li`
  list-style: none;
  margin: 3px;
  padding: 6px;
  width: 45%;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: white;
  &:hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }
`;

const User = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding-bottom: 5px;
  border-bottom: 1px solid #ddd;
`;

const UserProfile = styled.img`
  width: 30px;
  height: 30px;
  border: 1px solid #f0f0f0;
  border-radius: 50%;
  margin-left: 5px;
`;

const UserName = styled.span`
  font-size: 16px;
  margin-left: 6px;
  color: gray;
`;

const Repository = styled.span`
  font-size: 16px;
  display: block;
  padding: 5px;
  font-weight: 600;
`;

const LanguageInfo = styled.span`
  font-size: 14px;
  display: block;
  color: gray;
  padding: 0 5px;
`;

const Language = styled.span`
  height: auto;
  width: auto;
  text-align: center;
  padding: 0 2px 0 2px;
  background-color: #ddd;
  font-size: 14px;
  border-radius: 5px;
  color: black;
  margin-left: 2px;
`;
