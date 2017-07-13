import React, { Component } from 'react';
import Slider from 'rc-slider';
import RaisedButton from 'material-ui/RaisedButton';
import AudioSelect from './AudioSelector'

class Pad extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            audio_src: '',
            audio_component: '',
            key_trigger: props.keyTrigger,
            volume: 100,
            file_name: 'None audio selected',
            kick_audio_files: [],
            snare_audio_files: [],
        }
    }

    componentWillMount() {
        fetch('http://localhost:9000/api/sounds/808/kicks')
            .then( response => response.json())
            .then( items_kicks  => {
                this.setState({kick_audio_files: items_kicks})
            });

        fetch('http://localhost:9000/api/sounds/808/snares')
            .then( response => response.json())
            .then( items => {
                this.setState({snare_audio_files: items})
            });

        fetch('http://localhost:9000/api/sounds/808/hihats')
            .then( response => response.json())
            .then( items => {
                this.setState({hihats_audio_files: items})
            });
    }

    play () {
        if (this.state.audio_src) {
            if (this.audio_component.paused) {
                var playPromise = this.audio_component.play()
                if (playPromise !== undefined) {
                    playPromise.then(function () {
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            } else {
                this.audio_component.currentTime = 0;
            }
        }
    }

    updateAudioSrc( e ) {
        const selectedFile = e.target.files[0];
        if (selectedFile !== undefined) {
            var reader = new FileReader();
            reader.onloadend = function (e) {
                this.setState(
                    {
                        file_name: selectedFile.name,
                        audio_src: e.target.result
                    }
                );
            }.bind(this)
            reader.readAsDataURL(selectedFile)
        }
    }

    updateVolume( props ) {
        this.audio_component.volume = props / 100
    }

    updateAudioSelect(object, value) {
        this.setState(
            {
                file_name: object.target.innerText,
                audio_src: value
            }
        );
    }

    render() {
        let kick_audio_files   = this.state.kick_audio_files
        let snares_audio_files = this.state.snare_audio_files
        let hihat_audio_files  = this.state.hihats_audio_files

        return (
            <div className="PadItem" onClick={this.props.onClick}>
                <div>
                    <span>{this.state.file_name}</span>
                </div>
                <div>
                    <audio
                        ref={component => this.audio_component = component}
                        src={this.state.audio_src}
                    />
                    <RaisedButton label={this.state.key_trigger} onTouchTap={this.play.bind(this)}/>
                </div>
                <div>
                    <Slider min={0} max={100} defaultValue={75} onChange={this.updateVolume.bind(this)}/>
                </div>
                <div>
                    {/* KICKS */}
                    <AudioSelect
                        label="KICKS"
                        audiofiles={kick_audio_files}
                        onSelectHandler={this.updateAudioSelect.bind(this)}
                    />
                    {/* SNARES */}
                    <AudioSelect
                        label="SNARES"
                        audiofiles={snares_audio_files}
                        onSelectHandler={this.updateAudioSelect.bind(this)}
                    />
                    {/* HIHATS */}
                    <AudioSelect
                        label="HIHATS"
                        audiofiles={hihat_audio_files}
                        onSelectHandler={this.updateAudioSelect.bind(this)}
                    />
                </div>
                <div>
                    <input className="inputfile" type="file" name="input" onChange={this.updateAudioSrc.bind(this)}/>
                </div>

            </div>
        )
    }
}

export default Pad;