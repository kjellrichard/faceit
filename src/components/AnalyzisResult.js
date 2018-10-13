import React, { Component } from 'react'
import styled from 'styled-components'
import { colorlist, colors } from '../style/colors'

const AnalyzisContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    flex-wrap: nowrap;
    justify-content: center;
    width: 100%;
    overflow: auto;
    > * {
        width: 200px;
        box-shadow: 0 0 1px 1px gray;
        padding: 2px;
        margin: 4px;
        background-color: ${colors.headerBackground};
    }
`
const parseFaceData = ({ faceAttributes }) => {
    const face = faceAttributes;
    return {
        smile: face.smile,
        gender: face.gender,
        age: face.age,
        ...face.facialHair,
        glasses: face.glasses,
        emotion: face.emotion,
        ...face.makeup,
        baldness: face.hair.bald,
        hairInvisible: face.hair.invisible,
        hairColor: (face.hair.hairColor[0] || {}).color,
        accessories: face.accessories
    }    
}
class AnalyzisResult extends Component {
    render() {
        return (
            <AnalyzisContainer>
                
                   {this.props.analyzis &&
                        this.props.analyzis.map((face, index) => {
                            const style = {
                                color: colorlist[index % colorlist.length]

                            }
                        return (<div key={index} style={style}>
                            <code>
                                <pre>
                                    {JSON.stringify(parseFaceData(face), null, 2)};
                                    </pre>                                    
                                </code>
                            </div>
                            )
                        })
                    }
                
            </AnalyzisContainer>
        )
    }
}

export default AnalyzisResult;