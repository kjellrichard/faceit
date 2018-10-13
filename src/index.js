import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import makeApp from './App'
import * as serviceWorker from './serviceWorker';
import faceReducer from './reducers/faceReducer';
import FaceAction from './actions/FaceAction';
const reducer = combineReducers({
    face: faceReducer
})
const store = createStore(reducer, composeWithDevTools())
const mapStateToProps = state => ({
    face: state.face    
})

const faceAction = new FaceAction(store.dispatch.bind(store), window.fetch.bind(window));
const App = connect(mapStateToProps)(makeApp(faceAction));
ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
