import React, { useEffect, useCallback } from 'react';
import Toast from './Toast';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { clearNoti } from '../redux/notiReducer';

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notifications.data);

  const spliceArray = useCallback(() => {
    setTimeout(() => {
      dispatch(clearNoti());
    }, 18000);
  }, [dispatch]);

  useEffect(() => {
    if (notification?.length > 0) {
      spliceArray();
    }
    return () => {
      clearTimeout(spliceArray);
    };
  }, [notification, spliceArray]);

  return (
    <Notifications>
      {notification?.map((item, index) => (
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
