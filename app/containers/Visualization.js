import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Text from '../components/Text';
import Loading from '../components/Loading';

import formatSize from '../util/formatSize';
import buildHierarchy from '../util/buildHierarchy';
import { drawSunburst } from '../util/drawSunburst';

const Tooltip = styled.div`
  background: rgba(0, 0, 0, 0.25);
  border-radius: 500px;
  padding: 10px 30px;
  margin: 10px;
`;

const TooltipText = styled.span`
  color: white;
  font-size: 16px;
`;

class Visualization extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object,
  };
  state = {
    selectedAssetIndex: 0,
  };
  componentDidMount() {
    this.drawViz(this.props);
  }
  componentDidUpdate() {
    this.drawViz(this.props);
  }
  onAssetChange = ev => {
    const selectedAssetIndex = Number(ev.target.value);

    this.setState({
      selectedAssetIndex,
    });
  };
  drawViz = ({ data }) => {
    if (data) {
      if (this.state.selectedAssetIndex === 0) {
        drawSunburst(data);
      } else {
        drawSunburst(
          buildHierarchy(
            this.props.assets[this.state.selectedAssetIndex - 1].chunk.modules
          )
        );
      }
    }
  };
  render() {
    const { data, loading } = this.props;
    if (loading) {
      return <Loading />;
    }
    if (data) {
      return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 0 }}>
            <select
              onChange={this.onAssetChange}
              value={this.state.selectedAssetIndex}
            >
              <option value={0}>All Chunks</option>
              {this.props.assets.map((asset, i) =>
                <option key={i} value={i + 1}>
                  {asset.name} ({formatSize(asset.size)})
                </option>
              )}
            </select>
          </div>
          <div
            id="viz"
            style={{
              flex: 1,
              display: 'flex',
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
          <div
            style={{
              flex: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Tooltip id="d3-tooltip">
              <TooltipText id="d3-tooltip-text" />
            </Tooltip>
          </div>
        </div>
      );
    }
    return <Text>NO DATA</Text>;
  }
}

export default Visualization;
