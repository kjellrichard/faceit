import React, { Component } from 'react'
import styled from 'styled-components'
import ActionPanel from './ActionPanel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrain } from '@fortawesome/free-solid-svg-icons'

const StyledHeader = styled.div`    
    line-height: 40px;    
    display: flex;
    flex-flow: row space-between;  
    align-items: stretch;            
    justify-items: center;    
    > * {    
        flex: 1; 
        text-align: center;        
        &:first-child {     
          text-align: left;  
        }
        &:last-child {
           text-align: right;
        }
    }
`
const CenterHeader = styled.div`
    
`
const Title = styled.div`
    font-family: Lobster;
    font-size: 2em;
    font-weight: bold;
    padding: 0 10px;
`
class Header extends Component {
    render() {
        const { loading, onSelect, selection } = this.props;
        return (
            <StyledHeader>
                <ActionPanel onSelect={onSelect} selection={selection}/>
                <CenterHeader>
                {
                    !loading ?
                        ''
                        :                        
                        <FontAwesomeIcon style={{ marginTop: '15px' }} icon={faBrain} spin size="1x" />                        
                    }
                </CenterHeader>
                <Title>{this.props.title}</Title>
            </StyledHeader>

        )
    }
}

export default Header;