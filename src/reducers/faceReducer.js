import ACTION_TYPES from '../actions/actionTypes'
import produce from 'immer'


const initialState = {
    rawImageData: null,
    analyzis: null,
    isLoading: false,
    inputMode: 'select',
    appTitle: 'Face It'
}

export default (state = initialState, action) => produce(state, draft => {
    if (action.type === ACTION_TYPES.LOAD_ANALYZE_ATTEMPT) {
        draft.isLoading = true
    }

    if ([ACTION_TYPES.LOAD_ANALYZE_SUCCESS, ACTION_TYPES.LOAD_ANALYZE_FAILURE].includes(action.type)) {
        draft.isLoading = false
    }
    if (action.type === ACTION_TYPES.CHANGE_RAW_IMAGE_DATA) {
        draft.rawImageData = action.imageData;
    }

    if (action.type === ACTION_TYPES.RETAKE_IMAGE) {
        
        draft.rawImageData = null;
        draft.analyzis = null;
    }

    if (action.type === ACTION_TYPES.SET_INPUT_MODE) {
        draft.rawImageData = null;
        draft.analyzis = null;
        draft.inputMode = action.inputMode;
    }

    if (action.type === ACTION_TYPES.IMAGE_ANALYZED) {
        draft.analyzis = action.analyzis; 
    }
});