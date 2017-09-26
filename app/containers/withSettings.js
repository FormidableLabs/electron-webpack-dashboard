import React from 'react';

const electronSettings = require('electron').remote.require('electron-settings');

class Settings extends React.Component {
  state = {
    fontSizeModifier: electronSettings.get('fontSizeModifier')
  };

  componentDidMount() {
    this.fontSizeModifierObserver = electronSettings.watch('fontSizeModifier', this.handleFontSizeModifierChange);
  }

  componentWillUnmount() {
    this.fontSizeModifierObserver.dispose();
  }

  handleFontSizeModifierChange = (fontSizeModifier) => {
    this.setState({ fontSizeModifier });
  }

  render() {
    return this.props.render(this.state);
  }
}

const withSettings = WrappedComponent => (props) => (
  <Settings
    render={(settings) => <WrappedComponent {...props} {...settings} />}
  />
);

export default withSettings;
