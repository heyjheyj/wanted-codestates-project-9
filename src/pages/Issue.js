import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import IssueCard from '../components/IssueCard';
import styled from 'styled-components';
import { Octokit } from '@octokit/core';
import { useSelector, useDispatch } from 'react-redux';
import { getSwitchState } from '../redux/toggleReducer';

const octokit = new Octokit({ auth: `${process.env.REACT_APP_GITHUB_TOKEN}` });

const Issue = (props) => {
  const dispatch = useDispatch();
  const isSwitchOn = useSelector((state) => state.toggleReducer.isSwitchOn);
  const theme = useSelector((state) => state.theme);

  const { user, repo } = useParams();
  const navigate = useNavigate();
  const [issues, setIssues] = useState();

  const getIssue = async (user, repo, page) => {
    let res = await octokit.request(
      `GET /repos/${user}/${repo}/issues?page=${page}&per_page=100`,
    );
    let data = res.data;
    return data;
  };

  const goToMain = () => {
    navigate('/');
  };

  useEffect(() => {
    queueMicrotask(async () => {
      if (user && repo) {
        let page = 1;
        let result = await getIssue(user, repo, page);
        setIssues(result);
      } else {
        return;
      }
    });
  }, [user, repo]);

  useEffect(() => {
    dispatch(getSwitchState());
  });

  return (
    <IssueComponent>
      <MainButton isSwitchOn={isSwitchOn} theme={theme} onClick={goToMain}>
        Main
      </MainButton>
      <UserInfo>
        {issues?.length > 0 ? (
          <Avatar src={`${issues[0].user.avatar_url}`} alt="photo" />
        ) : (
          ''
        )}
        <RepoInfo isSwitchOn={isSwitchOn} theme={theme}>
          {user}'s {repo} Issues
        </RepoInfo>
      </UserInfo>
      <IssueContainer isSwitchOn={isSwitchOn} theme={theme}>
        {issues?.map((issue, index) => (
          <IssueCard issue={issue} key={index} user={user} repo={repo} />
        ))}
      </IssueContainer>
    </IssueComponent>
  );
};

export default Issue;

const UserInfo = styled.section`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

const MainButton = styled.button`
  border: none;
  background: ${(props) =>
    props.isSwitchOn
      ? props.theme.darkversion.cardBg
      : props.theme.lightversion.secondary};
  width: 60px;
  height: 40px;
  font-size: ${(props) => props.theme.fontSize.md};
  color: ${(props) => props.theme.lightversion.fontSecondary};
  border-radius: 10px;
  position: absolute;
  top: 10px;
  left: 20px;
  &:hover {
    background: ${(props) =>
      props.isSwitchOn
        ? props.theme.darkversion.cardDV
        : props.theme.lightversion.hover};
    color: ${(props) => props.theme.lightversion.fontPrimary};
    cursor: pointer;
  }
  @media ${(props) => props.theme.windowSize.base} {
    font-size: ${(props) => props.theme.fontSize.base};
    width: 50px;
    left: 15px;
  }
  @media ${(props) => props.theme.windowSize.small} {
    font-size: ${(props) => props.theme.fontSize.sm};
    width: 40px;
    left: 10px;
  }
`;

const RepoInfo = styled.span`
  text-align: center;
  margin-left: 10px;
  font-size: ${(props) => props.theme.fontSize.lg};
  color: ${(props) =>
    props.isSwitchOn
      ? props.theme.darkversion.fontPrimary
      : props.theme.lightversion.fontPrimary};
  font-weight: 600;
  @media ${(props) => props.theme.windowSize.base} {
    font-size: ${(props) => props.theme.fontSize.md};
  }
  @media ${(props) => props.theme.windowSize.small} {
    font-size: ${(props) => props.theme.fontSize.base};
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #ddd;
`;

const IssueComponent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  position: relative;
  min-width: 600px;
`;

const IssueContainer = styled.ul`
  margin: 0;
  padding: 20px;
  width: 100%;
  height: 90%;
  border: 1px solid
    ${(props) =>
      props.isSwitchOn
        ? props.theme.darkversion.cardDV
        : props.theme.lightversion.secondary};
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;
