import React from 'react';
import styled from 'styled-components';
import { remote } from 'electron';

const minimize = () => {
  remote.BrowserWindow.getFocusedWindow().minimize();
};

const maximize = () => {
  const window = remote.BrowserWindow.getFocusedWindow();
  if (window.isMaximized()) {
    window.unmaximize();
  } else {
    window.maximize();
  }
};

const close = () => {
  remote.BrowserWindow.getFocusedWindow().close();
};

const HeaderIcon = styled.span`
  -webkit-app-region: no-drag;
  background: white;
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
  height: 12px;
  width: 12px;
  transition: opacity 100ms linear;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.2;
  }
`;

const HeaderIconWrapper = styled.div`
  position: absolute;
  left: 50px;
  top: 50%;
  transform: translateY(-50%);
`;

const HeaderIcons = () => (
  <HeaderIconWrapper>
    <HeaderIcon onClick={close} />
    <HeaderIcon onClick={minimize} />
    <HeaderIcon onClick={maximize} />
  </HeaderIconWrapper>
);

export default HeaderIcons;
