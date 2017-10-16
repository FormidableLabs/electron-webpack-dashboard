// @flow
import React from "react"
import styled from "styled-components"

const Button = styled.button`
  border: 1px solid hsla(0, 0%, 100%, 0);
  box-shadow: inset 0 1px 0 hsla(0, 0%, 100%, 0.25), 0 1px 2px hsla(0, 0%, 0%, 0.75);
  border-radius: 4px;
  background: hsla(0, 0%, 100%, 0.1);
  color: #fff;
  padding: 0.25em 1.33em;
  font-size: 0.9em;
  outline: none;
  font-family: 'montserratregular';

  &:hover {
    background: hsla(0, 0%, 100%, 0.15);
  }

  &:active {
    background: hsla(0, 0%, 100%, 0.05);
    box-shadow: inset 0 1px 0 hsla(0, 0%, 0%, 0.25);
  }

  &:focus {
    box-shadow:
      inset 0 1px 0 hsla(0, 0%, 100%, 0.25),
      0 1px 2px hsla(0, 0%, 0%, 0.75),
      0 0 0 1px #2a2e3b,
      0 0 0 3px #00bdff;
  }

  &:focus:active {
    box-shadow:
      inset 0 1px 0 hsla(0, 0%, 0%, 0.25),
      0 0 0 1px #2a2e3b,
      0 0 0 3px #00bdff;
  }
`

type ButtonProps = {
  children?: React.Node,
  onClick: Function
}
export default ({ children, onClick }: ButtonProps) => (
  <Button
    onClick={onClick}
  >
    {children}
  </Button>
)
