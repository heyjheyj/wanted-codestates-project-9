import React, { useEffect } from 'react';
import { Octokit } from '@octokit/core';
import { useParams } from 'react-router-dom';
import IssueCard from '../components/IssueCard';

const octokit = new Octokit({ auth: `${process.env.REACT_APP_GITHUB_TOKEN}` });

const Issue = (props) => {
  const { user, repo } = useParams();
  console.log(user, repo);

  const searchIssues = async (page) => {
    let res = await octokit.request(
      `GET /repos/${user}/${repo}/issues?page=${page}`,
    );
    console.log(res);
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
    <>
      <h3>
        {user}'s {repo} Issues
      </h3>
      <IssueCard />
    </>
  );
};

export default Issue;
