//Ident
let observer;

//Functions
function skipAd() {

    //Consts
    const isAdShowing = document.querySelector('.ad-showing');
    const video = document.querySelector('video');
    const skipButton = document.querySelector('.ytp-ad-skip-button, .ytp-ad-skip-button-modern');
    const adOverlay = document.querySelectorAll('.ytp-ad-overlay-container .ytp-ad-player-overlay');

    //Calcs

    //Skips Ad
    if (skipButton) {
        skipButton.click();
    }
    
    //Mute Ads & Skip to end
    if (isAdShowing && video) {
        video.muted = true;
        //try and instant jump to the end of the ad
        try {
            if (video.duration) {
                video.currentTime = video.duration;
            }
        //Write error to console
        } catch (error) {
            console.error('Error skipping ad:', error);
        }
    }

    //Remove Ad Overlay
    adOverlay.forEach(overlay => overlay.remove());

}

function startObserver() {

    //Observe for changes in the DOM to try and dected an Ad starts
    if (observer) {
        observer.disconnect();
    }
    observer = new MutationObserver(() => {
        childList = true,
        subtree = true
    });
    //Run Once
    skipAd();
}

function init() {
    startObserver();
}

//Event Listeners; Window for youtube which fires on nvaigation, Document for the rest of the site which fires on load
window.addEventListener('yt-navigate-finish', init);
document.addEventListener