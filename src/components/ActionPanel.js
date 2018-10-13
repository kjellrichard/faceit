import React, { Component } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera,faUpload, faHome } from '@fortawesome/free-solid-svg-icons'
import { darken } from 'polished'
import { device } from '../style/device'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const ActionItem = styled.div` 
    padding: 0 10px;
    cursor: default;
    ${props => props.selected && 'border-bottom: solid 4px;margin-top:4px'}
    span {
        display: none;
    }
    @media ${device.laptop} {
        span {display: inline};
    }

    :hover {
        _background-color: ${darken(.1, '#fff')};
        border-bottom: solid 4px;margin-top:4px        
    }
`
export default class ActionPanel extends Component {
    render() {
        return <Container>
            <ActionItem onClick={e => this.props.onSelect('home')} selected={this.props.selection==='home'}>
                <FontAwesomeIcon icon={faHome} size="1x" /><span> Home</span>
            </ActionItem>
            <ActionItem onClick={e => this.props.onSelect('camera')} selected={this.props.selection === 'camera'}>                
                <FontAwesomeIcon icon={faCamera} size="1x" /><span> Camera</span>
            </ActionItem>
            <ActionItem onClick={e => this.props.onSelect('select')} selected={this.props.selection === 'select'}>            
                <FontAwesomeIcon icon={faUpload} size="1x" /><span> Select file</span>
            </ActionItem>
            
            
            
        </Container>
    }
}