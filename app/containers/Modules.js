// @flow
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import { Line } from 'rc-progress';
import _ from 'lodash/fp';

import { formatModules } from '../util/format-modules';
import Text from '../components/Text';
import Loading from '../components/Loading';

const fadeInAnimation = keyframes`${fadeIn}`;

const ColorText = styled(Text)`
  color: #00d0ff;
`;

const Container = styled.div`
  opacity: 0;
  animation: 500ms ${fadeInAnimation} 500ms;
  animation-fill-mode: forwards;
  overflow: scroll;
  height: calc(100% - 27px);
`;

class Modules extends React.PureComponent {
  render() {
    const { stats, loading } = this.props;
    if (loading) {
      return (
        <Container>
          <Loading />
        </Container>
      );
    }
    if (stats) {
      const modules = formatModules(stats);
      console.log(modules);
      return (
        <Container>
          <table>
            <tbody>
              {modules.map(module => {
                if (module[0] === '<self>') return null;
                return (
                  <tr key={module[0]}>
                    <td>
                      <Text>
                        {module[0]}
                      </Text>
                    </td>
                    <td style={{ paddingLeft: 20, whiteSpace: 'nowrap' }}>
                      <ColorText>
                        {module[1]}
                      </ColorText>
                    </td>
                    <td style={{ paddingLeft: 20, width: '100%' }}>
                      <Line
                        strokeWidth="6"
                        percent={module[2]}
                        strokeLinecap="square"
                        trailWidth="3"
                        trailColor="transparent"
                        strokeColor="#00d0ff"
                        style={{ verticalAlign: 'middle' }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Container>
      );
    }
    return (
      <Container>
        <Text>NO DATA</Text>
      </Container>
    );
  }
}

export default Modules;
