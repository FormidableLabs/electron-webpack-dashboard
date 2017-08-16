// @flow
import React from 'react';
import ansiHTML from 'ansi-html';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import _ from 'lodash/fp';

import { formatProblems } from '../util/format-problems';
import Text from '../components/Text';
import Loading from '../components/Loading';

const fadeInAnimation = keyframes`${fadeIn}`;

ansiHTML.setColors({
  reset: ['fff', '1d212d'],
  black: 'fff',
  red: 'f36666',
  green: '00f2ff',
  yellow: '00f2ff',
  blue: '00d0ff',
  magenta: 'f47eff',
  cyan: '00f2ff',
  lightgrey: '888',
  darkgrey: '777',
});

const ProblemContainer = styled.div`
  flex: 0;
  white-space: pre-wrap;
  font-family: 'menloregular';
  font-size: 11px;
  color: #fff;
  opacity: 0;
  animation: 500ms ${fadeInAnimation} 500ms;
  animation-fill-mode: forwards;
`;

const createMarkup = problems => ({
  __html: `${problems}`,
});

class Problems extends React.PureComponent {
  render() {
    const { problems, loading } = this.props;
    if (loading) {
      return (
        <ProblemContainer>
          <Loading />
        </ProblemContainer>
      );
    }
    let result;
    if (problems.length > 0) {
      let grouped = (result = _.flow(
        _.groupBy('path'),
        _.mapValues(
          _.reduce((acc, bundle) => Object.assign({}, acc, bundle), {})
        ),
        _.mapValues(bundle => {
          return formatProblems(bundle);
        })
      )(problems));

      result = Object.keys(grouped)
        .map(r => {
          let formatted = ansiHTML(grouped[r]);
          return `${r}

${formatted}

`;
        })
        .join('');
    }
    return result
      ? <div
          style={{
            overflow: 'scroll',
            height: 'calc(100% - 27px)',
          }}
        >
          <ProblemContainer dangerouslySetInnerHTML={createMarkup(result)} />
        </div>
      : <ProblemContainer>
          <Text>NO DATA</Text>
        </ProblemContainer>;
  }
}

export default Problems;
