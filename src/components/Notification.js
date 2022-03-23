import React, { useState, useEffect, useCallback } from 'react';
import Toast from './Toast';
import styled from 'styled-components';

const Notification = ({ notification, setNotification }) => {
  const [toastList, setToastList] = useState();

  const spliceArray = useCallback(() => {
    setTimeout(() => {
      toastList.splice(0, 4);
      setNotification(toastList);
    }, 100);
  }, [toastList, setNotification]);

  useEffect(() => {
    if (toastList?.length > 5) {
      spliceArray();
    }
    return () => {
      clearTimeout(spliceArray);
    };
  }, [toastList, setNotification, spliceArray]);

  useEffect(() => {
    setToastList([...notification]);
  }, [notification]);

  return (
    <Notifications>
      {toastList?.map((item, index) => (
        <Toast key={index} item={item} />
      ))}
    </Notifications>
  );
};

export default Notification;

const Notifications = styled.div`
  position: fixed;
  box-sizing: border-box;
  bottom: 80px;
  right: 40px;
`;
