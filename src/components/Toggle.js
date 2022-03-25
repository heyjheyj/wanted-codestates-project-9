import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { switchOn, getSwitchState } from '../redux/toggleReducer';

const Toggle = (props) => {
  const dispatch = useDispatch();
  const isSwitchOn = useSelector((state) => state.toggleReducer.isSwitchOn);

  const toggleSwitch = () => {
    dispatch(switchOn());
  };

  useEffect(() => {
    dispatch(getSwitchState());
  }, [dispatch]);

  return (
    <ToggleContainer>
      {isSwitchOn ? <Dark>🌙</Dark> : <Light>☀️</Light>}
      <ToggleSwitch>
        <Checkbox
          type="checkbox"
          id="toggleSwitch"
          onClick={toggleSwitch}
          isSwitchOn={isSwitchOn}
        />
        <Label htmlFor="toggleSwitch" isSwitchOn={isSwitchOn}>
          <ToggleInner isSwitchOn={isSwitchOn} />
          <Switch isSwitchOn={isSwitchOn} />
        </Label>
      </ToggleSwitch>
    </ToggleContainer>
  );
};

export default Toggle;

const ToggleContainer = styled.div`
  width: auto;
  height: auto;
`;

const Light = styled.span`
  position: relative;
  font-size: 22px;
  top: 7px;
`;

const Dark = styled.span`
  position: relative;
  font-size: 20px;
  top: 6px;
`;

const ToggleSwitch = styled.div`
  left: 8px;
  position: relative;
  width: 50px;
  display: inline-block;
  text-align: left;
  top: 10px;
`;

const Checkbox = styled.input`
  display: none;
  margin-left: ${(props) => props.isSwitchOn && 0};
  right: ${(props) => !props.isSwitchOn && 0};
`;

const Label = styled.label`
  display: block;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #bbb;
  border-radius: 20px;
  margin-left: ${(props) => props.isSwitchOn && 0};
  right: ${(props) => !props.isSwitchOn && 0};
`;

const ToggleInner = styled.span`
  display: block;
  width: 200%;
  margin-left: -100%;
  transition: margin-left 0.4s ease-in;
  margin-left: ${(props) => props.isSwitchOn && 0};
  &:before {
    float: left;
    width: 50%;
    height: 20px;
    padding: 0;
    box-sizing: border-box;
    content: '';
    background-color: #0e1116;
  }
  &:after {
    float: left;
    width: 50%;
    height: 20px;
    padding: 0;
    box-sizing: border-box;
    content: '';
    background-color: #bbb;
  }
`;

const Switch = styled.span`
  display: block;
  width: 12px;
  margin: 5px;
  background: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 28px;
  border: 0 solid #bbb;
  border-radius: 50%;
  transition: all 0.4s ease-in;
  right: ${(props) => props.isSwitchOn && 0};
`;
