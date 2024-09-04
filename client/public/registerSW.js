if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/STJDA_Intake/sw.js', { scope: '/STJDA_Intake/' })
        .then((registration) => {
          console.log('PWA service worker registered successfully:', registration);
        })
        .catch((error) => {
          console.error('PWA service worker registration failed:', error);
        });
    });
  }