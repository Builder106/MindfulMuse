window.excalidrawInterop = {
    load: () => {
        const maxRetries = 20; // Try for 2 seconds
        let retries = 0;

        const waitForDependencies = setInterval(() => {
            retries++;
            const excalidrawWrapper = document.getElementById('excalidraw-wrapper');

            if (window.React && window.ReactDOM && window.Excalidraw && excalidrawWrapper) {
                clearInterval(waitForDependencies);
                try {
                    excalidrawWrapper.innerHTML = ''; // Clear placeholder
                    const excalidrawRoot = window.ReactDOM.createRoot(excalidrawWrapper);
                    excalidrawRoot.render(window.React.createElement(window.Excalidraw.Excalidraw));
                } catch (e) {
                    console.error("Error rendering Excalidraw:", e);
                    excalidrawWrapper.innerHTML = '<p style="color: red; text-align: center;">Error rendering Excalidraw canvas.</p>';
                }
            } else if (retries >= maxRetries) {
                clearInterval(waitForDependencies);
                console.error("Failed to load Excalidraw dependencies after several retries.");
                if (excalidrawWrapper) {
                    excalidrawWrapper.innerHTML = '<p style="color: red; text-align: center;">Failed to load Excalidraw. Please check your network connection and try again.</p>';
                }
            }
        }, 100); // Check every 100ms
    }
};