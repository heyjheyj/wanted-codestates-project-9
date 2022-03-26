import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const ItemCard = (props) => {
  const isSwitchOn = useSelector((state) => state.toggleReducer.isSwitchOn);
  const theme = useSelector((state) => state.theme);

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
          theme={theme}
        >
          <User theme={theme} isSwitchOn={isSwitchOn}>
            <UserProfile
              theme={theme}
              isSwitchOn={isSwitchOn}
              src={`http://github.com/${props.repo.owner.login}.png`}
            />
            <UserName theme={theme} isSwitchOn={isSwitchOn}>
              {props.repo.owner.login}
            </UserName>
            {props.repo.open_issues > 0 ? (
              ''
            ) : (
              <NoIssues theme={theme} isSwitchOn={isSwitchOn}>
                No Issues
              </NoIssues>
            )}
          </User>
          <Repository theme={theme} isSwitchOn={isSwitchOn}>
            {props.repo.name}
          </Repository>
          {props.repo.language && (
            <LanguageInfo theme={theme} isSwitchOn={isSwitchOn}>
              Language:{' '}
              <Language theme={theme} isSwitchOn={isSwitchOn}>
                {props.repo.language}
              </Language>
            </LanguageInfo>
          )}
        </Item>
      ) : (
        <SelectedItem
          theme={theme}
          isSwitchOn={isSwitchOn}
          onClick={() => props.moveToSelectedRepo(props.repo)}
        >
          <SelectedUser>
            <UserSection>
              <UserProfile
                theme={theme}
                isSwitchOn={isSwitchOn}
                src={`http://github.com/${props.repo.owner.login}.png`}
              />
              <UserName theme={theme} isSwitchOn={isSwitchOn}>
                {props.repo.owner.login}
              </UserName>
            </UserSection>
            <DeleteButton
              theme={theme}
              isSwitchOn={isSwitchOn}
              onClick={deleteRepo}
            >
              삭제
            </DeleteButton>
          </SelectedUser>
          <Repository theme={theme} isSwitchOn={isSwitchOn}>
            {props.repo.name}
          </Repository>
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
  border: 1px solid
    ${(props) =>
      props.isSwitchOn
        ? props.theme.darkversion.cardDV
        : props.theme.lightversion.secondary};
  border-radius: 10px;
  overflow: hidden;
  background-color: ${(props) =>
    props.able === 'able'
      ? props.isSwitchOn
        ? props.theme.darkversion.cardBg
        : props.theme.lightversion.background
      : ''};
  &:hover {
    background-color: ${(props) =>
      props.able === 'able'
        ? props.isSwitchOn
          ? props.theme.darkversion.hover
          : props.theme.lightversion.hover
        : ''};
    cursor: ${(props) => props.able === 'able' && 'pointer'};
  }
  @media ${(props) => props.theme.windowSize.base} {
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
  border-bottom: 1px solid
    ${(props) =>
      props.isSwitchOn
        ? props.theme.darkversion.cardDV
        : props.theme.lightversion.secondary};
  position: relative;
`;

const UserProfile = styled.img`
  width: 30px;
  height: 30px;
  border: 1px solid
    ${(props) =>
      props.isSwitchOn
        ? props.theme.darkversion.cardDV
        : props.theme.lightversion.secondary};
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
  @media ${(props) => props.theme.windowSize.large} {
    font-size: ${(props) => props.theme.fontSize.sm};
  }
`;

const Repository = styled.span`
  font-size: 16px;
  display: block;
  padding: 5px;
  font-weight: 500;
  color: ${(props) =>
    props.isSwitchOn
      ? props.theme.darkversion.fontPrimary
      : props.theme.lightversion.fontPrimary};
`;

const LanguageInfo = styled.span`
  font-size: 14px;
  display: block;
  color: ${(props) =>
    props.isSwitchOn
      ? props.theme.darkversion.cardDV
      : props.theme.lightversion.fontSecondary};
  padding: 0 5px;
`;

const Language = styled.span`
  height: auto;
  width: auto;
  text-align: center;
  padding: 0 2px 0 2px;
  background-color: ${(props) =>
    props.isSwitchOn
      ? props.theme.darkversion.cardDV
      : props.theme.lightversion.secondary};
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
  border: 1px solid
    ${(props) =>
      props.isSwitchOn
        ? props.theme.darkversion.cardDV
        : props.theme.lightversion.secondary};
  border-radius: 10px;
  overflow: hidden;
  background-color: ${(props) =>
    props.isSwitchOn
      ? props.theme.darkversion.cardBg
      : props.theme.lightversion.background};
  &:hover {
    background-color: ${(props) =>
      props.isSwitchOn
        ? props.theme.darkversion.hover
        : props.theme.lightversion.hover2};
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
