import styled from 'styled-components'
import { darken } from 'polished'

export const StyledImagish = styled.div`
    border-radius: 2px;
    box-shadow: 0px 0px 0px 4px #00000080;       
`

export const StyledButton = styled.button`
    background-color: #4AB3F4;
    border-radius: 5px;
    color: white;
    padding: 4px 4px;
    &:hover {
        background-color: ${darken(.1, '#4AB3F4')};
    }
`