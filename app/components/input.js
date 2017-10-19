// @flow
import React from "react"
import styled from "styled-components"

const Input = styled.input`
  border: 1px solid hsla(0, 0%, 100%, 0.33);
  border-radius: 4px;
  background: transparent;
  font-family: 'montserratregular';
  color: #fff;
  padding: 2px 4px;
  font-size: 1em;
  outline: none;
  box-shadow: inset 1px 1px 1px hsla(0, 0%, 0%, 0.5);
  transition: box-shadow 200ms ease;

  &:focus {
    box-shadow: inset 1px 1px 1px hsla(0, 0%, 0%, 0.5), 0 0 0 1px #2a2e3b, 0 0 0 3px #00bdff;
  }
`

type InputProps = {
  value?: React.Node,
  onChange: Function,
  name?: string,
  style?: Object
}
export default ({ onChange, name, value, style }: InputProps) => (
  <Input
    type="text"
    onChange={onChange}
    value={value}
    name={name}
    style={style}
  />
)
