function startCapture(displayMediaOptions) {
    return navigator.mediaDevices
        .getDisplayMedia(displayMediaOptions)
        .catch((err) => {
            console.error(err);
            return null;
        });
}