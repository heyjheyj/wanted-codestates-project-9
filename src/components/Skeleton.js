import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useSelector } from 'react-redux';

const Skeleton = (props) => {
  const isSwitchOn = useSelector((state) => state.toggleReducer.isSwitchOn);
  return <Item isSwitchOn={isSwitchOn} />;
};

export default Skeleton;

const shine = keyframes`
  from {
    opacity: 0.1;
  }
  to {
    opacity: 1;
  }
`;

const Item = styled.li`
  list-style: none;
  margin: 3px;
  padding: 6px;
  height: 92px;
  width: 45%;
  border-radius: 10px;
  background-color: ${(props) => (props.isSwitchOn ? '#525252' : '#f1f1f1')};
  animation: ${shine} 1s infinite;
  @media ${({ theme }) => theme.device.base} {
    width: 90%;
    margin: auto;
    margin-top: 5px;
  }
`;
