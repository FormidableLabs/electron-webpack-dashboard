// @flow
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import withSettings from './withSettings';
import getFontSize from '../util/get-font-size';

const fadeInAnimation = keyframes`${fadeIn}`;

const LogScroller = styled.div`
  flex: 1;
  overflow: scroll;
  padding: 30px;
  opacity: 0;
  animation: 500ms ${fadeInAnimation} 500ms;
  animation-fill-mode: forwards;
`;

const LogContainer = withSettings(styled.div`
  flex: 0;
  white-space: pre-wrap;
  font-family: 'menloregular';
  font-size: ${({ fontSizeModifier }) => getFontSize(13, fontSizeModifier)}px;
  color: #fff;
`);

const createMarkup = log => ({
  __html: `${log}`,
});

class Log extends React.PureComponent {
  componentDidMount() {
    if (this.scroller) {
      setTimeout(() => {
        if (this.scroller) {
          this.scroller.scrollTop = 1000000;
        }
      }, 500);
    }
  }
  componentDidUpdate() {
    setTimeout(() => {
      this.scroller.scrollTop = 1000000;
    }, 200);
  }
  render() {
    return (
      <LogScroller innerRef={c => { this.scroller = c; }}>
        <LogContainer
          dangerouslySetInnerHTML={createMarkup(this.props.log)}
        />
      </LogScroller>
    );
  }
}

export default Log;
