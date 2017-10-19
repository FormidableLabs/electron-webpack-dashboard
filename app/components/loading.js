// @flow
import React from 'react';
import Text from './text';

class Loading extends React.Component {
  state = {
    dots: '.',
  };
  componentDidMount() {
    this.interval = setInterval(this.tick, 600);
  }
  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  tick = () => {
    this.setState({
      dots: this.state.dots.length > 2 ? '.' : `${this.state.dots}.`,
    });
  };
  render() {
    return (
      <Text>
        Loading{this.state.dots}
      </Text>
    );
  }
}

export default Loading;
