document.addEventListener('DOMContentLoaded', () => {
    const navLinks = Array.from(document.querySelectorAll('#academyNav .nav-link'));
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageTitle = document.getElementById('pageTitle');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const slideIndicator = document.getElementById('slideIndicator');
    const fullscreenBtn = document.getElementById('fullscreenBtn');

    let currentIndex = 0;

    // Helper to get bootstrap tab instance
    function showTabByIndex(index) {
        if (index < 0 || index >= navLinks.length) return;
        
        currentIndex = index;
        const targetLink = navLinks[currentIndex];
        const tab = new bootstrap.Tab(targetLink);
        tab.show();

        updateUI();
    }

    // Global helper so HTML buttons (like "Start Training") can navigate
    window.navigateToModule = function(targetSelector) {
        const targetIndex = navLinks.findIndex(link => link.getAttribute('data-bs-target') === targetSelector);
        if (targetIndex !== -1) {
            showTabByIndex(targetIndex);
        }
    };

    // Update Progress, Controls, and Header Title
    function updateUI() {
        const activeLink = navLinks[currentIndex];
        const titleText = activeLink.textContent.trim();
        pageTitle.textContent = titleText;

        // Calculate progress percentage
        const progressPercent = Math.round(((currentIndex + 1) / navLinks.length) * 100);
        progressBar.style.width = `${progressPercent}%`;
        progressText.textContent = `${progressPercent}%`;
        slideIndicator.textContent = `Module ${currentIndex + 1} of ${navLinks.length}`;

        // Disable/Enable Buttons at boundaries
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === navLinks.length - 1;
    }

    // Sidebar Nav Clicks
    navLinks.forEach((link, index) => {
        link.addEventListener('click', () => {
            currentIndex = index;
            updateUI();
        });
    });

    // Previous / Next Button Click Handlers
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) showTabByIndex(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < navLinks.length - 1) showTabByIndex(currentIndex + 1);
    });

    // Keyboard Arrow Hotkeys (Great for FiveM Projectors / Classroom presentations)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            if (currentIndex < navLinks.length - 1) showTabByIndex(currentIndex + 1);
        } else if (e.key === 'ArrowLeft') {
            if (currentIndex > 0) showTabByIndex(currentIndex - 1);
        }
    });

    // Projector Fullscreen Toggle
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                alert(`Error enabling fullscreen mode: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });

    // Initial setup
    updateUI();
});
