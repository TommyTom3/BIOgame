document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');
    const contentSections = document.querySelectorAll('.content-section');
    const gamesButton = document.querySelector('.nav-button[data-target="games"]');
    const dropdownContent = document.querySelector('.dropdown-content');

    // Show "About" by default and ensure only one section is active
    contentSections.forEach(section => section.classList.remove('active'));
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutSection.classList.add('active');
        console.log('Initial load: About section activated');
    }

    // Add click event listeners to nav links 
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('data-target');

            // If the clicked link is the Games button, toggle dropdown and return
            if (targetId === 'games' && link.classList.contains('nav-button')) {
                dropdownContent.classList.toggle('show');
                return;
            }

            // Close dropdown when a dropdown item is clicked
            if (link.classList.contains('dropdown-item')) {
                dropdownContent.classList.remove('show');
            }

            // Remove active class from all nav links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to the clicked link (only for dropdown items)
            if (link.classList.contains('dropdown-item')) {
                link.classList.add('active');
            }

            // Hide all content sections
            contentSections.forEach(section => {
                section.classList.remove('active');
                console.log(`Deactivated section: ${section.id}`);
            });

            // Show the target section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                console.log(`Activated section: ${targetId}`);
            } else {
                console.error(`Target section not found: ${targetId}`);
            }

            // If photosynthesis is activated, ensure pop-up is hidden
            if (targetId === 'photosynthesis') {
                const popup = document.getElementById('photosynthesis-popup');
                if (popup) {
                    popup.style.display = 'none';
                    console.log('Photosynthesis loaded, pop-up hidden');
                }
            }
        });
    });

    // Close dropdown if clicking outside
    document.addEventListener('click', (e) => {
        if (!gamesButton.contains(e.target) && !dropdownContent.contains(e.target)) {
            dropdownContent.classList.remove('show');
        }
    });

    // Photosynthesis: Draggable Ball Logic
    const blueBall = document.getElementById('photosynthesis-blue-ball');
    const redSquare = document.getElementById('photosynthesis-red-square');
    const popup = document.getElementById('photosynthesis-popup');
    const continueBtn = document.getElementById('photosynthesis-continue-btn');

    if (blueBall && redSquare && popup && continueBtn) {
        // Initialize pop-up as hidden
        popup.style.display = 'none';

        let isDragging = false;
        let currentX = parseFloat(blueBall.style.left) || 300;
        let currentY = parseFloat(blueBall.style.top) || 300;
        let initialX;
        let initialY;

        // Start dragging
        blueBall.addEventListener('mousedown', (e) => {
            initialX = e.clientX - currentX;
            initialY = e.clientY - currentY;
            isDragging = true;
            blueBall.style.cursor = 'grabbing';
            console.log('Dragging started');
        });

        // Drag movement
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;

                // Constrain ball within game-area boundaries
                const gameArea = document.querySelector('.game-area');
                const rect = gameArea.getBoundingClientRect();
                const ballRect = blueBall.getBoundingClientRect();

                currentX = Math.max(0, Math.min(currentX, rect.width - ballRect.width));
                currentY = Math.max(0, Math.min(currentY, rect.height - ballRect.height));

                blueBall.style.left = `${currentX}px`;
                blueBall.style.top = `${currentY}px`;
            }
        });

        // Stop dragging and check for target
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                blueBall.style.cursor = 'grab';
                console.log('Dragging stopped, checking collision');

                // Check if ball is over red square
                const ballRect = blueBall.getBoundingClientRect();
                const squareRect = redSquare.getBoundingClientRect();

                if (
                    ballRect.left < squareRect.right &&
                    ballRect.right > squareRect.left &&
                    ballRect.top < squareRect.bottom &&
                    ballRect.bottom > squareRect.top
                ) {
                    popup.style.display = 'flex';
                    console.log('Ball dropped on red square, pop-up shown');
                }
            }
        });

        // Continue button closes pop-up
        continueBtn.addEventListener('click', () => {
            popup.style.display = 'none';
            console.log('Continue button clicked, pop-up hidden');
        });
    } else {
        console.error('Photosynthesis game elements not found:', { blueBall, redSquare, popup, continueBtn });
    }
});