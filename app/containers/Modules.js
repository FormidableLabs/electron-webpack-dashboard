// @flow
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import { Line } from 'rc-progress';

import Text from '../components/Text';
import Error from '../components/Error';
import Loading from '../components/Loading';
import withSettings from './withSettings';
import getFontSize from '../util/get-font-size';

const fadeInAnimation = keyframes`${fadeIn}`;

const ColorText = styled(Text) `
  color: #00d0ff;
`;

const Container = styled.div`
  opacity: 0;
  animation: 500ms ${fadeInAnimation} 500ms;
  animation-fill-mode: forwards;
  overflow: scroll;
  height: calc(100% - 27px);
`;

const BundleName = withSettings(styled.p`
  font-family: 'montserratlight';
  font-size: ${({ fontSizeModifier }) => getFontSize(10, fontSizeModifier)}px;
  letter-spacing: 2px;
  color: #6c7082;
  margin-bottom: 10px;
  margin-top: 20px;
  height: auto;
  text-transform: uppercase;
`);

class Modules extends React.PureComponent {
  render() {
    const { modules, moduleSizes, loading, sizesError } = this.props;
    let target;

    if (loading) {
      return (
        <Container>
          <Loading />
        </Container>
      );
    }

    if (modules) {
      if (moduleSizes) {
        target = moduleSizes;
        return (
          <Container>
            {Object.keys(target).map(m =>
              <div key={m}>
                <BundleName>
                  {m} (estimated min+gz):
                </BundleName>
                <table>
                  <tbody>
                    {target[m].map(module => {
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
              </div>
            )}
          </Container>
        );
      }
      target = modules;
      return (
        <Container>
          {sizesError &&
            <Error
              data-tip={sizesError.message}
              data-effect="float"
            >
              Error calculating minified sizes!
            </Error>}
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
