// @flow
import React from 'react';
import styled from 'styled-components';

import Header from '../components/Header';
import HeaderTitle from '../components/HeaderTitle';
import HeaderIcons from '../components/HeaderIcons';
import HeaderActions from '../components/HeaderActions';
import Body from './Body';

const FlexRoot = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
`;

class App extends React.Component {
  state = {
    vizActive: false,
  };
  handleVizToggle = () => {
    this.setState({
      vizActive: !this.state.vizActive,
    });
  };
  render() {
    return (
      <FlexRoot>
        <Header>
          <HeaderIcons />
          <HeaderTitle>Webpack Dashboard</HeaderTitle>
          <HeaderActions
            vizActive={this.state.vizActive}
            onVizToggle={this.handleVizToggle}
          />
        </Header>
        <Body vizActive={this.state.vizActive} />
      </FlexRoot>
    );
  }
}

export default App;
