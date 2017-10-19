// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Environment = styled.div`
  font-family: 'montserratregular';
  font-size: 14px;
  letter-spacing: 1px;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  white-space: nowrap;
`;

const Label = styled.div`
  font-family: 'montserratlight';
  font-size: 10px;
  color: #6c7082;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

type Props = {
  environment: string
};

export default class extends PureComponent<Props> {
  render() {
    return (
      <div>
        <Environment>
          {this.props.environment}
        </Environment>
        <Label>
          Node Environment
        </Label>
      </div>
    );
  }
}
