// @flow
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

import Text from '../components/text';
import Error from '../components/error';
import Loading from '../components/loading';
import withSettings from './with-settings';
import getFontSize from '../util/get-font-size';
import { ScrollerBase } from '../components/scroller-base';

const fadeInAnimation = keyframes`${fadeIn}`;

const ProblemContainer = withSettings(styled(ScrollerBase)`
  flex: 0;
  white-space: pre-wrap;
  font-family: 'menloregular';
  font-size: ${({ fontSizeModifier }) => getFontSize(11, fontSizeModifier)}px;
  color: #fff;
  opacity: 0;
  animation: 500ms ${fadeInAnimation} 500ms;
  animation-fill-mode: forwards;
  height: calc(100% - 27px);
`);

const createMarkup = problems => ({
  __html: `${problems}`,
});

type Props = {
  problems?: string,
  problemsError?: string,
  loading: bool
}
class Problems extends React.PureComponent<Props> {
  render() {
    const { problems, problemsError, loading } = this.props;
    if (loading) {
      return (
        <ProblemContainer>
          <Loading />
        </ProblemContainer>
      );
    }
    if (problemsError) {
      return (
        <ProblemContainer>
          <Error data-tip={problemsError} data-effect="float">
            Error analyzing bundle!
          </Error>
        </ProblemContainer>
      );
    }

    return problems
      ? <ProblemContainer dangerouslySetInnerHTML={createMarkup(problems)} />
      : <ProblemContainer>
        <Text>NO DATA</Text>
      </ProblemContainer>;
  }
}

export default Problems;
