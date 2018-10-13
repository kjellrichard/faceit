import React, { Component } from 'react'
import styled from 'styled-components'
import { colorlist } from '../style/colors';
import {StyledImagish} from '../style/components';

const StyledCanvas = styled(StyledImagish)`
`
const OverDiv = styled.span`        
    position: absolute;
    display: none;   
`

class ImageView extends Component {
    constructor(props) {
        super(props)        
        this.handleMouseMove = this.handleMouseMove.bind(this);        
    }
    componentDidMount() {
        const { src, width } = this.props;        
        if (src)
            this.updateCanvas(src, width);
        
    }
    componentDidUpdate() {
        const { analyzis } = this.props;
        
        if (!analyzis || analyzis.length < 1)
            return;
                   
        const context = this.canvas.getContext('2d');        
        
        context.font = '14px roboto';
        const scale = this.state.scale;
        const rects = [];
        analyzis.forEach((face, i) => {            
            const rect = face.faceRectangle;        
            rects.push({
                color: colorlist[i % colorlist.length],
                left: rect.left / scale,
                top: rect.top / scale,
                width: rect.width / scale,
                height: rect.height / scale,
                text: `${face.faceAttributes.gender} ${face.faceAttributes.age}`
            });
            
        });
        this.rects = rects;
        rects.forEach(rect => {
            context.strokeStyle = rect.color;
            context.fillStyle = rect.color;
            context.lineWidth = 1;
            context.textBaseline = 'bottom';
            context.fillText(rect.text, rect.left, rect.top, rect.width);
            context.lineWidth = 3;
            context.strokeRect(rect.left, rect.top, rect.width, rect.height);
        });      
        
    }
    updateCanvas(src, width) {        
        const context = this.canvas.getContext('2d');
        const canvas = this.canvas;
        let self = this;
        var imageObj = new Image();
        imageObj.onload = function () {
            const ratio = imageObj.width / imageObj.height;            
            const scale = imageObj.width / width;
            self.setState({ scale });
            const height = width / ratio;
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            context.drawImage(imageObj, 0, 0, width, height);            
        };
        imageObj.src = src;       
    }

    

    handleMouseMove(e) {
        const rects = this.rects || [];
        const rect = this.canvas.getBoundingClientRect();
        //const context = this.canvas.getContext('2d');        
        const [x, y] = [e.clientX - rect.left, e.clientY - rect.top];        
        const intersectedRectangle = this.getIntersectedRectangle({ x, y }, rects);            
               
        if (intersectedRectangle) {            
            this.tip.style.display = 'block';
            this.tip.style.left = intersectedRectangle.left + rect.left + 'px';
            this.tip.style.top = intersectedRectangle.top + rect.top + window.scrollY +'px';
            this.tip.style.width = intersectedRectangle.width -2 + 'px';
            this.tip.style.height = intersectedRectangle.height - 2 + 'px';
            this.tip.style.boxShadow = '0 0 2px 4px ' + intersectedRectangle.color;
        } else {
            this.tip.style.display = 'none';
        }        
    }

    getIntersectedRectangle(point,rects) {
        for (let i = 0; i < rects.length; i++) {
            if (this.intersects(point, rects[i]))
                return rects[i];       
        }
    }

    intersects(point, rectangle) {
        return point.x > rectangle.left
            && point.x < rectangle.left + rectangle.width
            && point.y > rectangle.top
            && point.y < rectangle.top + rectangle.height;
    }
    
    render() {
        
        return (
            <div>                
                <StyledCanvas as="canvas" ref={(ref) => this.canvas = ref} onMouseMove={(e) => this.handleMouseMove(e)}></StyledCanvas>
                <OverDiv as="div" ref={(ref => this.tip = ref)}></OverDiv>
            </div>
        )
    }
}

export default ImageView;