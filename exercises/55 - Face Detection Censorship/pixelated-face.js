const video = document.querySelector('.webcam');
const canvas = document.querySelector('canvas.video');
const ctx = canvas.getContext('2d');
const faceCanvas = document.querySelector('canvas.face');
const faceCtx = faceCanvas.getContext('2d');
const faceDetector = new window.FaceDetector();
const SIZE = 12;
const SCALE = 1.2;

async function populateVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      width: 1280,
      height: 720,
    },
  });

  video.srcObject = stream;
  await video.play();

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  faceCanvas.width = video.videoWidth;
  faceCanvas.height = video.videoHeight;
}

function drawFace(face) {
  const { width, height, top, left } = face.boundingBox;
  ctx.strokeStyle = '#ffc600';
  ctx.lineWidth = 2;
  ctx.strokeRect(left, top, width, height);
}

function censor({ boundingBox: face }) {
  faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
  faceCtx.imageSmoothingEnabled = false;
  faceCtx.drawImage(
    video,
    face.x,
    face.y,
    face.width,
    face.height,
    face.x,
    face.y,
    SIZE,
    SIZE
  );

  const width = face.width * SCALE;
  const height = face.height * SCALE;

  faceCtx.drawImage(
    faceCanvas,
    face.x,
    face.y,
    SIZE,
    SIZE,
    face.x - (width - face.width) / 2,
    face.y - (height - face.height) / 2,
    face.width,
    face.height
  );
}

async function detect() {
  const faces = await faceDetector.detect(video);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // faces.forEach(drawFace);
  faces.forEach(censor);
  requestAnimationFrame(detect);
}

populateVideo().then(detect);

// async function run() {
//   await populateVideo();
//   detect();
// }

// run();
