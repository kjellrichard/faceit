import ACTION_TYPES from './actionTypes'

const faceApiKey = process.env.REACT_APP_COGNITIVE_API_KEY;
const faceApiUrl = process.env.REACT_APP_COGNITIVE_API_URL;
//https://westus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395236

export default class FaceAction {
    constructor(dispatch, fetch) {
        this._dispatch = dispatch;
        this._fetch = fetch;
    }
    makeBlob(dataURL) {
        var BASE64_MARKER = ';base64,';
        var contentType, parts, raw;
        if (dataURL.indexOf(BASE64_MARKER) === -1) {
            parts = dataURL.split(',');
            contentType = parts[0].split(':')[1];
            raw = decodeURIComponent(parts[1]);
            return new Blob([raw], { type: contentType });
        }
        parts = dataURL.split(BASE64_MARKER);
        contentType = parts[0].split(':')[1];
        raw = window.atob(parts[1]);
        var rawLength = raw.length;

        var uInt8Array = new Uint8Array(rawLength);

        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], { type: contentType });
    }

    handleRawImage(imageData) {    
        this._dispatch({type: ACTION_TYPES.CHANGE_RAW_IMAGE_DATA, imageData})
    }

    setInputMode(mode) {
        this._dispatch({ type: ACTION_TYPES.SET_INPUT_MODE, inputMode: mode });
    }
    retake() {        
        this._dispatch({ type: ACTION_TYPES.RETAKE_IMAGE });
    }
    async analyzeImage(imageData) {
        const params = {
            "returnFaceId": "true",
            "returnFaceLandmarks": "false",
            "returnFaceAttributes":
                "age,gender,headPose,smile,facialHair,glasses,emotion," +
                "hair,makeup,occlusion,accessories,blur,exposure,noise"
        };
        
        const query = Object.entries(params).map(entry => entry[0] + '=' + entry[1]).join('&')
        this._dispatch({ type: ACTION_TYPES.LOAD_ANALYZE_ATTEMPT });
        try {
            const response = await this._fetch(`${faceApiUrl}/detect/?` + query, {
                headers: {
                    'Ocp-Apim-Subscription-Key': faceApiKey,
                    'Content-Type': 'application/octet-stream'                    
                },
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, cors, *same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, same-origin, *omit                
                redirect: "follow", // manual, *follow, error
                referrer: "no-referrer", // no-referrer, *client
                body: this.makeBlob(imageData)
            });
            
            const json = await response.json();        
            this._dispatch({ type: ACTION_TYPES.IMAGE_ANALYZED, analyzis: json });
            this._dispatch({ type: ACTION_TYPES.LOAD_ANALYZE_SUCCESS });
        } catch (err) {
            this._dispatch({ type: ACTION_TYPES.LOAD_ANALYZE_FAILURE, error: err });
            console.error(err);
        }
    }
}