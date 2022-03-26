import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useSelector } from 'react-redux';

const Toast = ({ item }) => {
  const [isFading, setIsFading] = useState(false);
  const theme = useSelector((state) => state.theme);
  const isSwitchOn = useSelector((state) => state.toggleReducer.isSwitchOn);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
    }, item.dismissTime);
    return () => {
      clearInterval(interval);
    };
  }, [item.dismissTime]);

  return (
    <ToastMessage
      theme={theme}
      isSwitchOn={isSwitchOn}
      type={`${item.type}`}
      isFading={isFading}
    >
      {item.description}
    </ToastMessage>
  );
};

export default Toast;

const show = keyframes`
  from {
    transform: translateX(100%);
  } to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

const ToastMessage = styled.div`
  margin-top: 8px;
  bottom: 12px;
  right: 12px;
  min-width: 200px;
  min-height: 30px;

  color: #f0f0f0;
  font-family: sans-serif;
  padding: 10px;
  background-color: ${(props) =>
    props.type === 'success' ? '#5cb85c' : '#d9534f'};
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  font-size: ${(props) => props.theme.fontSize.base};
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${show} 1.5s ease-in-out;

  ${(props) =>
    props.isFading &&
    css`
      display: none;
      transform: display 3s ease-in-out;
    `}
`;
