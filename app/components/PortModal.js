// @flow
import React from "react"
import Modal from "./Modal"
import styled from "styled-components"

const DEFAULT_PORT = 9838;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 0.9em;
`

type PortModalProps = {
  isOpen: bool,
  handlePortSelection: Function
}
export default class extends React.Component<PortModalProps> {
  state = {
    selectedItem: "default",
    customPortValue: DEFAULT_PORT
  }

  handleItemClick = ({ target }) => this.setState(() => ({
    selectedItem: target.value
  }))

  handleCustomPortValueOnChange = ({ target }) => this.setState(() => ({
    customPortValue: target.value
  }))

  handleConnectButtonClick = () => {
    if (this.state.selectedItem === "custom") {
      this.props.handlePortSelection(this.state.customPortValue);
      return;
    }
    this.props.handlePortSelection(DEFAULT_PORT);
  }

  render() {
    const { isOpen } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        renderContent={(
          <div>
            <div>
              Connect to a Webpack Dashboard instance running at:
            </div>
            <InputContainer>
              <input
                id="default"
                type="radio"
                name="port"
                value="default"
                checked={this.state.selectedItem === "default"}
                onChange={this.handleItemClick}
              />
              <label htmlFor="default">
                Default Port ({DEFAULT_PORT})
              </label>
            </InputContainer>
            <InputContainer>
              <input
                id="custom"
                type="radio"
                name="port"
                value="custom"
                checked={this.state.selectedItem === "custom"}
                onChange={this.handleItemClick}
              />
              <label htmlFor="custom">
                Custom Port at
              </label>
              <input
                type="text"
                value={this.state.customPortValue}
                onChange={this.handleCustomPortValueOnChange}
              />
            </InputContainer>
            <button
              onClick={this.handleConnectButtonClick}
            >
              Connect
            </button>
          </div>
        )}
      />
    );
  }
}
