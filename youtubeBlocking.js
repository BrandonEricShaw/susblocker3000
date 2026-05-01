function skipAd() {
    //Consts

    //Auto Skip Button selector
    const skipButton = document.querySelector('.ytp-ad-skip-button.ytp-button');
    //Overlay Selector
    const adOverlay = document.querySelector('.ytp-ad-player-overlay');
    //Video selector
    const video = document.querySelector('video');

    //Calcs

    //Skips Ad
    if (skipButton) {
        skipButton.click();
    }
    
    //Remove Ad Overlay
    if (adOverlay) {
        adOverlay.remove();
    }

    //Mute Ads & Skip to end
    if (video && document.querySelector('.ad-showing')) {
        video.muted = true;
        video.currentTime = video.duration || 0;
    }
}

//Run every 500ms
setInterval(skipAd, 500);