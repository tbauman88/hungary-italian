if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        if (
            window.location.hostname === 'localhost' ||
            window.location.hostname === '127.0.0.1'
        ) {
            navigator.serviceWorker
                .register('/sw.js')
                .then((registration) => {
                    console.log(
                        'Service Worker registered with scope:',
                        registration.scope
                    );
                })
                .catch((error) => {
                    console.error('Service Worker registration failed:', error);
                });
        } else {
            console.log('Service Worker not registered in development mode');
        }
    });
}
