import React from 'react';
import logo from './logo.svg';
import keydown from 'react-keydown';
import  {Grid, Row, Col} from 'react-bootstrap';
import Pad from './Pad.js';
import './App.css';
import 'rc-slider/assets/index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

@keydown
class App extends React.Component {
    constructor() {
        super();

        this.state = {
            componentPad1: '',
            componentPad2: '',
            componentPad3: '',
            audio_files: [],
            selected_audio_file: '',
            audio_src1: '',
            audio_src2: '',
            audio_src3: ''
        }


    }

    componentWillReceiveProps( nextProps ) {
        const keydown = nextProps.keydown
        if ( keydown.event ) {
            // inspect the keydown event and decide what to do
            if (keydown.event.key === '1') {
                this.componentPad1.play();
            }
            if (keydown.event.key === '2') {
                this.componentPad2.play();
            }
            if (keydown.event.key === '3') {
                this.componentPad3.play();
            }
        }
    }

    render() {
        return (
            <MuiThemeProvider>
                <div className="App">
                    <div className="App-header">
                      <img src={logo} className="App-logo" alt="logo" />
                      <h2>Welcome to React</h2>
                    </div>
                    <div className="App-intro">
                        <Grid>
                            <Row className="show-grid">
                                <Col xs={4} md={4}>
                                    <Pad
                                        ref={ component => this.componentPad1 = component}
                                        keyTrigger="1"
                                        audio_src={this.state.audio_src1}
                                    />
                                </Col>
                                <Col xs={4} md={4}>
                                    <Pad
                                        ref={ component => this.componentPad2 = component}
                                        keyTrigger="2"
                                        audio_src={this.audio_src2}
                                    />
                                </Col>
                                <Col xs={4} md={4}>
                                    <Pad
                                        ref={ component => this.componentPad3 = component}
                                        keyTrigger="3"
                                        audio_src={this.audio_src3}
                                    />
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </div>
            </MuiThemeProvider>
          );
    }
}

export default App;
