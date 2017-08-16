// @flow
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const fadeInAnimation = keyframes`${fadeIn}`;

const LogScroller = styled.div`
  flex: 1;
  overflow: scroll;
  padding: 30px;
  opacity: 0;
  animation: 500ms ${fadeInAnimation} 500ms;
  animation-fill-mode: forwards;
`;

const LogContainer = styled.div`
  flex: 0;
  white-space: pre-wrap;
  font-family: 'menloregular';
  font-size: 13px;
  color: #fff;
`;

const createMarkup = log => ({
  __html: `${log}`,
});

class Log extends React.PureComponent {
  componentDidUpdate() {
    this.scroller.scrollTop = 1000000;
    setTimeout(() => {
      this.scroller.scrollTop = 1000000;
    }, 200);
  }
  componentDidMount() {
    if (this.scroller) {
      this.scroller.scrollTop = 1000000;
      setTimeout(() => {
        if (this.scroller) {
          this.scroller.scrollTop = 1000000;
        }
      }, 200);
    }
  }
  render() {
    return (
      <LogScroller
        innerRef={c => {
          this.scroller = c;
        }}
      >
        <LogContainer dangerouslySetInnerHTML={createMarkup(this.props.log)} />
      </LogScroller>
    );
  }
}

export default Log;
