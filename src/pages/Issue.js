import React, { useEffect, useState, useCallback } from 'react';
import { Octokit } from '@octokit/core';
import { useNavigate, useParams } from 'react-router-dom';
import IssueCard from '../components/IssueCard';
import styled from 'styled-components';

const octokit = new Octokit({ auth: `${process.env.REACT_APP_GITHUB_TOKEN}` });

const Issue = (props) => {
  const { user, repo } = useParams();
  const [issues, setIssues] = useState([]);
  const navigate = useNavigate();

  const searchIssues = useCallback(
    async (page) => {
      let res = await octokit.request(
        `GET /repos/${user}/${repo}/issues?page=${page}&per_page=100`,
      );
      console.log('api 호출:', res);
      return res;
    },
    [repo, user],
  );

  const goToMain = () => {
    props.setRepository([]);
    navigate('/');
  };

  useEffect(() => {
    queueMicrotask(async () => {
      if (user && repo) {
        let page = 1;
        let res = await searchIssues(page);
        setIssues(res.data);
      } else {
        return;
      }
    });
  }, [user, repo, searchIssues]);

  return (
    <IssueComponent>
      <MainButton onClick={goToMain}>Main</MainButton>
      <UserInfo>
        {issues.length > 0 ? (
          <Avatar src={`${issues[0].user.avatar_url}`} alt="photo" />
        ) : (
          ''
        )}
        <RepoInfo>
          {user}'s {repo} Issues
        </RepoInfo>
      </UserInfo>
      <IssueContainer>
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
  background: ${({ theme }) => theme.lightversion.secondary};
  width: 60px;
  height: 40px;
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.lightversion.fontSecondary};
  border-radius: 10px;
  position: absolute;
  top: 10px;
  left: 20px;
  &:hover {
    background: ${({ theme }) => theme.lightversion.hover};
    color: ${({ theme }) => theme.lightversion.fontPrimary};
    cursor: pointer;
  }
  @media ${({ theme }) => theme.device.base} {
    font-size: ${({ theme }) => theme.fontSize.base};
    width: 50px;
    left: 15px;
  }
  @media ${({ theme }) => theme.device.small} {
    font-size: ${({ theme }) => theme.fontSize.sm};
    width: 40px;
    left: 10px;
  }
`;

const RepoInfo = styled.span`
  text-align: center;
  margin-left: 10px;
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  @media ${({ theme }) => theme.device.base} {
    font-size: ${({ theme }) => theme.fontSize.md};
  }
  @media ${({ theme }) => theme.device.small} {
    font-size: ${({ theme }) => theme.fontSize.base};
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
  width: 90%;
  height: 90%;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;
