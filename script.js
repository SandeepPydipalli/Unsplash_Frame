const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

function getFullscreenElement(){
    return document.fullscreenElement
        || document.webkitFullscreenElement
        || document.mozFullscreenElement
        || document.msFullscreenElement;
}

function toggleFullscreen() {
    if (getFullscreenElement()) {
        document.exitFullscreen();
        imageContainer.style.removeProperty('cursor')
    } else {
        document.getElementById('image-container').requestFullscreen();
        imageContainer.style.cursor = 'none';
    }
}

imageContainer.addEventListener("dblclick", () => {
    toggleFullscreen();
});

function imageLoaded() {
    loader.hidden = true;
} 

// Unsplash API
const count = 1;
const apiKey = 'tuye-OBsaUXRUIt8gQphERhv6WF3Om_tVLWL24gbFLo';
const orient = 'landscape';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&orientation=${orient}`


const img = document.createElement('img');
// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    img.src = photosArray[0].urls.regular + "&w=3840&h=2160",
    img.alt = photosArray[0].alt_description,
    img.addEventListener('load', imageLoaded);
    // Put <img> inside <a>, then put both inside imageContainerElement
    imageContainer.append(img);
}

// Get Photos From Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        loader.hidden = false;
        displayPhotos();
    } catch (error) {
        // Catch Error Here
    }
}

// On Load
window.onload = function () {
    // Initial function call
    
    getPhotos();
    setInterval(function () {getPhotos();}, 30000);
}
