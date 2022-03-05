import React, { useEffect } from 'react';
import { Octokit } from '@octokit/core';

const octokit = new Octokit({ auth: `${process.env.REACT_APP_GITHUB_TOKEN}` });

const Issue = ({ user, repo }) => {
  const searchIssues = async () => {
    let res = await octokit.request(`GET /repos/${user}/${repo}/issues`);
    // let result = await Axios.get(
    //   `https://api.github.com/repos/exercism/typescript/issues?page=1`
    // )
    //   .then((res) => console.log(res.data))
    //   .catch((err) => console.log(err));
    console.log(res);
  };

  useEffect(() => {
    if (user && repo) {
      let res = searchIssues();
      console.log(res);
    } else {
      return;
    }
  }, [user, repo]);

  return <h1>issue</h1>;
};

export default Issue;
