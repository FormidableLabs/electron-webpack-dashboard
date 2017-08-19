// @flow
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

import { formatAssets } from '../util/format-assets';
import Text from '../components/Text';
import Error from '../components/Error';
import Loading from '../components/Loading';

const fadeInAnimation = keyframes`${fadeIn}`;
const alertIcon = require('../assets/alert-icon.svg');

const Container = styled.div`
  opacity: 0;
  animation: 500ms ${fadeInAnimation} 500ms;
  animation-fill-mode: forwards;
  overflow: scroll;
  height: calc(100% - 27px);
`;

const ColorText = styled(Text)`
  color: #00d0ff;
`;

const ErrorText = styled(Text)`
  color: #f36666;
`;

class Assets extends React.PureComponent {
  render() {
    const { stats, sizes, loading, sizesError } = this.props;
    if (loading) {
      return (
        <Container>
          <Loading />
        </Container>
      );
    }
    if (stats) {
      const assets = formatAssets(stats, sizes);
      return (
        <Container>
          {sizesError &&
            <Error data-tip={sizesError.message} data-effect="float">
              Error calculating minified sizes!
            </Error>}
          <table>
            <tbody>
              {assets.map(asset => {
                const largeAsset = asset[1] > 250000;
                const SizeText = largeAsset ? ErrorText : ColorText;
                return (
                  <tr key={asset[0]}>
                    <td>
                      <SizeText>
                        {asset[2]}
                      </SizeText>
                    </td>
                    <td style={{ paddingLeft: 20 }}>
                      <Text style={{ display: 'inline-block' }}>
                        {asset[0]}
                      </Text>
                      {largeAsset &&
                        <a
                          style={{ verticalAlign: 'sub', marginLeft: 10 }}
                          data-tip="Exceeds 250kb!"
                        >
                          <img src={alertIcon} />
                        </a>}
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

export default Assets;
