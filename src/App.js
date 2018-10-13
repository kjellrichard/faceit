import React, { Component } from 'react'
import 'typeface-lobster'
import 'typeface-roboto'
import styled, { createGlobalStyle } from 'styled-components'
import ImageInput from './components/ImageInput'
import ImageView from './components/ImageView'
import AnalyzisResult from './components/AnalyzisResult'
import Header from './components/Header'
import {transparentize, darken, lighten} from 'polished'
import { colors } from './style/colors';
const GlobalStyle = createGlobalStyle`

html {
  body {
    margin:0;
    padding: 0;
    background-color: ${colors.background};   
  }
  * {
    font-family: roboto, sans serif;
  }
}
`
const StaticHeader = styled.div`
  position: fixed;  
  width: 100%;
  box-shadow: 0 0 5px 2px ${transparentize(.5,'#000')};
  background-color: ${transparentize(.05,colors.headerBackground)};  
  color: ${colors.primary};
  z-index: 1000;
`
const Page = styled.div`
  width: 100%;
  height: 100%;  
`

const Content = styled.div`
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  
  padding-bottom: 50px;
  align-items: center;
`
export default faceAction =>
  class App extends Component {
    handleImageChange(rawData) {
      faceAction.handleRawImage(rawData);
      faceAction.analyzeImage(rawData);
    }

    handleChangeInputMode(mode) {
      faceAction.setInputMode(mode);
    }
    
    handleSelect(selection) {
      faceAction.setInputMode(selection);
      faceAction.retake();
    }
    retake() {
      faceAction.retake();
    }
    render() {
      const { rawImageData, inputMode } = this.props.face;
      const hasImageData = !!rawImageData;
      const { analyzis } = this.props.face;
      const faceRectangles = analyzis && analyzis.map(face => face.faceRectangle);

      
      const width = Math.min(500, window.innerWidth - 40);
      const height = Math.min(350, width);
      
      return (
        
        <Page>
          <GlobalStyle />
          <StaticHeader>
            <Header
              title={this.props.face.appTitle}
              loading={this.props.face.isLoading}
              onSelect={this.handleSelect}
              selection={this.props.face.inputMode} />
          </StaticHeader>         
          <Content>
            { 
              inputMode === 'home' && 
              <div>Welcome you</div>
            }
            {
              !hasImageData && inputMode !== 'home' && <ImageInput
                onChange={rawImage => this.handleImageChange(rawImage)}
                width={width}
                height={height}
                inputMode={inputMode}
                /*onChangeInputMode={mode => this.handleChangeInputMode(mode)} *//>
            }          
            {
              hasImageData && <div>
                <ImageView
                  src={this.props.face.rawImageData}
                  width={width}
                  analyzis={analyzis}
                  faces={faceRectangles}                  
                />                
              </div>
            }
            {
              analyzis && <AnalyzisResult analyzis={analyzis} isLoading={this.props.face.isLoading} />
            }
            
          </Content>
          
        </Page>
        
      )
    }
  }