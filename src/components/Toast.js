import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

const Toast = ({ item, onDelete }) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
    }, item.dismissTime);
    return () => {
      clearInterval(interval);
    };
  }, [item.dismissTime]);

  // useEffect(() => {
  //   if (item.id + 5000 < Date.now()) {
  //     console.log(item.id);
  //     console.log(Date.now());
  //     console.log(item);
  //     onDelete(item);
  //   }
  // }, [item.id]);

  return (
    <ToastMessage type={`${item.type}`} isFading={isFading}>
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

// const fade = keyframes`
//   from {
//     transform: translateX(0px);
//   } to {
//     transform: translateX(100%);
//     opacity: 0;
//   }
// `;

const ToastMessage = styled.div`
  margin-top: 8px;
  top: 12px;
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

  font-size: ${({ theme }) => theme.fontSize.base};
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${show} 1.5s ease-in-out;

  ${(props) =>
    props.isFading &&
    css`
      display: none;
      transform: display 4s ease-in-out;
    `}
`;
