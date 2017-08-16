// @flow
import React from 'react';
import SocketIO from 'socket.io';
import { shell } from 'electron';

import handleSocketData from '../util/handleSocketData';

import Log from './Log';
import Operations from './Operations';
import Assets from './Assets';
import Modules from './Modules';
import Problems from './Problems';
import Visualization from './Visualization';

import Row from '../components/Row';
import Box from '../components/Box';
import DoubleBox from '../components/DoubleBox';
import Container from '../components/Container';
import BoxHeader from '../components/BoxHeader';

const DEFAULT_PORT = 9838;

class Body extends React.PureComponent {
  state = {
    assets: null,
    chartData: null,
    problems: [],
    progress: 0,
    sizes: null,
    stats: {},
    status: 'idle',
    operations: '',
    log: '',
    breakpoint: 'large',
    modulesLoading: false,
    assetsLoading: false,
    problemsLoading: false,
  };
  componentWillMount() {
    try {
      this.server = new SocketIO(DEFAULT_PORT);
    } catch (e) {
      alert(e);
    }
    this.server &&
      this.server.on('connection', socket => {
        socket.on('message', message => {
          this.setState(handleSocketData(message));
        });
      });
  }
  componentDidMount() {
    window.addEventListener('resize', this.checkLayout);
    this.checkLayout();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.checkLayout);
    this.server && this.server.disconnect();
  }
  checkLayout = () => {
    let breakpoint;
    const width = window.innerWidth;

    if (width > 1200) {
      breakpoint = 'large';
    } else if (width > 768) {
      breakpoint = 'medium';
    } else {
      breakpoint = 'small';
    }

    if (breakpoint !== this.state.breakpoint) {
      this.setState({ breakpoint });
    }
  };
  openUrl = () => {
    shell.openExternal('http://www.formidable.com');
  };
  render() {
    if (this.props.vizActive) {
      return (
        <Container>
          <Row>
            <Box style={{ display: 'flex' }} key="viz">
              <Visualization
                data={this.state.chartData}
                assets={this.state.assets}
                stats={this.state.stats}
                loading={this.state.modulesLoading}
              />
            </Box>
          </Row>
          <BoxHeader
            style={{ margin: '20px auto 0px', animation: 'none', opacity: 1 }}
          >
            Artisanally hand-crafted at{' '}
            <a
              style={{ color: '#00bdff' }}
              href="javascript:void(0)"
              onClick={this.openUrl}
            >
              Formidable
            </a>
          </BoxHeader>
        </Container>
      );
    }
    switch (this.state.breakpoint) {
      case 'large':
        return (
          <Container>
            <Row>
              <DoubleBox>
                <Log log={this.state.log} />
              </DoubleBox>
              <Box style={{ display: 'flex' }}>
                <Operations
                  stats={this.state.stats}
                  status={this.state.status}
                  progress={this.state.progress}
                  operations={this.state.operations}
                  sizes={this.state.sizes}
                />
              </Box>
            </Row>
            <Row>
              <Box>
                <BoxHeader>Modules</BoxHeader>
                <Modules
                  stats={this.state.stats.data}
                  sizes={this.state.sizes}
                  loading={this.state.modulesLoading}
                />
              </Box>
              <Box>
                <BoxHeader>Assets</BoxHeader>
                <Assets
                  stats={this.state.stats.data}
                  sizes={this.state.sizes}
                  loading={this.state.assetsLoading}
                />
              </Box>
              <Box>
                <BoxHeader>Problems</BoxHeader>
                <Problems
                  problems={this.state.problems}
                  loading={this.state.problemsLoading}
                />
              </Box>
            </Row>
            <BoxHeader
              style={{ margin: '20px auto 0px', animation: 'none', opacity: 1 }}
            >
              Artisanally hand-crafted at{' '}
              <a
                style={{ color: '#00bdff' }}
                href="javascript:void(0)"
                onClick={this.openUrl}
              >
                Formidable
              </a>
            </BoxHeader>
          </Container>
        );
      case 'medium':
        return (
          <Container>
            <Row>
              <Box style={{ display: 'flex', padding: 0, flex: '1 1 60px' }}>
                <Log log={this.state.log} />
              </Box>
              <Box style={{ display: 'flex' }}>
                <Operations
                  stats={this.state.stats}
                  status={this.state.status}
                  progress={this.state.progress}
                  operations={this.state.operations}
                  sizes={this.state.sizes}
                />
              </Box>
            </Row>
            <Row>
              <Box>
                <BoxHeader>Modules</BoxHeader>
                <Modules
                  stats={this.state.stats.data}
                  sizes={this.state.sizes}
                  loading={this.state.modulesLoading}
                />
              </Box>
              <Box>
                <BoxHeader>Assets</BoxHeader>
                <Assets
                  stats={this.state.stats.data}
                  sizes={this.state.sizes}
                  loading={this.state.assetsLoading}
                />
              </Box>
              <Box>
                <BoxHeader>Problems</BoxHeader>
                <Problems
                  problems={this.state.problems}
                  loading={this.state.problemsLoading}
                />
              </Box>
            </Row>
            <BoxHeader
              style={{ margin: '20px auto 0px', animation: 'none', opacity: 1 }}
            >
              Artisanally hand-crafted at{' '}
              <a
                style={{ color: '#00bdff' }}
                href="javascript:void(0)"
                onClick={this.openUrl}
              >
                Formidable
              </a>
            </BoxHeader>
          </Container>
        );
      default:
        return (
          <Container
            style={{ flexDirection: 'row', padding: 10, overflow: 'scroll' }}
          >
            <Box
              style={{
                display: 'flex',
                padding: 0,
                flex: '1 1 100%',
                height: 350,
              }}
            >
              <Log log={this.state.log} />
            </Box>
            <Box style={{ display: 'flex', flex: '1 1 100%', height: 350 }}>
              <Operations
                stats={this.state.stats}
                status={this.state.status}
                progress={this.state.progress}
                operations={this.state.operations}
                sizes={this.state.sizes}
              />
            </Box>
            <Box style={{ flex: '1 1 100%', height: 350 }}>
              <BoxHeader>Modules</BoxHeader>
              <Modules
                stats={this.state.stats.data}
                sizes={this.state.sizes}
                loading={this.state.modulesLoading}
              />
            </Box>
            <Box style={{ flex: '1 1 100%', height: 350 }}>
              <BoxHeader>Assets</BoxHeader>
              <Assets
                stats={this.state.stats.data}
                sizes={this.state.sizes}
                loading={this.state.assetsLoading}
              />
            </Box>
            <Box style={{ flex: '1 1 100%', height: 350 }}>
              <BoxHeader>Problems</BoxHeader>
              <Problems
                problems={this.state.problems}
                loading={this.state.problemsLoading}
              />
            </Box>
            <BoxHeader
              style={{ margin: '20px auto 0px', animation: 'none', opacity: 1 }}
            >
              Artisanally hand-crafted at{' '}
              <a
                style={{ color: '#00bdff' }}
                href="javascript:void(0)"
                onClick={this.openUrl}
              >
                Formidable
              </a>
            </BoxHeader>
          </Container>
        );
    }
  }
}
export default Body;
