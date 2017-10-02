import styled from 'styled-components';
import withSettings from '../containers/withSettings';
import getFontSize from '../util/get-font-size';

export default withSettings(styled.p`
font-family: 'menloregular';
font-size: ${({ fontSizeModifier }) => getFontSize(11, fontSizeModifier)}px;
color: #fff;
`);
