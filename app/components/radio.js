// @flow
import React from "react"
import styled from "styled-components"

const Radio = styled.input`
  &:checked, &:not(:checked) {
    position: absolute;
    left: -9999px;
  }

  &:checked + label, &:not(:checked) + label {
    position: relative;
    padding-left: 28px;
    cursor: pointer;
    line-height: 20px;
    display: inline-block;
    color: #fff;
  }

  &:checked + label:before, &:not(:checked) + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 18px;
    height: 18px;
    border: 1px solid hsla(0, 0%, 100%, 0.33);
    box-shadow: inset 2px 2px 1px hsla(0, 0%, 0%, 0.5);
    border-radius: 100%;
    background: transparent;
  }

  &:checked + label:after, &:not(:checked) + label:after {
    content: '';
    transition: all 200ms ease;
    background: #00bdff;
    box-shadow: inset -2px -2px 1px hsla(0, 0%, 0%, 0.25);
    width: 12px;
    height: 12px;
    position: absolute;
    top: 4px;
    left: 4px;
    border-radius: 7px;
  }

  &:checked + label:after {
    transform: scale(1.0);
    opacity: 1.0;

  }

  &:not(:checked) + label:after {
    transform: scale(0);
    opacity: 0;
  }

  &:focus:checked + label:before, &:focus:not(:checked) + label:before {
    box-shadow:
      inset 2px 2px 1px hsla(0, 0%, 0%, 0.5),
      0 0 0 1px #2a2e3b,
      0 0 0 3px #00bdff;
  }
`

type RadioProps = {
  name: string,
  onChange: Function,
  value: string,
  selected: boolean,
  label: React.Node | string
}
export default ({ onChange, value, selected, name, label }: RadioProps) => (
  <span>
    <Radio
      type="radio"
      name={name}
      id={`${name}-${value}`}
      onChange={onChange}
      value={value}
      checked={selected}
    />
    <label
      htmlFor={`${name}-${value}`}
    >
      {label}
    </label>
  </span>
)
