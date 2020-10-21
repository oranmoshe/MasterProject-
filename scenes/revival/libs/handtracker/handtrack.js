const videoCamera = document.getElementById("myvideo");
const canvasCamera = document.getElementById("canvasCamera");
const contextCamera = canvasCamera.getContext("2d");
let updateNote = document.getElementById("updatenote");

let imgindex = 1
let isVideo = false;
let model = null;

// video.width = 500
// video.height = 400

const modelParams = {
    flipHorizontal: true,   // flip e.g for video  
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.6,    // confidence threshold for predictions.
}
startVideo()
function startVideo() {
    handTrack.startVideo(videoCamera).then(function (status) {
        console.log("video started", status);
        if (status) {
             console.log("Video started. Now tracking");
            isVideo = true
            runDetection()
        } else {
             console.log("Please enable video");
        }
    });
}

function toggleVideo() {
    if (!isVideo) {
        console.log("Starting video");
        startVideo();
    } else {
        console.log("Stopping video");
        handTrack.stopVideo(videoCamera)
        isVideo = false;
        console.log("Video stopped");
    }
}


function runDetection() {
    model.detect(videoCamera).then(predictions => {
        //console.log("Predictions: ", predictions);

        if( $(predictions) &&  $(predictions)[0] &&  $(predictions)[0]["bbox"]  && $(predictions)[0]["bbox"][0]){
        
            var relX = $(predictions)[0]["bbox"][0] /640 * 1.15;
            var relY = $(predictions)[0]["bbox"][1] /480 * 1.15;

            var mx = relX * site.Width;
            var my = relY * site.Height;
            $("#pointer").css("left",mx);
            $("#pointer").css("top",my);


            mouseX = ( mx - windowHalfX ) / 2;
            mouseY = ( my - windowHalfY ) / 2;
            Background.camera.position.z = -($(predictions)[0]["bbox"][2]/400)*50+400

            console.log("x:" + relX + " y: "+ relY + "scale:" + $(predictions)[0]["bbox"][2])
        }
        //model.renderPredictions(predictions, canvasCamera, contextCamera, videoCamera);
        if (isVideo) {
            requestAnimationFrame(runDetection);
        }
    });
}

function runDetectionImage(img) {
    model.detect(img).then(predictions => {
        console.log("Predictions: ", predictions);
        model.renderPredictions(predictions, canvasCamera, contextCamera, img);
    });
}

// Load the model.
handTrack.load(modelParams).then(lmodel => {
    // detect objects in the image.
    model = lmodel
});
