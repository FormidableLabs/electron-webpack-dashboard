// @flow
import React from "react"
import Modal from "./modal"
import styled from "styled-components"
import RadioButton from "./radio"
import TextInput from "./input"
import Button from "./button"

const DEFAULT_PORT = 9838;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 0.9em;
  margin: 1em 0;
`

const Message = styled.div`
  font-size: 0.9em;
  margin-bottom: 1.5em;
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
        style={{ width: "500px" }}
        renderTitle={(
          <span>Connect to a Port</span>
        )}
        renderContent={(
          <div>
            <Message>
              Connect to an instance of the Webpack Dashboard Plugin running at port:
            </Message>
            <InputContainer>
              <RadioButton
                value="default"
                name="port"
                onChange={this.handleItemClick}
                selected={this.state.selectedItem === "default"}
                label={`Default Port at ${DEFAULT_PORT}.`}
              />
            </InputContainer>
            <InputContainer>
              <RadioButton
                value="custom"
                name="port"
                onChange={this.handleItemClick}
                selected={this.state.selectedItem === "custom"}
                label={(
                  <span>
                    Custom Port at
                    <TextInput
                      value={this.state.customPortValue}
                      onChange={this.handleCustomPortValueOnChange}
                      style={{ width: "70px", margin: "0 4px 0 7px" }}
                    />.
                  </span>
                )}
              />
            </InputContainer>
          </div>
        )}
        renderButtons={(
          <Button
            onClick={this.handleConnectButtonClick}
          >
            Connect
          </Button>
        )}
      />
    );
  }
}
