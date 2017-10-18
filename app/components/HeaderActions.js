// @flow
import React from 'react';
import styled from 'styled-components';
import FaCog from 'react-icons/lib/fa/cog';
import FaEye from 'react-icons/lib/fa/eye';
import FaClone from 'react-icons/lib/fa/clone';
import { ipcRenderer } from 'electron';

const HeaderAction = styled.button`
  -webkit-app-region: no-drag;
  border: 0;
  background: none;
  outline: none;
  font-family: 'montserratlight';
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

const HeaderActionContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`

const HeaderActionWrapper = styled.div`
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
`;

const Label = styled.span`
  font-size: 1.1em;
  margin: 0 0 0 0.33em;
`

type Props = {
  vizActive: bool,
  onVizToggle: Function,
  onPortModalToggle: Function
}
const HeaderActions = ({ vizActive, onVizToggle, onPortModalToggle }: Props) =>
  (<HeaderActionWrapper>
    <HeaderAction
      onClick={() => ipcRenderer.send('new-dashboard')}
    >
      <HeaderActionContent>
        <FaClone width="20px" height="20px" />
        <Label>New Dashboard</Label>
      </HeaderActionContent>
    </HeaderAction>
    <HeaderAction
      onClick={onVizToggle}
      vizActive={vizActive}
    >
      <HeaderActionContent>
        <FaEye width="20px" height="20px" />
        <Label>Modules</Label>
      </HeaderActionContent>
    </HeaderAction>
    <HeaderAction
      onClick={onPortModalToggle}
    >
      <HeaderActionContent>
        <FaCog width="20px" height="20px" />
        <Label>Port Config</Label>
      </HeaderActionContent>
    </HeaderAction>
  </HeaderActionWrapper>);

export default HeaderActions;
