// @flow
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

import Text from '../components/Text';
import Error from '../components/Error';
import Loading from '../components/Loading';

const fadeInAnimation = keyframes`${fadeIn}`;

const ProblemContainer = styled.div`
  flex: 0;
  white-space: pre-wrap;
  font-family: 'menloregular';
  font-size: 11px;
  color: #fff;
  opacity: 0;
  animation: 500ms ${fadeInAnimation} 500ms;
  animation-fill-mode: forwards;
  overflow: 'scroll';
  height: calc(100% - 27px);
`;

const createMarkup = problems => ({
  __html: `${problems}`,
});

class Problems extends React.PureComponent {
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
