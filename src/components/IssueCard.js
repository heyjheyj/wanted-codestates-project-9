import React from 'react';
import styled from 'styled-components';

const IssueCard = ({ issue, user, repo }) => {
  const convertDate = () => {
    let date = issue.created_at;
    let result = date.replace('T', ' ').substring(0, 19);
    return result;
  };

  return (
    <a href={`https://github.com/${user}/${repo}/issues/${issue.number}`}>
      <Card>
        <IssueTitle>{issue.title}</IssueTitle>
        <IssueContent>
          <IssueNumber>#{issue.number}, </IssueNumber>
          이슈 생성일: {convertDate()},{' '}
          <State state={issue.closed_at === null ? 'open' : 'close'}>
            {issue.closed_at === null ? 'Open' : 'Close'}
          </State>
        </IssueContent>
      </Card>
    </a>
  );
};

export default IssueCard;

const Card = styled.li`
  list-style: none;
  margin: 5px 0;
  padding: 10px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 45px;
  border: 1px solid #ddd;
  border-radius: 10px;
  &:hover {
    background: #ddd;
    cursor: pointer;
  }
`;

const IssueTitle = styled.h3`
  margin: 0;
  padding: 0;
  margin: 0 15px;
`;

const IssueContent = styled.span`
  font-size: 14px;
  margin-left: 15px;
`;

const State = styled.span`
  color: ${(props) => (props.state === 'open' ? 'red' : 'green')};
`;

const IssueNumber = styled.span`
  font-weight: 600;
`;
