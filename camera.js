document.addEventListener('DOMContentLoaded', (event) => {
    const video = document.getElementById('videoElement');
    
    // Access the user's camera and stream the feed to the video element.
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((err) => {
            console.error("Error accessing the camera: ", err);
        });

    // Add click event listeners to all buttons with the class 'captureImageBtn'.
    document.querySelectorAll('.captureImageBtn').forEach(button => {
        button.addEventListener('click', function() {
            // Get the ID of the input element to update from the button's data-input attribute.
            const inputId = this.getAttribute('data-input');
            // Capture and process the current frame and update the specified input field.
            captureAndProcessFrame(inputId);
        });
    });
});

async function captureAndProcessFrame(inputId) {
    const video = document.getElementById('videoElement');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Image Preprocessing
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
        // Convert to grayscale
        const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
        imageData.data[i] = avg;
        imageData.data[i + 1] = avg;
        imageData.data[i + 2] = avg;

        // Apply thresholding
        const threshold = 128;
        const value = avg < threshold ? 0 : 255;
        imageData.data[i] = value;
        imageData.data[i + 1] = value;
        imageData.data[i + 2] = value;
    }
    ctx.putImageData(imageData, 0, 0);

    const img = canvas.toDataURL('image/png');
    
    try {
        const result = await Tesseract.recognize(
            img,
            'eng',
            { logger: (m) => console.log(m) }
        );
        console.log("Tesseract Output:", result);

        if(result && typeof result.text !== 'undefined') {
            document.getElementById(inputId).value = result.text;
            console.log('Text extracted from image:', result.text);        
        } else {
            console.error('Tesseract Output is not in the expected format:', result);
        }
    } catch (err) {
        console.error('Error while extracting text:', err);
    }
}

