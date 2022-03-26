import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const IssueCard = ({ issue, user, repo }) => {
  const theme = useSelector((state) => state.theme);
  const isSwitchOn = useSelector((state) => state.toggleReducer.isSwitchOn);

  const convertDate = () => {
    let date = issue.created_at;
    let result = date.replace('T', ' ').substring(0, 19);
    return result;
  };

  return (
    <a href={`https://github.com/${user}/${repo}/issues/${issue.number}`}>
      <Card isSwitchOn={isSwitchOn} theme={theme}>
        <IssueTitle isSwitchOn={isSwitchOn} theme={theme}>
          {issue.title}
        </IssueTitle>
        <IssueContent isSwitchOn={isSwitchOn} theme={theme}>
          <IssueNumber theme={theme} isSwitchOn={isSwitchOn}>
            #{issue.number},{' '}
          </IssueNumber>
          이슈 생성일: {convertDate()},{' '}
          <State
            theme={theme}
            isSwitchOn={isSwitchOn}
            state={issue.closed_at === null ? 'open' : 'close'}
          >
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
  background-color: ${(props) =>
    props.isSwitchOn
      ? props.theme.darkversion.cardBg
      : props.theme.lightversion.hover2};
  border-radius: 10px;
  &:hover {
    background: ${(props) =>
      props.isSwitchOn
        ? props.theme.darkversion.hover
        : props.theme.lightversion.hover};
    cursor: pointer;
  }
`;

const IssueTitle = styled.span`
  margin: 0 15px;
  color: ${(props) =>
    props.isSwitchOn
      ? props.theme.darkversion.fontPrimary
      : props.theme.lightversion.fontPrimary};
  font-size: ${(props) => props.theme.fontSize.md};
  font-weight: 600;
  @media ${(props) => props.theme.windowSize.base} {
    font-size: ${(props) => props.theme.fontSize.base};
  }
  @media ${(props) => props.theme.windowSize.small} {
    font-size: ${(props) => props.theme.fontSize.sm};
  }
`;

const IssueContent = styled.span`
  color: ${(props) =>
    props.isSwitchOn
      ? props.theme.darkversion.cardDV
      : props.theme.lightversion.fontPrimary};
  font-size: ${(props) => props.theme.fontSize.base};
  margin-left: 15px;
  @media ${(props) => props.theme.windowSize.base} {
    font-size: ${(props) => props.theme.fontSize.sm};
  }
  @media ${(props) => props.theme.windowSize.small} {
    font-size: ${(props) => props.theme.fontSize.xs};
  }
`;

const State = styled.span`
  color: ${(props) => (props.state === 'open' ? 'red' : 'green')};
`;

const IssueNumber = styled.span`
  font-weight: 600;
`;
