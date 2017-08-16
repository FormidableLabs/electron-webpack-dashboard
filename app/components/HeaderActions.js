import React from 'react';
import styled from 'styled-components';
import FaCog from 'react-icons/lib/fa/cog';
import FaEye from 'react-icons/lib/fa/eye';

const HeaderAction = styled.button`
  -webkit-app-region: no-drag;
  border: 0;
  background: none;
  outline: none;
  color: ${props => (props.vizActive ? '#00d0ff' : 'white')};
  display: inline-block;
  margin-left: 10px;
  transition: opacity 100ms linear;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.2;
  }
`;

const HeaderActionWrapper = styled.div`
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
`;

const HeaderActions = ({ vizActive, onVizToggle }) => (
  <HeaderActionWrapper>
    <HeaderAction onClick={onVizToggle} vizActive={vizActive}>
      <FaEye width="24px" height="24px" />
    </HeaderAction>
    <HeaderAction
      onClick={() => {
        alert("Port configuration didn't make it to this beta. Sorry!");
      }}
    >
      <FaCog width="24px" height="24px" />
    </HeaderAction>
  </HeaderActionWrapper>
);

export default HeaderActions;
