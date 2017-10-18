// @flow
import React from 'react';
import styled from 'styled-components';

import Header from '../components/Header';
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
    portModalVisible: false
  };

  componentDidMount() {
    // A small delay makes the animation feel more sequenced
    setTimeout(() => this.handleTogglePortModal(), 500);
  }

  handleVizToggle = () => this.setState(prevState => ({
    vizActive: !prevState.vizActive,
  }));

  handleTogglePortModal = () => this.setState(prevState => ({
    portModalVisible: !prevState.portModalVisible
  }));

  render() {
    return (
      <FlexRoot>
        <Header>
          <HeaderActions
            vizActive={this.state.vizActive}
            onVizToggle={this.handleVizToggle}
            onPortModalToggle={this.handleTogglePortModal}
          />
        </Header>
        <Body
          vizActive={this.state.vizActive}
          portModalVisible={this.state.portModalVisible}
          onPortModalToggle={this.handleTogglePortModal}
        />
      </FlexRoot>
    );
  }
}

export default App;
