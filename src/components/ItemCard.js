import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const ItemCard = (props) => {
  const isSwitchOn = useSelector((state) => state.toggleReducer.isSwitchOn);

  const selectRepo = () => {
    if (props.repo.open_issues < 1) {
      return;
    } else {
      props.onSelectRepo(props.repo);
    }
  };

  const deleteRepo = (e) => {
    e.stopPropagation();
    props.onDeleteRepo(props.repo);
  };

  return (
    <>
      {props.onSelectRepo ? (
        <Item
          onClick={selectRepo}
          able={props.repo.open_issues > 0 ? 'able' : 'unable'}
          isSwitchOn={isSwitchOn}
        >
          <User>
            <UserProfile
              src={`http://github.com/${props.repo.owner.login}.png`}
            />
            <UserName>{props.repo.owner.login}</UserName>
            {props.repo.open_issues > 0 ? '' : <NoIssues>No Issues</NoIssues>}
          </User>
          <Repository>{props.repo.name}</Repository>
          {props.repo.language && (
            <LanguageInfo>
              Language: <Language>{props.repo.language}</Language>
            </LanguageInfo>
          )}
        </Item>
      ) : (
        <SelectedItem onClick={() => props.moveToSelectedRepo(props.repo)}>
          <SelectedUser>
            <UserSection>
              <UserProfile
                src={`http://github.com/${props.repo.owner.login}.png`}
              />
              <UserName>{props.repo.owner.login}</UserName>
            </UserSection>
            <DeleteButton onClick={deleteRepo}>삭제</DeleteButton>
          </SelectedUser>
          <Repository>{props.repo.name}</Repository>
        </SelectedItem>
      )}
    </>
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
  overflow: hidden;
  background-color: ${(props) => (props.able === 'able' ? 'white' : '#f0f0f0')};
  &:hover {
    background-color: ${(props) =>
      props.able === 'able' ? '#00a0ff10' : '#f0f0f0'};
    cursor: ${(props) => props.able === 'able' && 'pointer'};
  }
  @media ${({ theme }) => theme.device.base} {
    width: 90%;
    margin: auto;
    margin-top: 5px;
  }
`;

const User = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding-bottom: 5px;
  border-bottom: 1px solid #ddd;
  position: relative;
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

const NoIssues = styled.span`
  font-size: 16px;
  color: #00a0ff;
  position: absolute;
  right: 10px;
  @media ${({ theme }) => theme.device.large} {
    opacity: 0;
  }
`;

const Repository = styled.span`
  font-size: 16px;
  display: block;
  padding: 5px;
  font-weight: 500;
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

const SelectedUser = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #ddd;
  justify-content: space-between;
  align-items: center;
`;

const SelectedItem = styled.li`
  list-style: none;
  padding: 6px;
  width: 90%;
  margin: auto;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
  &:hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }
`;

const DeleteButton = styled.button`
  width: 40px;
  height: 20px;
  background-color: #f0f0f0;
  border: none;
  margin-right: 10px;
  border-radius: 5px;
  color: gray;
  cursor: pointer;
  transition: transform 200ms ease-in;
  &:hover {
    transform: scale(1.05);
    background-color: #00a0ff50;
    color: black;
  }
`;

const UserSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding-bottom: 5px;
`;
