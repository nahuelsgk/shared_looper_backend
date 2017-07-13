import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';

class AudioSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            audio_files: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.audiofiles !== undefined) {
            this.setState({audio_files: nextProps.audiofiles})
        }
    }

    handleTouchPad = (event) => {
        console.log("Abriendo")
        this.setState(
            {
                open: true,
                anchorEl: event.currentTarget,
            })
    }

    handleRequestClose = (event) => {
        this.setState(
            {
                open: false
            }
        )
    }

    customSelectHandler(object, value)
    {
        this.props.onSelectHandler(object, value);
        this.setState(
            {
                open: false
            }
        )
    }

    render() {
        let files = this.state.audio_files
        return (
            <div>
                <RaisedButton
                    onTouchTap={this.handleTouchPad}
                    label={this.props.label}
                />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                >
                    <Menu onChange={this.customSelectHandler.bind(this)}>
                        {files.map(
                            item =>
                                <MenuItem
                                    id={item.Name}
                                    key={item.Name}
                                    value={item.Url}
                                    primaryText={item.Name}
                                />
                        )}
                    </Menu>
                </Popover>
            </div>
        )
    }
}

export default AudioSelector;