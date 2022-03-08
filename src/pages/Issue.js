import React, { useEffect, useState } from 'react';
import { Octokit } from '@octokit/core';
import { useParams } from 'react-router-dom';
import IssueCard from '../components/IssueCard';
import styled from 'styled-components';

const octokit = new Octokit({ auth: `${process.env.REACT_APP_GITHUB_TOKEN}` });

const Issue = (props) => {
  const { user, repo } = useParams();
  const [issues, setIssues] = useState([]);

  const searchIssues = async (page) => {
    let res = await octokit.request(
      `GET /repos/${user}/${repo}/issues?page=${page}`,
    );
    setIssues(res.data);
  };

  useEffect(() => {
    if (user && repo) {
      let page = 1;
      let res = searchIssues(page);
      console.log(res);
    } else {
      return;
    }
  }, [user, repo]);

  return (
    <IssueComponent>
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

const RepoInfo = styled.h2`
  text-align: center;
  margin-left: 10px;
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
`;

const IssueContainer = styled.ul`
  margin: 0;
  padding: 20px;
  width: 90%;
  height: 90%;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
`;
