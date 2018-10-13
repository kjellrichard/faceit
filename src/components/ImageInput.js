import React, { Component } from 'react'
import styled from 'styled-components'
import Webcam from "react-webcam"
import { StyledImagish, StyledButton } from '../style/components';
import { colors } from '../style/colors';
import { darken, lighten } from 'polished'

const WebcamWrap = styled(StyledImagish)`
    video {
        margin-bottom: -4px;
    }
`
const CaptureButton = styled(StyledButton)`
    
`
const FileInputWrapper = styled(StyledButton)`
    overflow: hidden;
    position: relative;
    
    input[type=file] {                       
        display: none;
        visibility: hidden;        
    }
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;    
`
const DropZone = styled.div`
    width: 600px;
    height: 400px;
    background-color: #fff;
    @media (max-height: 600px ) {
        max-height: 200px;
    }   

    @media (max-width:400px) {
        max-width: 350px;
    } 
    border: 4px dotted grey; 
    display: flex;
    flex-direction: column;  
    align-items: center;
    justify-content: center;
    & > div {
        padding: 10px 0;
        color: ${darken(.5, colors.background)}
    }

    &.droppable {
        background-color: ${lighten(.2, colors.primary)};
        border-color: ${colors.primary}
    }
`
export default class ImagePicker extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            droppable: false
        };
    }

    capture = ()=>{
        const imageSrc = this.webcam.getScreenshot();
        this.props.onChange(imageSrc);
    }
    handleFileChange = (files) => {
        const file = files[0];
        const onChange = this.props.onChange;
        if (!file || !file.type.match('image.*'))
            return;

        var reader = new FileReader();
        reader.onload = function (e) {
            onChange(e.target.result);
        }
        reader.readAsDataURL(file);

    }

    handleOndrop = e => {
        e.preventDefault();
        this.handleFileChange(e.dataTransfer.files)
    }

    handleDragOver = e => {
        
        
        if (!e.dataTransfer.types.filter(t => t === 'Files').length) {
            this.setDragLeave();        
            return;
        }
        e.dataTransfer.dropEffect = 'move';    
        this.setState({ droppable: true })
        e.preventDefault();
    }

    setDragLeave = e => {
        this.setState({droppable: false})
    }

    render() {
        const { height, width, inputMode } = this.props;

        const videoConstraints = {
            width: width,
            height: height,
            facingMode: "user"
        };
        return (
            <Container>
                {inputMode && inputMode === 'camera' &&
                    <div>
                        <WebcamWrap as="div">
                            <Webcam
                                screenshotFormat="image/jpeg"
                                ref={(ref) => this.webcam = ref}
                                audio={false}
                                height={height}                              
                                width={width}
                                videoConstraints={videoConstraints}
                            />
                        </WebcamWrap>                        
                        <CaptureButton onClick={this.capture}>Capture photo</CaptureButton>                        
                    </div>
                }
                {inputMode && inputMode === 'select' &&                    
                    <DropZone className={this.state.droppable ? 'droppable' : ''} onDrop={(e) => this.handleOndrop(e)} onDragOver={(e) => this.handleDragOver(e)} onDragLeave={(e)=>this.setDragLeave(e)}>
                        <div>Drag a file here or select a file </div>
                        <FileInputWrapper as="label">
                            Select file
                            <input type="file" accept="image/*" onChange={e => this.handleFileChange(e.target.files)} />
                        </FileInputWrapper>                            
                    </DropZone>
                }
            </Container>
        )
    }
}
