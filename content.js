/**
 * @file Seotblock v3 - Content Script
 * @author ESPCDEV
 * @description This script is injected into YouTube pages to handle ads
 * that bypass the declarativeNetRequest rules. It uses a MutationObserver
 * to efficiently detect and neutralize ad elements in real-time.
 */

'use strict';

/**
 * Main function to initialize the ad blocking logic.
 */
function initialize() {
    log('Core logic initialized. Observing DOM for changes.');

    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            // We only care about added nodes
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                handleDOMChange();
                break; // No need to check other mutations in this batch
            }
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
}

/**
 * Handles detected changes in the DOM, running all ad-blocking checks.
 */
function handleDOMChange() {
    seekAndDestroyAdVideo();
    clickSkippableButtons();
    removeAdElements();
}

/**
 * Finds the main video player and fast-forwards through any ad content.
 * This is more effective than just increasing playback speed.
 */
function seekAndDestroyAdVideo() {
    const adShowingContainer = document.querySelector('.ad-showing, .ad-interrupting');
    const videoPlayer = document.querySelector('video.html5-main-video');

    if (adShowingContainer && videoPlayer && videoPlayer.duration) {
        // Force the video to its end time to trigger the next video.
        videoPlayer.currentTime = videoPlayer.duration;
        videoPlayer.muted = true;
        log(`Ad video detected and fast-forwarded.`);
        showSkipNotification();
    }
}

/**
 * Clicks any available skippable ad buttons or close buttons for overlay ads.
 */
function clickSkippableButtons() {
    const skipButton = document.querySelector('.ytp-ad-skip-button, .ytp-ad-skip-button-modern, .ytp-ad-overlay-close-button');
    if (skipButton) {
        skipButton.click();
        log('Skippable ad button clicked.');
    }
}

/**
 * Finds and removes static ad elements like banners from the DOM.
 */
function removeAdElements() {
    const adSelectors = [
        '#player-ads',
        '#masthead-ad',
        '.ytd-ad-slot-renderer',
        'ytd-ad-slot-renderer',
        '.ytp-ad-text-overlay'
    ];

    adSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.remove();
            log(`Removed ad element matching selector: ${selector}`);
        });
    });
}

/**
 * Displays a notification that an ad was handled.
 * Uses the i18n API to get the correct language string.
 */
function showSkipNotification() {
    const existingNotification = document.querySelector('.seotblock-notification-popup');
    if (existingNotification) return; // Avoid spamming notifications

    const notification = document.createElement('div');
    notification.className = 'seotblock-notification-popup';
    notification.textContent = chrome.i18n.getMessage("notificationAdSkipped");
    
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

/**
 * Helper function for logging.
 * @param {string} message The message to log.
 */
function log(message) {
    console.log(`[Seotblock v3] ${message}`);
}

// Start the process
initialize();
