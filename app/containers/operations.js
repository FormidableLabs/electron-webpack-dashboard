// @flow
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import { Circle } from 'rc-progress';

import BoxHeader from '../components/box-header';

const fadeInAnimation = keyframes`${fadeIn}`;

const Container = styled.div`
  opacity: 0;
  flex: 1;
  position: relative;
  animation: 500ms ${fadeInAnimation} 500ms;
  animation-fill-mode: forwards;
`;

const TopLeft = styled.div`
  position: absolute;
  top: 0px;
  left: 10px;
  text-align: center;
`;

const TopRight = styled.div`
  position: absolute;
  top: 0px;
  right: 10px;
  text-align: center;
`;

const Center = styled.div`
  position: absolute;
  width: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const BottomLeft = styled.div`
  position: absolute;
  bottom: 25px;
  left: 10px;
  text-align: center;
`;

const BottomRight = styled.div`
  position: absolute;
  bottom: 25px;
  right: 10px;
  text-align: center;
`;

const StatusText = styled.h2`
  font-family: 'montserratregular';
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
  color: #00d0ff;
  margin: 4px auto;
  text-transform: uppercase;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
`;

const ErrorText = styled.h2`
  font-family: 'montserratregular';
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
  color: #f36666;
  margin: 4px auto;
  text-transform: uppercase;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
`;

const BigProgressText = styled.h1`
  font-family: 'montserratregular';
  font-size: 50px;
  font-weight: bold;
  letter-spacing: 1px;
  color: #00d0ff;
  margin: 0px auto 4px;
  text-transform: uppercase;
  white-space: nowrap;
`;

type Props = {
  totalAssetSizes?: string,
  totalModuleSizes?: string,
  totalAssetMinSizes?: string,
  totalModuleMinSizes?: string,
  progress: number,
  status: string,
  stats?: Object,
}
class Operations extends React.PureComponent<Props> {
  render() {
    const {
      totalAssetSizes,
      totalModuleSizes,
      totalAssetMinSizes,
      totalModuleMinSizes,
      progress,
      status,
      stats,
    } = this.props;
    const statSize = totalAssetMinSizes || totalAssetSizes || '---';
    const moduleSize = totalModuleMinSizes || totalModuleSizes || '---';

    return (
      <Container>
        <TopLeft>
          <BoxHeader>Status</BoxHeader>
          <StatusText>
            {status}
          </StatusText>
        </TopLeft>
        <TopRight>
          <BoxHeader>Errors</BoxHeader>
          {stats.errors
            ? <ErrorText>
                {stats.data.errors.length}
              </ErrorText>
            : <StatusText>0</StatusText>}
        </TopRight>
        <Center>
          <Circle
            strokeWidth="6"
            percent={progress * 100}
            strokeLinecap="square"
            trailWidth="3"
            trailColor="#6c7082"
            strokeColor="#00d0ff"
          />
        </Center>
        <Center>
          <BigProgressText>
            {parseInt(progress * 100, 10)}
          </BigProgressText>
          <BoxHeader>PROGRESS</BoxHeader>
        </Center>
        <BottomLeft>
          <BoxHeader>Modules</BoxHeader>
          <StatusText>
            {moduleSize}
          </StatusText>
        </BottomLeft>
        <BottomRight>
          <BoxHeader>Assets</BoxHeader>
          <StatusText>
            {statSize}
          </StatusText>
        </BottomRight>
      </Container>
    );
  }
}

export default Operations;
