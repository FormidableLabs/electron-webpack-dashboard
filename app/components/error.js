import styled from 'styled-components';
import withSettings from '../containers/with-settings';
import getFontSize from '../util/get-font-size';

export default withSettings(styled.p`
  font-family: 'menloregular';
  font-size: ${({ fontSizeModifier }) => getFontSize(10, fontSizeModifier)}px;
  color: #f36666;
  display: inline-block;
`);
