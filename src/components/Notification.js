import React, { useState, useEffect } from 'react';
import Toast from './Toast';
import styled from 'styled-components';

const Notification = ({ notification, setNotification }) => {
  console.log('noti', notification);
  const [toastList, setToastList] = useState();

  const onDelete = (dismissed) => {
    console.log(dismissed);
    let result = toastList.filter((item) => item.id !== dismissed.id);
    setNotification(result);
  };

  useEffect(() => {
    setToastList([...notification]);
  }, [notification]);

  return (
    <Notifications>
      {toastList?.map((item, index) => (
        <Toast key={index} item={item} onDelete={onDelete} />
      ))}
    </Notifications>
  );
};

export default Notification;

const Notifications = styled.div`
  position: fixed;
  box-sizing: border-box;
  top: 0;
  right: 40px;
`;
